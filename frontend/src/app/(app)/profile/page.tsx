'use client';

import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { Star, MapPin } from 'lucide-react';

export default function Profile() {
  const { user } = useAuth({ middleware: 'auth' });

  if (!user) return <div className="p-8 font-mono text-orange-500 animate-pulse">/// CARGANDO_DATOS_USUARIO...</div>;

  return (
    <div className="p-6 md:p-12 max-w-7xl mx-auto min-h-screen">
      
      {/* HEADER PROFILE */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-12 border-b border-white/10 pb-12">
        <div className="h-24 w-24 md:h-32 md:w-32 bg-neutral-900 border-2 border-orange-500 flex items-center justify-center text-white text-5xl font-black shadow-[0_0_30px_-10px_rgba(249,115,22,0.3)]">
            {user.name.charAt(0).toUpperCase()}
        </div>
        <div>
            <div className="flex items-center gap-2 mb-2">
                <span className="bg-orange-600 text-black text-[0.6rem] font-bold px-2 py-0.5 font-mono uppercase tracking-widest">
                    Citizen
                </span>
                <span className="text-neutral-500 font-mono text-xs">ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none mb-1">
                {user.name}
            </h1>
            <p className="text-neutral-400 font-mono text-sm">{user.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Mis Reseñas */}
        <div className="group">
            <div className="flex items-end justify-between mb-4 border-b border-white/10 pb-2">
                <h2 className="text-xl font-bold text-white uppercase tracking-tight">
                    <span className="text-orange-500 mr-2">///</span> 
                    Historial de Reseñas
                </h2>
                <span className="font-mono text-xs text-neutral-500">{user.reviews?.length || 0} RECORDS</span>
            </div>
            
            {user.reviews?.length > 0 ? (
                <div className="grid gap-4">
                    {user.reviews.map((review: any) => (
                        <div key={review.id} className="bg-white/5 p-6 border border-white/10 hover:border-orange-500/50 transition-colors">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-white font-bold uppercase tracking-wide">{review.bar?.name || 'Local desconocido'}</h3>
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-orange-500 text-orange-500' : 'text-neutral-700'}`} />
                                    ))}
                                </div>
                            </div>
                            <p className="text-neutral-400 text-sm font-mono leading-relaxed">"{review.comment}"</p>
                            <div className="mt-2 text-[10px] text-neutral-600 font-mono uppercase">
                                {new Date(review.created_at).toLocaleDateString()}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="border border-white/5 bg-white/2 p-8 md:p-12 text-center">
                    <p className="text-neutral-500 font-light text-lg mb-6">No hay datos de exploración registrados.</p>
                    <Link href="/map" className="inline-block px-6 py-3 border border-orange-500 text-orange-500 font-mono text-xs font-bold uppercase tracking-widest hover:bg-orange-500 hover:text-black transition-all">
                        Iniciar Exploración &rarr;
                    </Link>
                </div>
            )}
        </div>

        {/* Mis Favoritos */}
        <div className="group">
            <div className="flex items-end justify-between mb-4 border-b border-white/10 pb-2">
                <h2 className="text-xl font-bold text-white uppercase tracking-tight">
                    <span className="text-red-500 mr-2">///</span> 
                    Favoritos Guardados
                </h2>
                <span className="font-mono text-xs text-neutral-500">{user.favorites?.length || 0} RECORDS</span>
            </div>

             {user.favorites?.length > 0 ? (
                <div className="grid gap-4">
                    {user.favorites.map((bar: any) => (
                        <div key={bar.id} className="bg-white/5 p-6 border border-white/10 hover:border-red-500/50 transition-colors flex justify-between items-center">
                            <div>
                                <h3 className="text-white font-bold uppercase tracking-wide mb-1">{bar.name}</h3>
                                <div className="flex items-center text-neutral-500 text-xs font-mono">
                                    <MapPin className="w-3 h-3 mr-1" />
                                    {bar.municipality || 'Ubicación desconocida'}
                                </div>
                            </div>
                            <Link href="/map" className="text-xs border border-white/20 px-3 py-1 hover:bg-white hover:text-black transition-colors font-mono uppercase">
                                Ver
                            </Link>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="border border-white/5 bg-white/2 p-8 md:p-12 text-center">
                    <p className="text-neutral-500 font-light text-lg">Sin marcadores guardados.</p>
                </div>
            )}
        </div>

      </div>
    </div>
  );
}
