"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Map, BarChart3, User, Info, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth({ middleware: "guest" }); // We don't enforce auth here, just checking state

  const navItems = [
    { name: "Mapa Interactivo", href: "/", icon: Map },
    { name: "Ranking / Datos", href: "/ranking", icon: BarChart3 },
  ];

  if (user) {
    navItems.push({ name: "Mi Perfil", href: "/profile", icon: User });
  }

  navItems.push({ name: "Acerca de", href: "/about", icon: Info });

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 transition-transform -translate-x-full sm:translate-x-0">
      <div className="h-full px-3 py-4 overflow-y-auto bg-slate-900/90 backdrop-blur-md border-r border-slate-700 text-white flex flex-col">
        <div className="mb-10 flex items-center justify-center pt-4">
          <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            BBr
          </span>
        </div>

        <ul className="space-y-2 font-medium flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center p-2 rounded-lg group transition-all duration-200
                                        ${
                                          isActive
                                            ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                                            : "text-gray-300 hover:bg-slate-800 hover:text-white"
                                        }`}
                >
                  <Icon
                    className={`w-5 h-5 transition duration-75 ${isActive ? "text-white" : "text-gray-400 group-hover:text-white"}`}
                  />
                  <span className="ms-3">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {user && (
          <div className="mt-auto border-t border-slate-700 pt-4">
            <button
              onClick={logout}
              className="flex items-center p-2 text-gray-300 rounded-lg hover:bg-red-500/10 hover:text-red-400 group w-full transition-colors"
            >
              <LogOut className="w-5 h-5 text-gray-400 group-hover:text-red-400 transition duration-75" />
              <span className="ms-3">Cerrar Sesión</span>
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
