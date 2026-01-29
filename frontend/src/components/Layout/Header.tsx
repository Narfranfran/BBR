'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { UserCircle } from 'lucide-react';

export default function Header() {
    const pathname = usePathname();
    const { user } = useAuth({ middleware: 'guest' });

    // Simple breadcrumb logic
    const getBreadcrumbs = () => {
        if (pathname === '/') return 'Explorar';
        const parts = pathname.split('/').filter(Boolean);
        return parts.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' / ');
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-30 ml-0 sm:ml-64 bg-white/80 backdrop-blur-sm border-b border-gray-200 h-16 flex items-center justify-between px-6 transition-all">
            <div className="flex items-center">
                 {/* Mobile Menu Trigger (Placeholder for now) */}
                 <span className="text-gray-500 text-sm font-medium">BBr / {getBreadcrumbs()}</span>
            </div>

            <div className="flex items-center gap-4">
                {user ? (
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-700 hidden sm:inline">{user.name}</span>
                        <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                             <UserCircle className="w-5 h-5" />
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-3">
                        <Link href="/login" className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors">
                            Iniciar Sesión
                        </Link>
                        <Link href="/register" className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-full hover:bg-indigo-700 transition-colors shadow-sm">
                            Registrarse
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
}
