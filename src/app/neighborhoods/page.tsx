'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { MoveRight } from 'lucide-react';
import neighborhoods from '@/data/neighborhoods.json';

export default function NeighborhoodsHub() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hub-title .line',
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out', stagger: 0.15 }
      );

      gsap.fromTo('.neighborhood-card',
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 1, stagger: 0.1, ease: 'power3.out', delay: 0.5 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-background text-foreground min-h-screen pt-48 pb-64 overflow-x-hidden">
      <section className="max-w-[1400px] mx-auto px-8 lg:px-12 mb-32">
        <div className="max-w-4xl">
          <p className="text-[11px] font-medium tracking-[0.25em] uppercase text-mid-grey mb-8 italic">Chapter 02 — The Landscape</p>
          <h1 className="hub-title overflow-hidden">
            {['Explore the', 'Neighborhood Narrative.'].map((line, i) => (
              <div key={i} className="overflow-hidden">
                <span className="line block text-[clamp(2.5rem,7vw,6.5rem)] font-bold tracking-[-0.04em] leading-[1.0]">
                  {line}
                </span>
              </div>
            ))}
          </h1>
          <p className="mt-12 text-mid-grey text-lg font-light max-w-2xl leading-relaxed">
            Every district in New York has a distinct frequency. We've curated the essential narratives to help you find the one that resonates with your journey.
          </p>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-8 lg:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8">
        {neighborhoods.map((n, i) => (
          <Link 
            key={n.id} 
            href={`/neighborhoods/${n.slug}`}
            className="neighborhood-card group flex flex-col cursor-none-trigger"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-cool-grey mb-8">
              <div 
                className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                style={{ backgroundImage: `url('${n.image}')` }}
              />
              <div className="absolute inset-0 bg-matte-black/10 group-hover:bg-transparent transition-colors duration-500" />
              <div className="absolute top-8 left-8">
                <span className="text-[10px] uppercase tracking-[0.3em] text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity">Discover Guide</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold tracking-tight">{n.name}</h3>
                <MoveRight size={20} className="-translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500" />
              </div>
              <p className="text-sm font-light text-mid-grey line-clamp-2 leading-relaxed">
                {n.tagline}
              </p>
            </div>
          </Link>
        ))}
      </section>

      {/* FINAL CALL */}
      <section className="mt-64 border-t border-border-grey pt-32 text-center max-w-2xl mx-auto px-8">
          <p className="text-[11px] font-medium tracking-[0.25em] uppercase text-mid-grey mb-8">The Collection</p>
          <h2 className="text-3xl font-bold tracking-tight mb-12">Prefer to browse by property?</h2>
          <Link href="/properties" className="inline-flex items-center gap-4 text-foreground group text-sm font-bold uppercase tracking-widest">
            <span>View All Listings</span>
            <div className="w-8 h-[1px] bg-foreground group-hover:w-16 transition-all duration-500" />
          </Link>
      </section>
    </div>
  );
}
