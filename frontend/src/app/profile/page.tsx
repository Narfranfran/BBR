'use client';

import { useAuth } from '@/hooks/useAuth';

export default function Profile() {
  const { user } = useAuth({ middleware: 'auth' });

  if (!user) return <div className="p-8">Cargando perfil...</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-center gap-6 mb-8">
        <div className="h-20 w-20 rounded-full bg-indigo-600 flex items-center justify-center text-white text-3xl font-bold">
            {user.name.charAt(0).toUpperCase()}
        </div>
        <div>
            <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-gray-500">{user.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Mis Reseñas Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Mis Reseñas</h2>
            <div className="text-center py-10 text-gray-400 bg-gray-50 rounded-lg">
                <p>Aún no has escrito ninguna reseña.</p>
                <button className="mt-4 text-sm text-indigo-600 font-medium hover:underline">
                    Explorar mapa para opinar
                </button>
            </div>
        </div>

        {/* Mis Eventos Section (Placeholder) */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Mis Eventos Guardados</h2>
             <div className="text-center py-10 text-gray-400 bg-gray-50 rounded-lg">
                <p>No tienes eventos próximos.</p>
            </div>
        </div>
      </div>
    </div>
  );
}
