'use client';

import dynamic from 'next/dynamic';
import { useBars } from '@/hooks/useBars';
import { useState } from 'react';

// Dynamically import Map to avoid SSR issues with Leaflet
const Map = dynamic(() => import('./Map'), { 
  ssr: false,
  loading: () => <div className="h-full w-full bg-slate-100 animate-pulse flex items-center justify-center">Cargando Mapa...</div>
});

export default function MapContainer() {
  const [province, setProvince] = useState('');
  const [type, setType] = useState('');
  
  const { bars, isLoading, isError } = useBars({ province, type });

  if (isLoading) return <div className="h-screen w-full flex items-center justify-center">Cargando Bares...</div>;
  if (isError) return <div className="h-screen w-full flex items-center justify-center text-red-500">Error cargando datos.</div>;

  return (
    <div className="h-screen w-full relative">
      <Map bars={bars} />
      
      {/* Floating Filter Controls */}
      <div className="absolute top-4 left-4 z-[1000] flex flex-col gap-2">
        <div className="bg-white p-3 rounded shadow-lg max-w-sm">
            <h1 className="text-xl font-bold text-gray-800">BBr - BuscaBares</h1>
            <p className="text-xs text-gray-500">{bars.length} bares encontrados</p>
        </div>

        <div className="bg-white p-3 rounded shadow-lg flex gap-2">
            <select 
                className="border border-gray-300 rounded px-2 py-1 text-sm bg-white text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
            >
                <option value="">Todas las Provincias</option>
                <option value="Ávila">Ávila</option>
                <option value="Burgos">Burgos</option>
                <option value="León">León</option>
                <option value="Palencia">Palencia</option>
                <option value="Salamanca">Salamanca</option>
                <option value="Segovia">Segovia</option>
                <option value="Soria">Soria</option>
                <option value="Valladolid">Valladolid</option>
                <option value="Zamora">Zamora</option>
            </select>

            <select 
                className="border border-gray-300 rounded px-2 py-1 text-sm bg-white text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={type}
                onChange={(e) => setType(e.target.value)}
            >
                <option value="">Todos los Tipos</option>
                <option value="Bar">Bar</option>
                <option value="Cafetería">Cafetería</option>
                <option value="Restaurante">Restaurante</option>
            </select>
        </div>
      </div>
    </div>
  );
}
