"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { useAuth } from "@/hooks/useAuth";
import {
  Heart,
  MessageSquare,
  Star,
  X,
  Phone,
  Globe,
  MapPin,
  Accessibility,
  Beer,
  Coffee,
  Utensils,
} from "lucide-react";
import Link from "next/link";
import { getCookie } from "@/utils/cookies";

// Province Centers (Approximate)
const PROVINCES: Record<string, [number, number]> = {
  Ávila: [40.65, -4.7],
  Burgos: [42.34, -3.7],
  León: [42.6, -5.57],
  Palencia: [42.01, -4.53],
  Salamanca: [40.96, -5.66],
  Segovia: [40.95, -4.12],
  Soria: [41.76, -2.46],
  Valladolid: [41.65, -4.72],
  Zamora: [41.5, -5.74],
};

interface Bar {
  id: number;
  attributes: {
    name: string;
    coordinates: {
      lat: number;
      lon: number;
    };
    address: string;
    type: string;
    municipality: string;
    telefono?: string;
    web?: string;
    accesible?: string;
    // New fields
    rating?: number;
    reviews_count?: number;
    latest_reviews?: {
        id: number;
        rating: number;
        comment: string;
        date: string;
        user: string;
    }[];
  };
}

interface MapProps {
  bars: Bar[];
  selectedProvince?: string;
  searchQuery?: string;
  focusedBarId?: string | null;
}

interface MapControllerProps {
  selectedProvince?: string;
  searchQuery?: string;
  bars: Bar[];
  focusedBarId?: string | null;
}

// Internal component to handle view state updates
function MapController({
  selectedProvince,
  searchQuery,
  bars,
  focusedBarId
}: MapControllerProps) {
  const map = useMap();

  useEffect(() => {
    // 0. Priority: Focused Bar ID (Deep Link)
    if (focusedBarId && bars.length > 0) {
        const targetBar = bars.find(b => b.id.toString() === focusedBarId.toString());
        if (targetBar) {
            map.flyTo(
                [targetBar.attributes.coordinates.lat, targetBar.attributes.coordinates.lon],
                18, // Close zoom
                { duration: 1.5 }
            );
            return; // Stop processing other view logic
        }
    }

    // 1. Prioritize Search: If searching and we have results, fit bounds to them
    if (searchQuery && bars.length > 0) {
      // If only one result, fly to it directly
      if (bars.length === 1) {
        const bar = bars[0];
        map.flyTo(
          [bar.attributes.coordinates.lat, bar.attributes.coordinates.lon],
          16,
          { duration: 1.5 },
        );
      } else {
        // If multiple, create bound
        const bounds = bars.map(
          (b) =>
            [b.attributes.coordinates.lat, b.attributes.coordinates.lon] as [
              number,
              number,
            ],
        );
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 16 });
      }
    }
    // 2. If Province Selected (and no active specific search focus), fly to Province
    else if (selectedProvince && PROVINCES[selectedProvince]) {
      map.flyTo(PROVINCES[selectedProvince], 10, { duration: 1.5 });
    }
  }, [selectedProvince, searchQuery, bars, map, focusedBarId]);

  return null;
}

