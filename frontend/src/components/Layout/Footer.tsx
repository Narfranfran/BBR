'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Footer() {
    const pathname = usePathname();
    const isMap = pathname === '/map';

    const currentYear = new Date().getFullYear();

    // VARIANT: MAP (Minimal)
    if (isMap) {
        return (
            <footer className="fixed bottom-0 right-0 left-0 sm:left-64 z-9999 bg-white/80 backdrop-blur-sm border-t border-neutral-200 py-1 px-4 text-[10px] text-neutral-500 flex justify-between items-center h-6">
                <div>
                   © BBr {currentYear}
                </div>
                <div className="flex gap-3">
                    <Link href="/terms" className="text-neutral-400 hover:text-black hover:underline transition-colors">Términos</Link>
                    <Link href="/privacy" className="text-neutral-400 hover:text-black hover:underline transition-colors">Privacidad</Link>
                </div>
            </footer>
        );
    }

    // VARIANT: DEFAULT (Standard)
    return (
        <footer className="bg-black text-neutral-500 py-12 border-t border-white/10 font-mono text-xs">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
                {/* Brand */}
                <div className="md:col-span-2">
                    <h3 className="text-white font-black text-2xl tracking-tighter mb-4">BBr.</h3>
                    <p className="max-w-xs leading-relaxed mb-6">
                        Plataforma Open Data de descubrimiento social. 
                        Conectando personas con lugares reales en Castilla y León.
                    </p>
                    <div className="flex items-center gap-2 text-green-500">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        OPERATIVO
                    </div>
                </div>

                {/* Columns */}
                <div>
                    <h4 className="text-white font-bold mb-4 uppercase tracking-widest">Navegación</h4>
                    <ul className="space-y-3">
                        <li><Link href="/" className="text-neutral-400 hover:text-white hover:underline transition-colors">Inicio</Link></li>
                        <li><Link href="/map" className="text-neutral-400 hover:text-white hover:underline transition-colors">Explorar Mapa</Link></li>
                        <li><Link href="/login" className="text-neutral-400 hover:text-white hover:underline transition-colors">Mi Cuenta</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-bold mb-4 uppercase tracking-widest">Legal</h4>
                    <ul className="space-y-3">
                        <li><Link href="/terms" className="text-neutral-400 hover:text-white hover:underline transition-colors">Términos</Link></li>
                        <li><Link href="/privacy" className="text-neutral-400 hover:text-white hover:underline transition-colors">Privacidad</Link></li>
                        <li><Link href="/cookies" className="text-neutral-400 hover:text-white hover:underline transition-colors">Cookies</Link></li>
                    </ul>
                </div>
            </div>
            
            <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center opacity-50">
                <p>© {currentYear} BBr Project. Todos los derechos reservados.</p>
                <p>Hecho con código y café en CyL.</p>
            </div>
        </footer>
    );
}
