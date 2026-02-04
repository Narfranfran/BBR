"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Map, BarChart3, User, Info, Disc, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function Aside({ isOpen, setOpen }: { isOpen: boolean, setOpen: (isOpen: boolean) => void }) {
  const pathname = usePathname();
  const { user } = useAuth({ middleware: "guest" });

  const navItems = [
    { name: "MAPA", href: "/map", icon: Map },
    { name: "RANKING", href: "/ranking", icon: BarChart3 },
  ];

  if (user) {
    navItems.push({ name: "PERFIL", href: "/profile", icon: User });
  }

  navItems.push({ name: "ACERCA DE", href: "/about", icon: Info });

  const handleLinkClick = () => {
    if (isOpen) {
      setOpen(false);
    }
  };

  return (
    <>
      <aside 
        className={`fixed left-0 top-0 z-40 h-screen w-64 transition-transform duration-300 ease-in-out border-r border-white/10 
                    ${isOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0`}
      >
        <div className="h-full px-4 py-8 overflow-y-auto bg-neutral-950 flex flex-col relative">
          
          <button onClick={() => setOpen(false)} className="absolute top-4 right-4 sm:hidden text-neutral-500 hover:text-white">
            <X className="w-6 h-6" />
          </button>

          <div className="mb-12 pl-2">
            <Link href="/" className="block group">
              <h1 className="text-4xl font-black tracking-tighter leading-none text-white select-none">
                BBR<span className="text-orange-500 transition-all group-hover:text-white">.</span>
              </h1>
              <p className="font-mono text-[0.6rem] text-neutral-500 mt-1 tracking-widest uppercase group-hover:text-orange-500 transition-colors">
                {'///'} SYSTEM_V.1.0
              </p>
            </Link>
          </div>

          <ul className="space-y-1 font-mono text-sm flex-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={handleLinkClick}
                    className={`flex items-center px-4 py-3 group transition-all duration-200 border-l-2
                                          ${
                                            isActive
                                              ? "border-orange-500 bg-white/5 text-white"
                                              : "border-transparent text-neutral-500 hover:text-white hover:border-white/20"
                                          }`}
                  >
                    <Icon
                      className={`w-4 h-4 transition duration-200 ${isActive ? "text-orange-500" : "text-neutral-600 group-hover:text-white"}`}
                    />
                    <span className="ms-4 tracking-wider font-bold">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-auto border-t border-white/10 pt-6">
              
            {/* Status Indicator */}
            <div className="mb-6 px-4 flex items-center gap-2 text-[0.65rem] font-mono text-neutral-600 uppercase tracking-widest">
              <Disc className="w-3 h-3 text-green-500 animate-pulse" />
              <span>Red Conectada</span>
            </div>

          </div>
        </div>
      </aside>
      {isOpen && (
        <button 
          type="button"
          onClick={() => setOpen(false)} 
          className="fixed inset-0 bg-black/50 z-30 sm:hidden w-full h-full cursor-default border-none"
          aria-label="Cerrar menú"
        />
      )}
    </>
  );
}
