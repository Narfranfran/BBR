'use client';

import dynamic from 'next/dynamic';
import { useBars } from '@/hooks/useBars';

// Dynamically import Map to avoid SSR issues with Leaflet
const Map = dynamic(() => import('./Map'), { 
  ssr: false,
  loading: () => <div className="h-full w-full bg-slate-100 animate-pulse flex items-center justify-center">Cargando Mapa...</div>
});

export default function MapContainer() {
  const { bars, isLoading, isError } = useBars();

  if (isLoading) return <div className="h-screen w-full flex items-center justify-center">Cargando Bares...</div>;
  if (isError) return <div className="h-screen w-full flex items-center justify-center text-red-500">Error cargando datos.</div>;

  return (
    <div className="h-screen w-full relative">
      <Map bars={bars} />
      
      {/* Floating Action Button or Search Bar could go here */}
      <div className="absolute top-4 left-4 z-1000 bg-white p-2 rounded shadow-lg">
        <h1 className="text-xl font-bold text-gray-800">BBr - BuscaBares</h1>
        <p className="text-xs text-gray-500">{bars.length} bares encontrados</p>
      </div>
    </div>
  );
}
