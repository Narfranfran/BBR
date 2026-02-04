"use client";

import { useAuth } from "@/hooks/useAuth";
import { useState, useRef } from "react";
import Link from "next/link";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import Footer from "@/components/Layout/Footer";
import ReCAPTCHA from "react-google-recaptcha";

export default function Login() {
  const { login } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/profile",
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [status, setStatus] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const onReCAPTCHAChange = (token: string | null) => {
    setRecaptchaToken(token || "");
  };

  const submitForm = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!recaptchaToken) {
        setErrors(["Por favor, completa el captcha"]);
        return;
    }

    login({
      email,
      password,
      recaptcha_token: recaptchaToken,
      setErrors: (errors: string[]) => {
          setErrors(errors);
          recaptchaRef.current?.reset();
          setRecaptchaToken("");
      },
      setStatus,
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-neutral-950 relative overflow-hidden">
      {/* Spacer for centering */}
      <div className="flex-1 flex items-center justify-center w-full px-4 py-12">
      {/* Background Decor */}
      <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-transparent via-orange-500 to-transparent opacity-20"></div>

      <div className="max-w-md w-full relative z-10">
        <Link
          href="/"
          className="inline-flex items-center text-neutral-500 hover:text-white mb-8 transition-colors group"
        >
          <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
          <span className="font-mono text-xs uppercase tracking-widest">
            Volver al inicio
          </span>
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
                <label htmlFor="email" className="block text-xs font-mono text-neutral-400 uppercase mb-2">
                  Identificador (Email)
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  className="block w-full bg-neutral-950 border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 placeholder-neutral-700 transition-colors font-mono text-sm"
                  placeholder="user@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="relative">
                <label htmlFor="password" className="block text-xs font-mono text-neutral-400 uppercase mb-2">
                  Clave de Acceso
                </label>
                <div className="relative">
                    <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="block w-full bg-neutral-950 border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 placeholder-neutral-700 transition-colors font-mono text-sm pr-10"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
                        aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                </div>
                <div className="mt-2 text-right">
                    <Link href="/forgot-password" className="text-[0.65rem] text-neutral-500 hover:text-orange-500 font-mono uppercase">
                        ¿Olvidaste tu contraseña?
                    </Link>
                </div>
              </div>
            </div>

            {/* ReCAPTCHA */}
            <div className="flex justify-center mt-6">
                <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
                    onChange={onReCAPTCHAChange}
                    theme="dark"
                />
            </div>

            {errors.length > 0 && (
              <div className="bg-red-500/10 border border-red-500/20 p-4 text-red-500 text-xs font-mono uppercase">
                {errors.map((error, idx) => (
                  <div key={idx}>/// ERROR: {error}</div>
                ))}
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
              ¿No tienes ID?{" "}
              <Link
                href="/register"
                className="text-white hover:text-orange-500 font-bold transition-colors"
              >
                Solicitar registro
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
