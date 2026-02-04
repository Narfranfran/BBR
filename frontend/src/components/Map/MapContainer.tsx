'use client';

import dynamic from 'next/dynamic';
import { useBars, BarsFilters } from '@/hooks/useBars';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import MapControls from './MapControls';

// Dynamically import Map to avoid SSR issues with Leaflet
const Map = dynamic(() => import('./Map'), { 
  ssr: false,
  loading: () => <div className="h-full w-full bg-neutral-950 flex items-center justify-center font-mono text-orange-500 animate-pulse">{'///'} CARGANDO_CARTOGRAFÍA...</div>
});

export default function MapContainer() {
  const searchParams = useSearchParams();
  
  // Initialize state from URL params if available
  const [filters, setFilters] = useState<BarsFilters>({
    province: searchParams.get('province') || '',
    type: searchParams.get('type') || '',
    search: searchParams.get('search') || '',
  });

  const { bars, isLoading, isError } = useBars(filters);

  // Update filters if URL changes (optional, but good for back button)
  useEffect(() => {
    const newFilters = {
        province: searchParams.get('province') || '',
        type: searchParams.get('type') || '',
        search: searchParams.get('search') || '',
    };
    // Only update if different to avoid loops/unnecessary re-renders
    if (JSON.stringify(newFilters) !== JSON.stringify(filters)) {
       // logic here if we wanted strict sync, but local state is often smoother
       // For now, let's trust initial state or explicit user interaction
    }
  }, [searchParams]);

  if (isLoading) return <div className="h-screen w-full bg-neutral-950 flex items-center justify-center font-mono text-orange-500 animate-pulse">{'///'} ACCEDIENDO_SATÉLITE...</div>;
  if (isError) return <div className="h-screen w-full bg-neutral-950 flex items-center justify-center font-mono text-red-500">{'///'} ERROR_DE_CONEXIÓN</div>;

  return (
    <div className="h-screen w-full relative bg-gray-100">
      <Map 
        bars={bars} 
        selectedProvince={filters.province}
        searchQuery={filters.search}
        focusedBarId={searchParams.get('barId')}
      />
      
      <MapControls 
        filters={filters} 
        onFilterChange={setFilters} 
        totalResults={bars.length} 
      />
    </div>
  );
}
