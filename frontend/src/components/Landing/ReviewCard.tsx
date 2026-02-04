import { Star } from 'lucide-react';
import Link from 'next/link';

interface Review {
  id: number;
  rating: number;
  comment: string;
  user: {
    name: string;
    // Avatar might be null or URL
  };
  bar: {
    nombre: string;
  };
  bar_id: number;
}

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="w-[300px] md:w-[350px] shrink-0 p-6 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-orange-500/50 transition-colors group flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        {/* User Info */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-linear-to-br from-orange-400 to-red-600 flex items-center justify-center text-xs font-bold text-white uppercase">
            {review.user?.name?.substring(0, 2) || '??'}
          </div>
          <div>
            <p className="text-sm font-medium text-white leading-none">{review.user?.name || 'Usuario Anónimo'}</p>
            <p className="text-xs text-neutral-500 mt-1 truncate max-w-[120px]">
              en <span className="text-orange-400">{review.bar?.nombre || 'Bar desconocido'}</span>
            </p>
          </div>
        </div>
        
        {/* Rating */}
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              size={14} 
              className={`${i < review.rating ? 'fill-orange-500 text-orange-500' : 'fill-neutral-800 text-neutral-800'}`} 
            />
          ))}
        </div>
      </div>

      {/* Comment */}
      <p className="text-neutral-300 text-sm leading-relaxed italic line-clamp-3 mb-4">
        &quot;{review.comment}&quot;
      </p>

      {/* View Button */}
      <Link 
        href={`/map?barId=${review.bar_id}`}
        className="inline-flex items-center gap-2 text-xs font-bold text-orange-500 hover:text-orange-400 tracking-wider uppercase group/btn z-10 relative"
      >
        <span>Ver</span>
        <span className="group-hover/btn:translate-x-1 transition-transform">&rarr;</span>
      </Link>
      
      {/* Decorative Quote */}
      <div className="absolute top-4 right-4 text-6xl font-serif text-white/5 pointer-events-none group-hover:text-orange-500/10 transition-colors">
        &quot;
      </div>
    </div>
  );
}