function PopupContent({ bar }: { bar: Bar }) {
  const { user, mutate } = useAuth();
  const [reviewMode, setReviewMode] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  const isFavorite = user?.favorites?.some((f: any) => f.id === bar.id);

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) return;
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favorites/toggle`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-XSRF-TOKEN": decodeURIComponent(getCookie("XSRF-TOKEN") || ""),
        },
        body: JSON.stringify({ bar_id: bar.id }),
        credentials: "include",
      });
      mutate();
    } catch (e) {
      console.error(e);
    }
  };

  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setStatus("sending");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-XSRF-TOKEN": decodeURIComponent(getCookie("XSRF-TOKEN") || ""),
        },
        body: JSON.stringify({ bar_id: bar.id, rating, comment }),
        credentials: "include",
      });
      if (res.ok) {
        setStatus("sent");
        setReviewMode(false);
        setComment("");
        mutate();
      } else {
        console.error("Review failed", res.status);
        setStatus("error");
      }
    } catch (e) {
      console.error(e);
      setStatus("error");
    }
  };

  return (
    <div
      className="font-mono p-2 min-w-[220px]"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between items-start mb-1 border-b border-black/10 pb-1">
          <strong className="text-sm font-black uppercase text-black block">
            {bar.attributes.name}
          </strong>
          
          {/* Rating Badge */}
          {bar.attributes.rating !== undefined && bar.attributes.rating !== null && (bar.attributes.reviews_count || 0) > 0 && (
             <div className="flex items-center gap-1 bg-black text-white px-1.5 py-0.5 rounded text-[10px] font-bold">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span>{bar.attributes.rating}</span>
                <span className="text-neutral-400">({bar.attributes.reviews_count})</span>
             </div>
          )}
      </div>

      <span className="text-xs text-orange-600 font-bold block mb-1 uppercase tracking-widest">
        {'///'} {bar.attributes.type}
      </span>
      <span className="text-xs text-neutral-600 block leading-tight mb-3">
        {bar.attributes.address}
        <br />
        {bar.attributes.municipality}
      </span>

      <div className="flex flex-col gap-1 mb-3 text-[10px] text-neutral-600">
        {bar.attributes.telefono && (
          <a
            href={`tel:${bar.attributes.telefono.replace(/\s/g, "")}`}
            className="flex items-center gap-2 hover:text-black hover:underline"
          >
            <Phone className="w-3 h-3 text-neutral-400" />
            {bar.attributes.telefono}
          </a>
        )}

        {bar.attributes.web && (
          <a
            href={
              bar.attributes.web.startsWith("http")
                ? bar.attributes.web
                : `https://${bar.attributes.web}`
            }
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-black hover:underline"
          >
            <Globe className="w-3 h-3 text-neutral-400" />
            Website
          </a>
        )}

        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${bar.attributes.coordinates.lat},${bar.attributes.coordinates.lon}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-black hover:underline"
        >
          <MapPin className="w-3 h-3 text-neutral-400" />
          Cómo llegar
        </a>

        {bar.attributes.accesible &&
          bar.attributes.accesible.toLowerCase().includes("si") && (
            <div className="flex items-center gap-2 text-green-700 bg-green-50 p-1 rounded mt-1 border border-green-100">
              <Accessibility className="w-3 h-3" />
              <span>Accesible</span>
            </div>
          )}
      </div>

      {/* Recent Reviews (if any) */}
      {bar.attributes.latest_reviews && bar.attributes.latest_reviews.length > 0 && (
          <div className="mb-3 border-t border-dashed border-neutral-300 pt-2">
              <span className="text-[9px] text-neutral-400 uppercase font-bold block mb-2">Reseñas Recientes</span>
              <div className="flex flex-col gap-2">
                  {bar.attributes.latest_reviews.map(review => (
                      <div key={review.id} className="bg-neutral-50 p-1.5 rounded border border-neutral-100">
                          <div className="flex justify-between items-center mb-0.5">
                              <span className="text-[10px] font-bold text-neutral-800">{review.user}</span>
                              <div className="flex items-center">
                                  <Star className="w-2 h-2 fill-orange-400 text-orange-400" />
                                  <span className="text-[9px] font-mono ml-0.5 text-neutral-600">{review.rating}</span>
                              </div>
                          </div>
                          <p className="text-[9px] text-neutral-600 leading-tight italic truncate">
                              &quot;{review.comment}&quot;
                          </p>
                      </div>
                  ))}
              </div>
          </div>
      )}

      {user && (
        <div className="border-t border-black/10 pt-2 flex flex-col gap-2">
          {/* Actions Toolbar */}
          {!reviewMode && (
            <div className="flex gap-2">
              <button
                onClick={toggleFavorite}
                className={`flex-1 flex items-center justify-center gap-1 text-[10px] font-bold uppercase py-1 border transition-colors ${isFavorite ? "bg-red-500 text-white border-red-500" : "bg-white text-black border-neutral-300 hover:bg-neutral-100"}`}
              >
                <Heart
                  className={`w-3 h-3 ${isFavorite ? "fill-current" : ""}`}
                />
                {isFavorite ? "Favorito" : "Guardar"}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setReviewMode(true);
                }}
                className="flex-1 flex items-center justify-center gap-1 text-[10px] font-bold uppercase py-1 border border-neutral-300 bg-white text-black hover:bg-neutral-100 transition-colors"
              >
                <MessageSquare className="w-3 h-3" />
                Reseñar
              </button>
            </div>
          )}

          {/* Review Form */}
          {reviewMode && (
            <form
              onSubmit={submitReview}
              className="bg-neutral-50 p-2 rounded border border-neutral-200"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-bold uppercase">
                  Nueva Reseña
                </span>
                <button type="button" onClick={() => setReviewMode(false)}>
                  <X className="w-3 h-3" />
                </button>
              </div>

              <div className="flex gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                  >
                    <Star
                      className={`w-3 h-3 ${star <= rating ? "fill-orange-400 text-orange-400" : "text-neutral-300"}`}
                    />
                  </button>
                ))}
              </div>

              <textarea
                className="w-full text-[10px] p-1 border border-neutral-300 rounded mb-2 h-12"
                placeholder="Escribe tu opinión..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full bg-black text-white text-[10px] font-bold uppercase py-1 hover:bg-orange-600 transition-colors"
              >
                {status === "sending" ? "Enviando..." : "Publicar Reseña"}
              </button>
            </form>
          )}
        </div>
      )}

      {!user && (
        <div className="border-t border-black/10 pt-2 text-[10px] text-center text-neutral-500">
          <Link href="/login" className="underline hover:text-orange-600">
            Inicia sesión
          </Link>{" "}
          para interactuar
        </div>
      )}
    </div>
  );
}

