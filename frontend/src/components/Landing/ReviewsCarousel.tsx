'use client';

import { useMemo } from 'react';
import useSWR from 'swr';
import ReviewCard from './ReviewCard';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ReviewsCarousel() {
  const { data, error } = useSWR('/api/reviews/random', fetcher);
  /* eslint-disable react-hooks/exhaustive-deps */
  const reviews = useMemo(() => {
    if (data && data.status === 'success') {
      const originalReviews = data.reviews;
      if (originalReviews.length > 0) {
        let filledParams = [...originalReviews];
        while (filledParams.length < 10) {
            filledParams = [...filledParams, ...originalReviews];
        }
        return [...filledParams, ...filledParams];
      }
    }
    return [];
  }, [data]);
  if (!data || !reviews.length) {
    console.log("DEBUG: ReviewsCarousel no data or loading");
    return null; // Show nothing while loading
  }

  return (
    <div className="w-full overflow-hidden bg-black/50 border-b border-white/10 py-12 md:py-20 relative group">
        
      {/* Header */}
      <div className="px-6 md:px-12 mb-8 md:mb-12 flex items-end justify-between">
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2 uppercase tracking-tight">
                Lo que dice la <span className="text-orange-500">Comunidad</span>
            </h3>
            <p className="text-neutral-500 text-sm font-light max-w-md">
                Reseñas reales de exploradores como tú. Descubre spots recomendados sin filtros.
            </p>
          </div>
          <div className="hidden md:block text-orange-500/50 font-mono text-xs animate-pulse">
              {'///'} LIVE_FEED
          </div>
      </div>

      {/* Carousel Track */}
      <div className="relative w-full flex overflow-hidden mask-linear-fade">
        {/* CSS Animation Wrapper */}
        <div className="flex gap-6 animate-scroll px-6">
          {reviews.map((review: any, i: number) => (
            <ReviewCard key={`${review.id}-${i}`} review={review} />
          ))}
        </div>
        
        {/* Duplicate for seamless effect - Only needed if using CSS only loop manually, but better to just duplicate content in list */}
      </div>

       {/* Styles for animation */}
       <style jsx global>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); } 
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
          width: max-content; /* Ensure it doesn't wrap */
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
        .mask-linear-fade {
            mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
            -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
      `}</style>
    </div>
  );
}
