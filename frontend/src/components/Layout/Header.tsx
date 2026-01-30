'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { UserCircle, Terminal } from 'lucide-react';

export default function Header() {
    const pathname = usePathname();
    const { user } = useAuth({ middleware: 'guest' });

    // Industrial Breadcrumbs
    const getBreadcrumbs = () => {
        if (pathname === '/map') return 'MAPA_TOTAL';
        const parts = pathname.split('/').filter(Boolean);
        return parts.map(p => p.toUpperCase()).join(' :: ');
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-30 ml-0 sm:ml-64 bg-neutral-950/80 backdrop-blur-md border-b border-white/10 h-16 flex items-center justify-between px-6">
            <div className="flex items-center gap-2">
                 <Terminal className="w-4 h-4 text-orange-500" />
                 <span className="text-neutral-400 font-mono text-xs tracking-wider uppercase">
                    SYSTEM // {getBreadcrumbs()}
                 </span>
            </div>

            <div className="flex items-center gap-4">
                {user ? (
                    <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                        <div className="text-right hidden sm:block">
                            <span className="block text-xs text-orange-500 font-mono font-bold leading-none">USR_ID</span>
                            <span className="text-sm text-white font-medium">{user.name}</span>
                        </div>
                        <div className="h-9 w-9 bg-neutral-900 border border-white/20 flex items-center justify-center text-white">
                             <span className="font-mono font-bold">{user.name.charAt(0).toUpperCase()}</span>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-4">
                        <Link href="/login" className="text-xs font-mono text-neutral-400 hover:text-white transition-colors uppercase tracking-widest">
                            [ LOGIN ]
                        </Link>
                        <Link href="/register" className="px-5 py-2 bg-orange-600 text-black text-xs font-bold font-mono tracking-widest hover:bg-orange-500 transition-colors uppercase skew-x-[-10deg]">
                            <span className="block skew-x-[10deg]">JOIN_NET</span>
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
}