// Helper to create safe dynamic icons
const createCustomIcon = (type: string) => {
    // Normalize type
    const normType = (type || "").toLowerCase();
    
    // Determine props
    let bgColor = "rgb(6, 182, 212)"; // Cyan (Bar default)
    let IconComponent = Beer;
    let ringColor = "rgba(6, 182, 212, 0.4)";
    
    if (normType.includes("caf")) { // "cafetería"
        bgColor = "rgb(245, 158, 11)"; // Amber
        IconComponent = Coffee;
        ringColor = "rgba(245, 158, 11, 0.4)";
    } else if (normType.includes("restaurante")) {
        bgColor = "rgb(244, 63, 94)"; // Rose
        IconComponent = Utensils;
        ringColor = "rgba(244, 63, 94, 0.4)";
    }

    // Render icon to string using Manual SVG generation or renderToStaticMarkup
    // Using renderToStaticMarkup is fine as long as dependencies behave.
    const iconMarkup = renderToStaticMarkup(
        <div 
            style={{
                backgroundColor: bgColor,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '9999px',
                border: '2px solid white',
                boxShadow: `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 0 0 4px ${ringColor}`,
                color: 'white'
            }}
        >
            <IconComponent size={16} strokeWidth={2.5} />
        </div>
    );

    return L.divIcon({
        html: iconMarkup,
        className: "", // Empty to avoid default leaflet styles
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -36]
    });
};

export default function Map({ bars, selectedProvince, searchQuery, focusedBarId }: MapProps) {
  // Default center: CyL
  const center: [number, number] = [41.652, -4.724];

  return (
    <MapContainer
      center={center}
      zoom={8}
      className="h-full w-full z-0 bg-neutral-900"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapController
        selectedProvince={selectedProvince}
        searchQuery={searchQuery}
        bars={bars}
        focusedBarId={focusedBarId}
      />

      {bars.map((bar) => {
        if (!bar.attributes.coordinates.lat || !bar.attributes.coordinates.lon)
          return null;

        return (
          <Marker
            key={bar.id}
            position={[
              bar.attributes.coordinates.lat,
              bar.attributes.coordinates.lon,
            ]}
            icon={createCustomIcon(bar.attributes.type)}
          >
            <Popup className="leaflet-popup-dark">
              <PopupContent bar={bar} />
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
