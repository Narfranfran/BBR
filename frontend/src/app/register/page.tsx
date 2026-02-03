'use client';

import { useAuth } from '@/hooks/useAuth';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ChevronLeft, Info, Eye, EyeOff } from 'lucide-react';
import Footer from '@/components/Layout/Footer';

const registerSchema = z.object({
  name: z.string().min(1, 'IDENTIFIER_REQUIRED'),
  email: z.string().email('Formato de email inválido'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
  password_confirmation: z.string(),
  captcha: z.string().min(1, 'CAPTCHA_REQUIRED'),
}).refine((data) => data.password === data.password_confirmation, {
  message: "Las contraseñas no coinciden",
  path: ["password_confirmation"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function Register() {
  const { register: registerUser } = useAuth({ middleware: 'guest', redirectIfAuthenticated: '/map' });
  const [serverErrors, setServerErrors] = useState<string[]>([]);
  const [captchaChallenge, setCaptchaChallenge] = useState({ num1: 0, num2: 0, result: 0 });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { register, handleSubmit, formState: { errors }, setError } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    setCaptchaChallenge({ num1, num2, result: num1 + num2 });
  };

  const submitForm = async (data: RegisterFormData) => {
    if (parseInt(data.captcha) !== captchaChallenge.result) {
      setError('captcha', { type: 'manual', message: 'Verificación fallida' });
      generateCaptcha(); 
      return;
    }

    registerUser({
      name: data.name,
      email: data.email,
      password: data.password,
      password_confirmation: data.password_confirmation,
      setErrors: setServerErrors,
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-neutral-950 relative overflow-hidden">
      <div className="flex-1 flex items-center justify-center w-full px-4 py-12">
        {/* Background Decor */}
      <div className="absolute inset-x-0 bottom-0 h-1 bg-linear-to-r from-transparent via-orange-500 to-transparent opacity-20"></div>

      <div className="max-w-md w-full relative z-10">
        <Link href="/" className="inline-flex items-center text-neutral-500 hover:text-white mb-8 transition-colors group">
            <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
            <span className="font-mono text-xs uppercase tracking-widest">Volver al inicio</span>
        </Link>
        
        <div className="bg-neutral-900/50 border border-white/10 p-8 backdrop-blur-sm">
            <div className="mb-10">
                <h1 className="text-3xl font-black text-white tracking-tighter mb-2">
                    NUEVO PERFIL<span className="text-orange-500">.</span>
                </h1>
                <p className="text-neutral-500 font-mono text-xs uppercase tracking-widest">
                    /// Unirse a la comunidad
                </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit(submitForm)}>
                
                 {/* Name Field */}
                <div>
                     <label htmlFor="name" className="block text-xs font-mono text-neutral-400 uppercase mb-2">Nombre de Usuario</label>
                    <input
                        id="name"
                        {...register('name')}
                        type="text"
                        className={`block w-full bg-neutral-950 border ${errors.name ? 'border-red-500' : 'border-white/10'} text-white px-4 py-3 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 placeholder-neutral-700 transition-colors font-mono text-sm`}
                        placeholder="username"
                    />
                    {errors.name && <p className="text-red-500 text-[0.65rem] font-mono mt-1 uppercase">/// {errors.name.message}</p>}
                </div>

                {/* Email Field */}
                <div>
                    <label htmlFor="email" className="block text-xs font-mono text-neutral-400 uppercase mb-2">Email</label>
                    <input
                        id="email"
                        {...register('email')}
                        type="email"
                        className={`block w-full bg-neutral-950 border ${errors.email ? 'border-red-500' : 'border-white/10'} text-white px-4 py-3 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 placeholder-neutral-700 transition-colors font-mono text-sm`}
                        placeholder="user@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-[0.65rem] font-mono mt-1 uppercase">/// {errors.email.message}</p>}
                </div>

                {/* Password Fields Row */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="password" className="block text-xs font-mono text-neutral-400 uppercase mb-2">Contraseña</label>
                        <div className="relative">
                            <input
                                id="password"
                                {...register('password')}
                                type={showPassword ? "text" : "password"}
                                className={`block w-full bg-neutral-950 border ${errors.password ? 'border-red-500' : 'border-white/10'} text-white px-4 py-3 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 placeholder-neutral-700 transition-colors font-mono text-sm pr-8`}
                                placeholder="••••••••"
                            />
                             <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
                                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                            >
                                {showPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                            </button>
                        </div>
                        {errors.password && <p className="text-red-500 text-[0.65rem] font-mono mt-1 uppercase">/// {errors.password.message}</p>}
                    </div>
                    <div>
                         <label htmlFor="password_confirmation" className="block text-xs font-mono text-neutral-400 uppercase mb-2">Confirmar</label>
                         <div className="relative">
                            <input
                                id="password_confirmation"
                                {...register('password_confirmation')}
                                type={showConfirmPassword ? "text" : "password"}
                                className={`block w-full bg-neutral-950 border ${errors.password_confirmation ? 'border-red-500' : 'border-white/10'} text-white px-4 py-3 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 placeholder-neutral-700 transition-colors font-mono text-sm pr-8`}
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
                                aria-label={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                            >
                                {showConfirmPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                            </button>
                        </div>
                         {errors.password_confirmation && <p className="text-red-500 text-[0.65rem] font-mono mt-1 uppercase">/// {errors.password_confirmation.message}</p>}
                    </div>
                </div>

                {/* Captcha Challenge */}
                <div className="bg-white/5 p-4 border border-white/10 mt-6">
                    <div className="flex items-center gap-2 mb-3">
                         <Info className="w-4 h-4 text-orange-500" />
                         <span className="text-xs font-mono text-orange-500 uppercase">Verificación Humana</span>
                    </div>
                    <label htmlFor="captcha" className="block text-xs text-neutral-400 mb-2">
                        Resuelve: <span className="text-white font-bold">{captchaChallenge.num1} + {captchaChallenge.num2}</span>
                    </label>
                    <input
                        id="captcha"
                        {...register('captcha')}
                        type="number"
                        className={`block w-full bg-neutral-950 border ${errors.captcha ? 'border-red-500' : 'border-white/10'} text-white px-4 py-2 focus:outline-none focus:border-orange-500 font-mono text-sm`}
                        placeholder="Resultado"
                    />
                    {errors.captcha && <p className="text-red-500 text-[0.65rem] font-mono mt-1 uppercase">/// {errors.captcha.message}</p>}
                </div>

                {serverErrors.length > 0 && (
                    <div className="bg-red-500/10 border border-red-500/20 p-4 text-red-500 text-xs font-mono uppercase">
                        {serverErrors.map((error, idx) => <div key={idx}>/// ERROR: {error}</div>)}
                    </div>
                )}

                <button
                    type="submit"
                    className="w-full bg-orange-600 text-black font-bold uppercase tracking-wider py-4 hover:bg-white hover:text-black transition-colors duration-300 text-sm mt-4"
                >
                    [ Completar Registro ]
                </button>
            </form>
            
            <div className="mt-8 text-center pt-8 border-t border-white/5">
                <p className="text-neutral-500 text-sm">
                    ¿Ya estás registrado?{' '}
                    <Link href="/login" className="text-white hover:text-orange-500 font-bold transition-colors">
                        Acceder
                    </Link>
                </p>
            </div>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
}
