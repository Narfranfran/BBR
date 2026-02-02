'use client';

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Heart, MessageSquare, Star, X } from 'lucide-react';
import Link from 'next/link';

// Fix for default Leaflet markers
const defaultIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Province Centers (Approximate)
const PROVINCES: Record<string, [number, number]> = {
  'Ávila': [40.65, -4.70],
  'Burgos': [42.34, -3.70],
  'León': [42.60, -5.57],
  'Palencia': [42.01, -4.53],
  'Salamanca': [40.96, -5.66],
  'Segovia': [40.95, -4.12],
  'Soria': [41.76, -2.46],
  'Valladolid': [41.65, -4.72],
  'Zamora': [41.50, -5.74]
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
  };
}

interface MapProps {
  bars: Bar[];
  selectedProvince?: string;
  searchQuery?: string;
}

// Internal component to handle view state updates
function MapController({ selectedProvince, searchQuery, bars }: { selectedProvince?: string, searchQuery?: string, bars: Bar[] }) {
  const map = useMap();

  useEffect(() => {
    // 1. Prioritize Search: If searching and we have results, fit bounds to them
    if (searchQuery && bars.length > 0) {
       // If only one result, fly to it directly
       if (bars.length === 1) {
          const bar = bars[0];
          map.flyTo([bar.attributes.coordinates.lat, bar.attributes.coordinates.lon], 16, { duration: 1.5 });
       } else {
          // If multiple, create bound
          const bounds = bars.map(b => [b.attributes.coordinates.lat, b.attributes.coordinates.lon] as [number, number]);
          map.fitBounds(bounds, { padding: [50, 50], maxZoom: 16 });
       }
    }
    // 2. If Province Selected (and no active specific search focus), fly to Province
    else if (selectedProvince && PROVINCES[selectedProvince]) {
      map.flyTo(PROVINCES[selectedProvince], 10, { duration: 1.5 });
    }
    // 3. Reset/Default view if nothing selected (Optional, but usually we leave it where user left it)
  }, [selectedProvince, searchQuery, bars, map]);

  return null;
}

function PopupContent({ bar }: { bar: Bar }) {
    const { user, mutate } = useAuth();
    const [reviewMode, setReviewMode] = useState(false);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [status, setStatus] = useState<string | null>(null);

    const isFavorite = user?.favorites?.some((f: any) => f.id === bar.id);

    const toggleFavorite = async () => {
        if (!user) return;
        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favorites/toggle`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({ bar_id: bar.id }),
                credentials: 'include'
            });
            mutate(); // Refresh user data to update favorites list
        } catch (e) {
            console.error(e);
        }
    };

    const submitReview = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({ bar_id: bar.id, rating, comment }),
                credentials: 'include'
            });
             if (res.ok) {
                setStatus('sent');
                setReviewMode(false);
                setComment('');
                mutate();
             }
        } catch (e) {
            console.error(e);
            setStatus('error');
        }
    };

    return (
        <div className="font-mono p-2 min-w-[220px]">
            <strong className="text-sm font-black uppercase text-black block mb-1 border-b border-black/10 pb-1">
                {bar.attributes.name}
            </strong>
            <span className="text-xs text-orange-600 font-bold block mb-1 uppercase tracking-widest">
                /// {bar.attributes.type}
            </span>
            <span className="text-xs text-neutral-600 block leading-tight mb-3">
                {bar.attributes.address}<br/>
                {bar.attributes.municipality}
            </span>

            {user && (
                <div className="border-t border-black/10 pt-2 flex flex-col gap-2">
                    {/* Actions Toolbar */}
                    {!reviewMode && (
                        <div className="flex gap-2">
                            <button 
                                onClick={toggleFavorite}
                                className={`flex-1 flex items-center justify-center gap-1 text-[10px] font-bold uppercase py-1 border transition-colors ${isFavorite ? 'bg-red-500 text-white border-red-500' : 'bg-white text-black border-neutral-300 hover:bg-neutral-100'}`}
                            >
                                <Heart className={`w-3 h-3 ${isFavorite ? 'fill-current' : ''}`} />
                                {isFavorite ? 'Favorito' : 'Guardar'}
                            </button>
                            <button 
                                onClick={() => setReviewMode(true)}
                                className="flex-1 flex items-center justify-center gap-1 text-[10px] font-bold uppercase py-1 border border-neutral-300 bg-white text-black hover:bg-neutral-100 transition-colors"
                            >
                                <MessageSquare className="w-3 h-3" />
                                Reseñar
                            </button>
                        </div>
                    )}

                    {/* Review Form */}
                    {reviewMode && (
                        <form onSubmit={submitReview} className="bg-neutral-50 p-2 rounded border border-neutral-200">
                             <div className="flex justify-between items-center mb-2">
                                <span className="text-[10px] font-bold uppercase">Nueva Reseña</span>
                                <button type="button" onClick={() => setReviewMode(false)}><X className="w-3 h-3" /></button>
                             </div>
                             
                             <div className="flex gap-1 mb-2">
                                {[1,2,3,4,5].map(star => (
                                    <button key={star} type="button" onClick={() => setRating(star)}>
                                        <Star className={`w-3 h-3 ${star <= rating ? 'fill-orange-400 text-orange-400' : 'text-neutral-300'}`} />
                                    </button>
                                ))}
                             </div>

                             <textarea 
                                className="w-full text-[10px] p-1 border border-neutral-300 rounded mb-2 h-12"
                                placeholder="Escribe tu opinión..."
                                value={comment}
                                onChange={e => setComment(e.target.value)}
                             />

                             <button 
                                type="submit" 
                                disabled={status === 'sending'}
                                className="w-full bg-black text-white text-[10px] font-bold uppercase py-1 hover:bg-orange-600 transition-colors"
                             >
                                {status === 'sending' ? 'Enviando...' : 'Publicar Reseña'}
                             </button>
                        </form>
                    )}
                </div>
            )}
            
            {!user && (
                 <div className="border-t border-black/10 pt-2 text-[10px] text-center text-neutral-500">
                    <Link href="/login" className="underline hover:text-orange-600">Inicia sesión</Link> para interactuar
                 </div>
            )}
        </div>
    );
}

export default function Map({ bars, selectedProvince, searchQuery }: MapProps) {
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
      
      <MapController selectedProvince={selectedProvince} searchQuery={searchQuery} bars={bars} />

      {bars.map((bar) => {
        if (!bar.attributes.coordinates.lat || !bar.attributes.coordinates.lon) return null;
        
        return (
          <Marker 
            key={bar.id} 
            position={[bar.attributes.coordinates.lat, bar.attributes.coordinates.lon]}
            icon={defaultIcon}
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
