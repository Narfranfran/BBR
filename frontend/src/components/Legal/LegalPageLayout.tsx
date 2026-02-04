import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface LegalPageLayoutProps {
  children: React.ReactNode;
  title: string;
  lastUpdated?: string;
}

export default function LegalPageLayout({ children, title, lastUpdated }: LegalPageLayoutProps) {
  // Default date if none provided
  const dateStr = lastUpdated || new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-green-500/30 selection:text-green-200">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-900/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-12 md:py-20">
        {/* Header Control */}
        <div className="mb-12">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors group mb-8 px-4 py-2 rounded-full border border-transparent hover:border-neutral-800 hover:bg-neutral-900/50"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Volver al inicio</span>
          </Link>

          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-6">
            {title}
            <span className="text-green-500">.</span>
          </h1>
          
          <div className="flex items-center gap-3 text-sm text-neutral-500 font-mono uppercase tracking-wider">
            <span>Ultima actualización</span>
            <span className="w-1 h-1 rounded-full bg-neutral-700" />
            <span className="text-neutral-300">{dateStr}</span>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-neutral prose-lg max-w-none 
          prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-white
          prose-p:text-neutral-400 prose-p:leading-relaxed
          prose-a:text-green-400 prose-a:no-underline hover:prose-a:text-green-300
          prose-strong:text-white
          prose-ul:marker:text-neutral-600
          prose-li:text-neutral-400">
          {children}
        </div>

        {/* Footer for Legal Page */}
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between gap-4 text-xs text-neutral-600 font-mono">
            <p>Documento legal oficial de BBr</p>
            <div className="flex gap-4">
                <Link href="/terms" className="hover:text-neutral-400 transition-colors">Términos</Link>
                <Link href="/privacy" className="hover:text-neutral-400 transition-colors">Privacidad</Link>
                <Link href="/cookies" className="hover:text-neutral-400 transition-colors">Cookies</Link>
            </div>
        </div>
      </div>
    </div>
  );
}
