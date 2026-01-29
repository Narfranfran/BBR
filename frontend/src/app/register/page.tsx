'use client';

import { useAuth } from '@/hooks/useAuth';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const registerSchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio'),
  email: z.string().email('Email no válido'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
  password_confirmation: z.string(),
  captcha: z.string().min(1, 'Resuelve la operación'),
}).refine((data) => data.password === data.password_confirmation, {
  message: "Las contraseñas no coinciden",
  path: ["password_confirmation"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function Register() {
  const { register: registerUser } = useAuth({ middleware: 'guest', redirectIfAuthenticated: '/' });
  const [serverErrors, setServerErrors] = useState<string[]>([]);
  const [captchaChallenge, setCaptchaChallenge] = useState({ num1: 0, num2: 0, result: 0 });

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
      setError('captcha', { type: 'manual', message: 'Resultado incorrecto' });
      generateCaptcha(); // Regenerate on failure
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Crear Cuenta
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
                ¿Ya tienes cuenta?{' '}
                <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Inicia sesión
                </Link>
            </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(submitForm)}>
            <div className="rounded-md shadow-sm space-y-4">
                <div>
                    <input
                        {...register('name')}
                        type="text"
                        className={`appearance-none rounded relative block w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                        placeholder="Nombre"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                    <input
                        {...register('email')}
                        type="email"
                        className={`appearance-none rounded relative block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                        placeholder="Email"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>
                <div>
                    <input
                        {...register('password')}
                        type="password"
                        className={`appearance-none rounded relative block w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                        placeholder="Contraseña"
                    />
                     {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                </div>
                <div>
                    <input
                        {...register('password_confirmation')}
                        type="password"
                        className={`appearance-none rounded relative block w-full px-3 py-2 border ${errors.password_confirmation ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                        placeholder="Confirmar Contraseña"
                    />
                    {errors.password_confirmation && <p className="text-red-500 text-xs mt-1">{errors.password_confirmation.message}</p>}
                </div>
                
                {/* Captcha Challenge */}
                <div className="bg-indigo-50 p-3 rounded border border-indigo-100">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Verificación de seguridad: ¿Cuánto es {captchaChallenge.num1} + {captchaChallenge.num2}?
                    </label>
                    <input
                        {...register('captcha')}
                        type="number"
                        className={`appearance-none rounded relative block w-full px-3 py-2 border ${errors.captcha ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                        placeholder="Resultado"
                    />
                    {errors.captcha && <p className="text-red-500 text-xs mt-1">{errors.captcha.message}</p>}
                </div>
            </div>

            {serverErrors.length > 0 && (
                <div className="text-red-500 text-sm">
                    {serverErrors.map((error, idx) => <div key={idx}>{error}</div>)}
                </div>
            )}

            <div>
                <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Registrarse
                </button>
            </div>
        </form>
      </div>
    </div>
  );
}

