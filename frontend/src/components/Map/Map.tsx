'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';

// Fix for default Leaflet markers in Next.js/React
const defaultIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

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
  };
}

interface MapProps {
  bars: Bar[];
}

export default function Map({ bars }: MapProps) {
  // Default center: Valladolid, CyL usually
  const center: [number, number] = [41.652, -4.724]; 

  return (
    <MapContainer 
      center={center} 
      zoom={8} 
      className="h-full w-full z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {bars.map((bar) => {
        if (!bar.attributes.coordinates.lat || !bar.attributes.coordinates.lon) return null;
        
        return (
          <Marker 
            key={bar.id} 
            position={[bar.attributes.coordinates.lat, bar.attributes.coordinates.lon]}
            icon={defaultIcon}
          >
            <Popup>
              <div className="font-sans">
                <strong className="text-lg block mb-1">{bar.attributes.name}</strong>
                <span className="text-sm text-gray-600 block">{bar.attributes.type}</span>
                <span className="text-xs text-gray-500">{bar.attributes.address}</span>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
