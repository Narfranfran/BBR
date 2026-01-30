'use client';

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import { useEffect } from 'react';

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
              <div className="font-mono p-2 min-w-[200px]">
                <strong className="text-sm font-black uppercase text-black block mb-1 border-b border-black/10 pb-1">
                    {bar.attributes.name}
                </strong>
                <span className="text-xs text-orange-600 font-bold block mb-1 uppercase tracking-widest">
                    /// {bar.attributes.type}
                </span>
                <span className="text-xs text-neutral-600 block leading-tight">
                    {bar.attributes.address}<br/>
                    {bar.attributes.municipality}
                </span>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
