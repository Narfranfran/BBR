'use client';

import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { Star, MapPin, Trash2, Edit2, X, Save, ArrowUpDown } from 'lucide-react';
import { useState } from 'react';
import { getCookie } from '@/utils/cookies';

export default function Profile() {
  const { user, mutate } = useAuth({ middleware: 'auth' });
  
  const csrf = () => fetch(`${process.env.NEXT_PUBLIC_API_URL?.replace(/\/api\/?$/, '')}/sanctum/csrf-cookie`, { credentials: 'include' });
  
  // States for Review Management
  const [sortOrder, setSortOrder] = useState<'date' | 'rating' | 'name'>('date');
  const [editingReview, setEditingReview] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ rating: 0, comment: '' });

  if (!user) return <div className="p-8 font-mono text-orange-500 animate-pulse">/// CARGANDO_DATOS_USUARIO...</div>;

  // Sorting Logic
  const getSortedReviews = () => {
    if (!user.reviews) return [];
    
    return [...user.reviews].sort((a, b) => {
        if (sortOrder === 'date') return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        if (sortOrder === 'rating') return b.rating - a.rating;
        if (sortOrder === 'name') return (a.bar?.nombre || '').localeCompare(b.bar?.nombre || '');
        return 0;
    });
  };

  // Handlers
  const handleDeleteReview = async (reviewId: number) => {
    if (!confirm('¿Estás seguro de eliminar esta reseña?')) return;

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews/${reviewId}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'X-XSRF-TOKEN': decodeURIComponent(getCookie('XSRF-TOKEN') || ''),
            },
            credentials: 'include',
        });
        if (response.ok) mutate(); 
    } catch (e) {
        console.error("Error deleting review", e);
    }
  };

  const startEditing = (review: any) => {
    setEditingReview(review.id);
    setEditForm({ rating: review.rating, comment: review.comment });
  };

  const handleUpdateReview = async (reviewId: number) => {
    try {
         const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews/${reviewId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-XSRF-TOKEN': decodeURIComponent(getCookie('XSRF-TOKEN') || ''),
            },
            body: JSON.stringify(editForm),
            credentials: 'include',
        });
        if (response.ok) {
            setEditingReview(null);
            mutate();
        }
    } catch (e) {
        console.error("Error updating review", e);
    }
  };

  const handleRemoveFavorite = async (barId: number) => {
    if (!confirm('¿Quitar de favoritos?')) return;
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favorites/toggle`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-XSRF-TOKEN': decodeURIComponent(getCookie('XSRF-TOKEN') || ''),
            },
            body: JSON.stringify({ bar_id: barId }),
            credentials: 'include',
        });
        if (response.ok) mutate();
      } catch (e) {
        console.error("Error removing favorite", e);
    }
  };

    const handleClearData = async () => {
        try {
            await csrf();
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/data`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'X-XSRF-TOKEN': decodeURIComponent(getCookie('XSRF-TOKEN') || ''),
                },
                credentials: 'include',
            });
            if (res.ok) {
                await mutate();
                alert('Tus datos han sido eliminados correctamente.');
            }
        } catch (error) {
            console.error('Error clearing data:', error);
            alert('Error al eliminar los datos.');
        }
    };

    const handleDeleteAccount = async () => {
        try {
            await csrf();
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/account`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'X-XSRF-TOKEN': decodeURIComponent(getCookie('XSRF-TOKEN') || ''),
                },
                credentials: 'include',
            });
            if (res.ok) {
                window.location.href = '/login';
            }
        } catch (error) {
            console.error('Error deleting account:', error);
            alert('Error al eliminar la cuenta.');
        }
    };


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
                
                <div className="flex items-center gap-4">
                    {/* Sort Controls */}
                    <div className="flex bg-white/5 rounded p-1">
                        <button onClick={() => setSortOrder('date')} className={`px-2 py-1 text-[10px] uppercase font-mono ${sortOrder === 'date' ? 'bg-orange-500 text-black' : 'text-neutral-500 hover:text-white'}`}>Fecha</button>
                        <button onClick={() => setSortOrder('rating')} className={`px-2 py-1 text-[10px] uppercase font-mono ${sortOrder === 'rating' ? 'bg-orange-500 text-black' : 'text-neutral-500 hover:text-white'}`}>Calif.</button>
                        <button onClick={() => setSortOrder('name')} className={`px-2 py-1 text-[10px] uppercase font-mono ${sortOrder === 'name' ? 'bg-orange-500 text-black' : 'text-neutral-500 hover:text-white'}`}>Nombre</button>
                    </div>
                    <span className="font-mono text-xs text-neutral-500">{user.reviews?.length || 0} RECORDS</span>
                </div>
            </div>
            
            {Array.isArray(user.reviews) && user.reviews.length > 0 ? (
                <div className="grid gap-4">
                    {getSortedReviews().map((review: any) => (
                        <div key={review.id} className="bg-white/5 p-6 border border-white/10 hover:border-orange-500/50 transition-colors relative group/card">
                            
                            {editingReview === review.id ? (
                                // EDIT MODE
                                <div className="space-y-3 animate-in fade-in zoom-in-95 duration-200">
                                    <div className="flex justify-between items-center bg-black/30 p-2 rounded">
                                        <h3 className="text-white font-bold uppercase tracking-wide text-sm">{review.bar?.nombre}</h3>
                                        <button onClick={() => setEditingReview(null)}><X className="w-4 h-4 text-neutral-500 hover:text-white" /></button>
                                    </div>
                                    <div className="flex gap-1">
                                         {[1, 2, 3, 4, 5].map((star) => (
                                            <button key={star} onClick={() => setEditForm({...editForm, rating: star})}>
                                                <Star className={`w-4 h-4 ${star <= editForm.rating ? 'fill-orange-500 text-orange-500' : 'text-neutral-700'}`} />
                                            </button>
                                         ))}
                                    </div>
                                    <textarea 
                                        value={editForm.comment}
                                        onChange={(e) => setEditForm({...editForm, comment: e.target.value})}
                                        className="w-full bg-black/50 border border-white/10 text-white p-2 text-sm font-mono focus:border-orange-500 outline-none"
                                        rows={3}
                                    />
                                    <button onClick={() => handleUpdateReview(review.id)} className="w-full bg-orange-600 hover:bg-orange-500 text-black font-bold uppercase text-[10px] py-2 flex items-center justify-center gap-2">
                                        <Save className="w-3 h-3" /> Guardar Cambios
                                    </button>
                                </div>
                            ) : (
                                // VIEW MODE
                                <div className="flex justify-between gap-4">
                                    <div className="flex-1 pr-4">
                                        <h3 className="text-white font-bold uppercase tracking-wide mb-2">{review.bar?.nombre || 'Local desconocido'}</h3>
                                        <p className="text-neutral-400 text-sm font-mono leading-relaxed text-wrap">"{review.comment}"</p>
                                        <div className="mt-2 text-[10px] text-neutral-600 font-mono uppercase">
                                            {review.created_at ? new Date(review.created_at).toLocaleDateString() : ''}
                                        </div>
                                    </div>
                                    
                                    <div className="flex flex-col items-end gap-2 shrink-0">
                                        <div className="relative flex items-center">
                                            {/* Actions - Positioned to the left of stars */}
                                            <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 flex gap-2 opacity-0 group-hover/card:opacity-100 transition-opacity duration-200">
                                                <button onClick={() => startEditing(review)} className="text-neutral-500 hover:text-orange-500 bg-black/50 rounded-full p-1 border border-white/10 hover:border-orange-500 transition-colors"><Edit2 className="w-3 h-3" /></button>
                                                <button onClick={() => handleDeleteReview(review.id)} className="text-neutral-500 hover:text-red-500 bg-black/50 rounded-full p-1 border border-white/10 hover:border-red-500 transition-colors"><Trash2 className="w-3 h-3" /></button>
                                            </div>

                                            <div className="flex">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className={`w-3 h-3 ${i < (review.rating || 0) ? 'fill-orange-500 text-orange-500' : 'text-neutral-700'}`} />
                                                ))}
                                            </div>
                                        </div>
                                        {review.bar?.nombre && (
                                            <Link href={`/map?barId=${review.bar_id}`} className="text-[10px] border border-white/20 px-3 py-1 hover:bg-white hover:text-black transition-colors font-mono uppercase flex items-center gap-1 mt-auto">
                                                Ver
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            )}
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

             {Array.isArray(user.favorites) && user.favorites.length > 0 ? (
                <div className="grid gap-4">
                    {user.favorites.map((bar: any) => (
                        <div key={bar.id} className="bg-white/5 p-6 border border-white/10 hover:border-red-500/50 transition-colors flex justify-between items-center group/fav">
                            <div>
                                <h3 className="text-white font-bold uppercase tracking-wide mb-1">{bar.nombre}</h3>
                                <div className="flex items-center text-neutral-500 text-xs font-mono">
                                    <MapPin className="w-3 h-3 mr-1" />
                                    {bar.municipio || 'Ubicación desconocida'}
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                                <Link href={`/map?barId=${bar.id}`} className="text-xs border border-white/20 px-3 py-1 hover:bg-white hover:text-black transition-colors font-mono uppercase">
                                    Ver
                                </Link>
                                <button 
                                    onClick={() => handleRemoveFavorite(bar.id)}
                                    className="text-neutral-600 hover:text-red-500 p-1 opacity-0 group-hover/fav:opacity-100 transition-opacity"
                                    title="Quitar de favoritos"
                                >
                                    <Trash2 className="w-3 h-3" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
             ) : (
                <div className="border border-white/5 bg-white/2 p-8 text-center">
                    <p className="text-neutral-500 font-light text-sm">No has guardado ningún favorito aún.</p>
                </div>
             )}
        </div>

        {/* Danger Zone */}
        <div className="mt-16 pt-8 border-t border-red-900/30">
            <h2 className="text-xl font-bold text-red-500 uppercase tracking-tight mb-4">
                /// Zona de Peligro
            </h2>
            <div className="bg-red-950/10 border border-red-900/20 p-6 grid md:grid-cols-2 gap-6">
                <div>
                    <h3 className="text-white font-bold uppercase text-sm mb-2">Eliminar datos de actividad</h3>
                    <p className="text-neutral-500 text-xs mb-4">Esto eliminará permanentemente todas tus reseñas y favoritos, pero mantendrá tu cuenta activa.</p>
                    <button 
                        onClick={() => {
                            if(confirm('¿Estás SEGURO de que quieres eliminar todas tus reseñas y favoritos?\nEsta acción no se puede deshacer.')) {
                                handleClearData();
                            }
                        }}
                        className="border border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white px-4 py-2 text-xs font-mono uppercase transition-colors"
                    >
                        Eliminar mis datos
                    </button>
                </div>
                <div>
                    <h3 className="text-white font-bold uppercase text-sm mb-2">Eliminar cuenta</h3>
                    <p className="text-neutral-500 text-xs mb-4">Esto eliminará tu cuenta y todos tus datos asociados permanentemente. No podrás recuperar el acceso.</p>
                    <button 
                        onClick={() => {
                            if(confirm('¿Estás SEGURO de que quieres eliminar tu cuenta?\nSe borrarán TODOS tus datos y perderás el acceso permanentemente.\n\nEscribe "CONFIRMAR" para continuar.') === true) {
                                handleDeleteAccount();
                            }
                        }}
                        className="bg-red-900/20 hover:bg-red-600 text-red-500 hover:text-white border border-red-500/50 px-4 py-2 text-xs font-mono uppercase transition-colors w-full md:w-auto"
                    >
                        Eliminar cuenta permanentemente
                    </button>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}
