'use client';

import { useBars, Bar } from '@/hooks/useBars';
import Link from 'next/link';

export default function Ranking() {
  const { bars, isLoading } = useBars('sort=rating');

  if (isLoading) return <div className="p-10 text-center">Cargando Ranking...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">🏆 Top Bares Mejor Valorados</h1>
      
      <div className="space-y-4">
        {bars.map((bar: Bar, index: number) => (
            <div key={bar.id} className="bg-white p-4 rounded shadow flex items-center justify-between border-l-4 border-yellow-400">
                <div className="flex items-center gap-4">
                    <span className="text-2xl font-bold text-gray-400">#{index + 1}</span>
                    <div>
                        <h2 className="text-xl font-semibold">{bar.attributes.name}</h2>
                        <p className="text-gray-600 text-sm">{bar.attributes.type} • {bar.attributes.municipality}</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-sm text-gray-500">Valoración</p>
                    {/* Placeholder for actual rating until we have it in Attributes */}
                    <span className="text-2xl font-bold text-yellow-600">★ --</span> 
                </div>
            </div>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <Link href="/" className="text-indigo-600 hover:underline">Volver al Mapa</Link>
      </div>
    </div>
  );
}
