'use client';

import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function AuthButtons() {
    const { user } = useAuth();
    // Use local state to avoid hydration mismatch if user state takes time
    // heavily dependent on how useAuth behaves during SSR
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        // Render default (Login/Register) or nothing to match SSR?
        // Since we want to avoid flickering "Login" if user is logged in, 
        // we might render specific placeholder or just the unauth state.
        // For SSG/SSR landing, usually unauth is default.
        return (
            <div className="flex items-center gap-4 opacity-0"> 
               {/* Invisible placeholder to prevent layout shift */}
               <span className="text-xs font-mono uppercase tracking-widest">[ LOGIN ]</span>
            </div>
        );
    }

    if (user) {
        return (
            <div className="flex items-center gap-4 animate-in fade-in duration-500">
                <Link href="/profile" className="text-xs font-mono text-white hover:text-orange-500 transition-colors uppercase tracking-widest">
                    [ {user.name || 'PERFIL'} ]
                </Link>
                {/* Optional: Dashboard or Map link */}
                <Link href="/map" className="px-5 py-2 bg-neutral-800 text-white text-xs font-bold font-mono tracking-widest hover:bg-neutral-700 transition-colors uppercase -skew-x-12 border border-white/10">
                    <span className="block skew-x-12">MAPA</span>
                </Link>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-4 animate-in fade-in duration-500">
             <Link href="/login" className="text-xs font-mono text-neutral-400 hover:text-white transition-colors uppercase tracking-widest">
                [ LOGIN ]
             </Link>
             <Link href="/register" className="px-5 py-2 bg-orange-600 text-black text-xs font-bold font-mono tracking-widest hover:bg-orange-500 transition-colors uppercase -skew-x-12">
                <span className="block skew-x-12">JOIN_NET</span>
             </Link>
        </div>
    );
}
