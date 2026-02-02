import MapContainer from '@/components/Map/MapContainer';

import { Suspense } from 'react';

export default function MapPage() {
  return (
    <div className="h-[calc(100vh-4rem)] w-full overflow-hidden relative">
      <Suspense fallback={<div className="h-full w-full bg-neutral-950 flex items-center justify-center font-mono text-orange-500 animate-pulse">/// CARGANDO_CANAL_SEGURO...</div>}>
        <MapContainer />
      </Suspense>
    </div>
  );
}
