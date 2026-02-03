import Link from 'next/link';
import type { Metadata } from 'next';
import Footer from '@/components/Layout/Footer';
import AuthButtons from '@/components/Landing/AuthButtons';
import ReviewsCarousel from '@/components/Landing/ReviewsCarousel';

export const metadata: Metadata = {
  title: 'Inicio',
  description: 'Descubre los mejores bares y comunidades de Castilla y León. BBr es tu plataforma social de ocio.',
  // SEO: og:title configured
  openGraph: {
    title: 'BBr - Inicio',
    description: 'Descubre los mejores bares de CyL.',
  },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white selection:bg-orange-500 selection:text-black font-sans">
      {/* BACKGROUND TEXTURE */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03]" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), repeating-linear-gradient(45deg, #000 25%, #202020 25%, #202020 75%, #000 75%, #000)' }}></div>

      {/* HERO SECTION */}
      <main className="flex flex-col relative z-10">
        
        <header className="p-6 border-b border-white/10 flex justify-between items-center bg-black/50 backdrop-blur-md sticky top-0 z-50">
          <div className="flex flex-col">
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-none text-transparent bg-clip-text bg-linear-to-r from-white to-neutral-500 select-none">
              BBR<span className="text-orange-500">.</span>
            </h1>
            <p className="font-mono text-[10px] md:text-xs text-orange-500 mt-1 tracking-widest uppercase">
              /// Plataforma_de_Descubrimiento
            </p>
          </div>
          
          <AuthButtons />
        </header>

        {/* MAIN ACTION - ASYMMETRIC */}
        <section className="grid grid-cols-1 md:grid-cols-12 min-h-[50vh] md:min-h-[60vh] border-b border-white/10">
          {/* TEXT BLOCK */}
          <div className="md:col-span-8 p-6 md:p-12 flex flex-col justify-center border-r border-white/10 relative overflow-hidden group">
            {/* Background Text Decor */}
            <span className="absolute -right-20 -bottom-20 text-[20rem] font-black text-white/5 pointer-events-none select-none group-hover:text-white/10 transition-colors leading-none">
              GO
            </span>

            <h2 className="text-5xl md:text-8xl lg:text-9xl font-bold uppercase leading-[0.85] tracking-tight mb-8 relative z-10">
              ENCUENTRA<br />
              TU<br />
              <span className="text-orange-500">SITIO.</span>
            </h2>
            <p className="max-w-xl text-neutral-400 text-lg md:text-xl font-light leading-relaxed">
              Explora los mejores bares, eventos y comunidades de tu ciudad. 
              <span className="block text-white font-medium mt-2">Sin filtros. Pura realidad.</span>
            </p>
          </div>

          {/* GIANT LINK */}
          <Link 
            href="/map" 
            className="md:col-span-4 bg-orange-600 hover:bg-orange-500 text-black flex items-center justify-center relative overflow-hidden transition-all duration-300 group"
          >
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay"></div>
            <span className="relative z-10 text-4xl md:text-6xl font-black tracking-tighter group-hover:scale-105 transition-transform duration-300">
              EXPLORAR &rarr;
            </span>
            {/* Hover Sweep */}
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 mix-blend-overlay"></div>
          </Link>
        </section>

        {/* PROVINCES SCROLL */}
        <section className="border-b border-white/10 bg-neutral-900/30 backdrop-blur-sm">
          <div className="p-4 border-b border-white/10 flex justify-between items-center">
             <h3 className="font-mono text-sm text-neutral-500 uppercase tracking-widest">/// Zonas_Activas</h3>
             <div className="flex gap-2">
                <span className="w-2 h-2 bg-neutral-700 rounded-full"></span>
                <span className="w-2 h-2 bg-neutral-700 rounded-full"></span>
                <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
             </div>
          </div>
          <div className="flex overflow-x-auto no-scrollbar scroll-smooth">
            {['VALLADOLID', 'LEÓN', 'SALAMANCA', 'BURGOS', 'PALENCIA', 'ZAMORA', 'ÁVILA', 'SEGOVIA', 'SORIA'].map((city, i) => (
              <Link 
                href={`/map?province=${city}`} 
                key={city}
                className={`
                  shrink-0 px-8 py-10 md:px-12 md:py-16 border-r border-white/10 
                  text-xl md:text-3xl font-bold tracking-tight text-neutral-500 hover:text-white hover:bg-neutral-900 transition-colors
                  ${i === 0 ? 'text-white bg-white/5' : ''}
                `}
              >
                {city}
              </Link>
            ))}
             <div className="shrink-0 px-8 py-10 md:px-12 md:py-16 text-neutral-700 italic flex items-center">
                + MÁS ZONAS
             </div>
          </div>
        </section>

        {/* REVIEW CAROUSEL */}
        <ReviewsCarousel />

        {/* FOOTER / STATUS SECTION */}
        <Footer />

      </main>
    </div>
  );
}
