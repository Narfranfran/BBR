'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Info, Eye, EyeOff } from 'lucide-react';
import PasswordStrength from '@/components/PasswordStrength';

import { getCookie } from '@/utils/cookies';

export default function ForgotPassword() {
  const router = useRouter();
  const [step, setStep] = useState(1); // 1: Email, 2: Code & New Password
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const csrf = () => fetch(`${process.env.NEXT_PUBLIC_API_URL?.replace(/\/api\/?$/, '')}/sanctum/csrf-cookie`, { credentials: 'include' });

  const handleRequestCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    setError(null);

    try {
        await csrf(); 
        
        // Wait briefly for cookie
        await new Promise(r => setTimeout(r, 500));

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/password/email`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json', 
                'Accept': 'application/json',
                'X-XSRF-TOKEN': decodeURIComponent(getCookie('XSRF-TOKEN') || '')
            },
            body: JSON.stringify({ email }),
            credentials: 'include'
        });
        const data = await res.json();
        
        if (res.ok) {
            setStatus(data.message);
            setTimeout(() => setStep(2), 1500);
        } else {
            setError(data.message || 'Error al enviar código.');
        }
    } catch (err) {
        setError('Error de conexión.');
    } finally {
        setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null); // Clear previous password errors

    if (password !== passwordConfirmation) {
        setPasswordError('Las contraseñas no coinciden.');
        return;
    }
    if (password.length < 8) {
        setPasswordError('La contraseña debe tener al menos 8 caracteres.');
        return;
    }
    if (!/[A-Z]/.test(password)) {
        setPasswordError('La contraseña debe contener al menos una mayúscula.');
        return;
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
        setPasswordError('La contraseña debe contener al menos un símbolo.');
        return;
    }

    setLoading(true);
    setStatus(null);
    setError(null);

    try {
        await csrf();
        
        // Wait briefly for cookie
        await new Promise(r => setTimeout(r, 500));

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/password/reset`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json', 
                'Accept': 'application/json',
                'X-XSRF-TOKEN': decodeURIComponent(getCookie('XSRF-TOKEN') || '')
            },
            body: JSON.stringify({ email, code, password, password_confirmation: passwordConfirmation }),
            credentials: 'include'
        });
        const data = await res.json();

        if (res.ok) {
             setStatus(data.message);
             setTimeout(() => {
                 router.push('/login');
             }, 2000);
        } else {
             setError(data.message || 'Error al restablecer contraseña.');
        }
    } catch (err) {
         setError('Error de conexión.');
    } finally {
         setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 px-4 relative overflow-hidden">
      <div className="absolute inset-x-0 bottom-0 h-1 bg-linear-to-r from-transparent via-orange-500 to-transparent opacity-20"></div>

      <div className="max-w-md w-full relative z-10">
        <Link href="/login" className="inline-flex items-center text-neutral-500 hover:text-white mb-8 transition-colors group">
            <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
            <span className="font-mono text-xs uppercase tracking-widest">Volver al Login</span>
        </Link>
        
        <div className="bg-neutral-900/50 border border-white/10 p-8 backdrop-blur-sm">
            <div className="mb-10 text-center">
                <h1 className="text-3xl font-black text-white tracking-tighter mb-2">
                    RECUPERACIÓN<span className="text-orange-500">.</span>
                </h1>
                <p className="text-neutral-500 font-mono text-xs uppercase tracking-widest">
                    /// Acceso de emergencia
                </p>
            </div>

            {status && (
                <div className="bg-green-500/10 border border-green-500/20 p-4 mb-6 text-green-500 text-xs font-mono uppercase">
                    /// {status}
                </div>
            )}
            {error && (
                <div className="bg-red-500/10 border border-red-500/20 p-4 mb-6 text-red-500 text-xs font-mono uppercase">
                    /// ERROR: {error}
                </div>
            )}

            {step === 1 ? (
                 <form onSubmit={handleRequestCode} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-xs font-mono text-neutral-400 uppercase mb-2">Identificador (Email)</label>
                        <input
                            id="email"
                            type="email"
                            required
                            className="block w-full bg-neutral-950 border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-orange-500 font-mono text-sm"
                            placeholder="user@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <button type="submit" disabled={loading} className="w-full bg-white text-black font-bold uppercase tracking-wider py-4 hover:bg-orange-500 hover:text-white transition-colors duration-300 text-sm disabled:opacity-50">
                        {loading ? 'Transmitiendo...' : 'Enviar Código'}
                    </button>
                 </form>
            ) : (
                <form onSubmit={handleResetPassword} className="space-y-6">
                    <div className="bg-white/5 p-4 border border-white/10 mb-6">
                        <div className="flex items-center gap-2 mb-2">
                            <Info className="w-4 h-4 text-orange-500" />
                            <span className="text-[10px] font-mono text-orange-500 uppercase">Verifica tu email</span>
                        </div>
                        <p className="text-xs text-neutral-400">Hemos enviado un código de 6 dígitos a <span className="text-white">{email}</span>.</p>
                    </div>

                    <div>
                        <label htmlFor="code" className="block text-xs font-mono text-neutral-400 uppercase mb-2">Código de Verificación</label>
                        <input
                            id="code"
                            type="text"
                            required
                            maxLength={6}
                            className="block w-full bg-neutral-950 border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-orange-500 font-mono text-center tracking-[0.5em] text-lg uppercase"
                            placeholder="000000"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                    </div>

                    <div className="grid gap-4">
                        <div>
                            <label htmlFor="new-password" className="block text-xs font-mono text-neutral-400 uppercase mb-2">Nueva Clave</label>
                            <div className="relative">
                                <input
                                    id="new-password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    className="block w-full bg-neutral-950 border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-orange-500 font-mono text-sm pr-10"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white" aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}>
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                             <PasswordStrength password={password} />
                             {passwordError && <p className="text-red-500 text-[0.65rem] font-mono mt-1 uppercase">/// {passwordError}</p>}
                        </div>
                        <div>
                             <label htmlFor="new-password-confirmation" className="block text-xs font-mono text-neutral-400 uppercase mb-2">Confirmar Clave</label>
                            <input
                                id="new-password-confirmation"
                                type="password"
                                required
                                className="block w-full bg-neutral-950 border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-orange-500 font-mono text-sm"
                                placeholder="••••••••"
                                value={passwordConfirmation}
                                onChange={(e) => setPasswordConfirmation(e.target.value)}
                            />
                        </div>
                    </div>

                     <button type="submit" disabled={loading} className="w-full bg-orange-600 text-black font-bold uppercase tracking-wider py-4 hover:bg-white transition-colors duration-300 text-sm disabled:opacity-50">
                        {loading ? 'Procesando...' : 'Restablecer Clave'}
                    </button>
                    
                     <div className="text-center">
                        <button type="button" onClick={() => setStep(1)} className="text-[10px] text-neutral-500 hover:text-white uppercase font-mono mt-2">
                             &larr; Volver a generar código
                        </button>
                    </div>
                </form>
            )}

        </div>
      </div>
    </div>
  );
}
