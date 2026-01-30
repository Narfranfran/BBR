'use client';

import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function Login() {
  const { login } = useAuth({ middleware: 'guest', redirectIfAuthenticated: '/map' });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [status, setStatus] = useState<string | null>(null);

  const submitForm = async (event: React.FormEvent) => {
    event.preventDefault();

    login({
      email,
      password,
      setErrors,
      setStatus,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 px-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-20"></div>
      
      <div className="max-w-md w-full relative z-10">
        <Link href="/" className="inline-flex items-center text-neutral-500 hover:text-white mb-8 transition-colors group">
            <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
            <span className="font-mono text-xs uppercase tracking-widest">Volver al inicio</span>
        </Link>

        <div className="bg-neutral-900/50 border border-white/10 p-8 backdrop-blur-sm">
            <div className="mb-10 text-center">
                <h1 className="text-4xl font-black text-white tracking-tighter mb-2">
                    LOGIN<span className="text-orange-500">.</span>
                </h1>
                <p className="text-neutral-500 font-mono text-xs uppercase tracking-widest">
                    /// Acceso a la red
                </p>
            </div>

            <form className="space-y-6" onSubmit={submitForm}>
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-mono text-neutral-400 uppercase mb-2">Identificador (Email)</label>
                        <input
                            type="email"
                            required
                            className="block w-full bg-neutral-950 border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 placeholder-neutral-700 transition-colors font-mono text-sm"
                            placeholder="user@example.com"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-mono text-neutral-400 uppercase mb-2">Clave de Acceso</label>
                        <input
                            type="password"
                            required
                            className="block w-full bg-neutral-950 border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 placeholder-neutral-700 transition-colors font-mono text-sm"
                            placeholder="••••••••"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                </div>

                {errors.length > 0 && (
                    <div className="bg-red-500/10 border border-red-500/20 p-4 text-red-500 text-xs font-mono uppercase">
                        {errors.map((error, idx) => <div key={idx}>/// ERROR: {error}</div>)}
                    </div>
                )}
                
                {status && (
                     <div className="bg-green-500/10 border border-green-500/20 p-4 text-green-500 text-xs font-mono uppercase">
                        /// STATUS: {status}
                    </div>
                )}

                <button
                    type="submit"
                    className="w-full bg-white text-black font-bold uppercase tracking-wider py-4 hover:bg-orange-500 hover:text-white transition-colors duration-300 text-sm"
                >
                    Iniciar Sesión
                </button>
            </form>
            
            <div className="mt-8 text-center pt-8 border-t border-white/5">
                <p className="text-neutral-500 text-sm">
                    ¿No tienes ID?{' '}
                    <Link href="/register" className="text-white hover:text-orange-500 font-bold transition-colors">
                        Solicitar registro
                    </Link>
                </p>
            </div>
        </div>
      </div>
    </div>
  );
}
