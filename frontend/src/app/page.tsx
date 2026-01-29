import MapContainer from '@/components/Map/MapContainer';

export default function Home() {
  return (
    <div className="h-[calc(100vh-4rem)] w-full overflow-hidden relative">
      <MapContainer />
    </div>
  );
}
