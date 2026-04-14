'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, MapPin } from 'lucide-react';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

interface Highlight {
  type: string;
  name: string;
  desc: string;
}

interface Neighborhood {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  image: string;
  mood: string;
  highlights: Highlight[];
}

export default function NeighborhoodClient({ neighborhood }: { neighborhood: Neighborhood }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax Header
      gsap.to('.hero-image', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });

      // Text reveals
      gsap.utils.toArray<HTMLElement>('[data-a]').forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%' }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [neighborhood]);

  return (
    <div ref={containerRef} className="bg-background text-foreground min-h-screen overflow-x-hidden">
      
      {/* CINEMATIC HERO */}
      <section className="hero-section relative h-[90vh] overflow-hidden">
         <div 
           className="hero-image absolute inset-0 bg-cover bg-center grayscale-[0.2]" 
           style={{ backgroundImage: `url('${neighborhood.image}')` }} 
         />
         <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-background" />
         
         <div className="relative h-full flex flex-col justify-end max-w-[1400px] mx-auto px-8 lg:px-12 pb-24">
            <Link href="/neighborhoods" className="inline-flex items-center gap-2 text-white/60 text-sm font-medium mb-12 hover:text-white transition-colors cursor-none-trigger">
               <ArrowLeft size={16} /> Back to Narrative
            </Link>
            <p className="text-[12px] uppercase tracking-[0.4em] text-white/50 mb-6 font-bold">{neighborhood.mood}</p>
            <h1 className="text-[clamp(3.5rem,10vw,8.5rem)] font-bold tracking-[-0.04em] text-white leading-[0.9]">
               {neighborhood.name}.
            </h1>
         </div>
      </section>

      {/* OVERVIEW */}
      <section className="max-w-[1400px] mx-auto px-8 lg:px-12 py-32 md:py-52">
         <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
            <div className="md:col-span-4" data-a>
               <h2 className="text-[11px] font-medium tracking-[0.25em] uppercase text-mid-grey mb-8">The Perspective</h2>
               <p className="text-2xl font-bold tracking-tight leading-snug">
                  {neighborhood.tagline}
               </p>
            </div>
            <div className="md:col-span-7 md:col-start-6" data-a>
               <p className="text-mid-grey text-xl font-light leading-[1.8] mb-12">
                  {neighborhood.description}
               </p>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 border-t border-border-grey pt-12">
                  <div>
                    <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-foreground mb-4">Frequency</h4>
                    <p className="text-sm font-light text-mid-grey">High concentration of boutiques and curated dining.</p>
                  </div>
                  <div>
                    <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-foreground mb-4">Architecture</h4>
                    <p className="text-sm font-light text-mid-grey">Cast-iron lofts and meticulously restored facades.</p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* HIGHLIGHTS (Bento) */}
      <section className="bg-cool-grey py-32 md:py-52">
         <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
            <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold tracking-[-0.03em] mb-20 text-center">Local Gems.</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {neighborhood.highlights.map((h, i) => (
                  <div key={i} data-a className="bg-background p-12 border border-border-grey flex flex-col gap-6 group hover:border-foreground transition-all duration-500">
                     <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-mid-grey italic">{h.type}</span>
                     <h3 className="text-2xl font-bold tracking-tight">{h.name}</h3>
                     <p className="text-mid-grey text-sm font-light leading-relaxed mb-6">{h.desc}</p>
                     <div className="mt-auto flex items-center gap-2 text-foreground font-bold text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                        <MapPin size={12} /> View on Map
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* LISTINGS INTEGRATION */}
      <section className="max-w-[1400px] mx-auto px-8 lg:px-12 py-32 md:py-52 overflow-hidden">
         <div className="flex items-baseline justify-between mb-20">
            <div>
               <p className="text-[11px] font-medium tracking-[0.25em] uppercase text-mid-grey mb-4 italic">The Living</p>
               <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.03em]">Live in {neighborhood.name}.</h2>
            </div>
            <Link href="/properties" className="hidden md:flex items-center gap-3 text-[13px] font-semibold tracking-wide group cursor-none-trigger">
               <span>Search all properties</span>
               <span className="w-8 h-[1px] bg-foreground group-hover:w-16 transition-all duration-500" />
            </Link>
         </div>

         <div className="flex gap-8 overflow-x-auto pb-12 snap-x hide-scrollbar">
            {[1, 2, 3].map((i) => (
               <div key={i} className="flex-shrink-0 w-[85vw] md:w-[450px] snap-center">
                  <div className="aspect-[4/3] bg-cool-grey mb-6 overflow-hidden relative group">
                     <Image 
                       src={`https://images.unsplash.com/photo-${1512917774080 + i}-9991f1c4c750?w=800&auto=format&fit=crop`} 
                       alt={`Property in ${neighborhood.name}`}
                       fill
                       className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105" 
                     />
                     <div className="absolute top-6 left-6 bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-black">New Arrival</div>
                  </div>
                  <h4 className="text-lg font-bold tracking-tight">The {neighborhood.name} Loft {i}</h4>
                  <p className="text-mid-grey text-sm font-light mt-1">$4,250,000</p>
               </div>
            ))}
         </div>
      </section>

      {/* NEXT STORY */}
      <section className="border-t border-border-grey py-32 text-center">
         <p className="text-[11px] font-medium tracking-[0.25em] uppercase text-mid-grey mb-8">Next Narrative</p>
         <Link href="/neighborhoods" className="group">
            <h3 className="text-[clamp(1.5rem,4vw,3rem)] font-bold tracking-tight mb-8 hover:opacity-50 transition-opacity">Return to Collection.</h3>
            <div className="mx-auto w-12 h-[1px] bg-foreground group-hover:w-24 transition-all duration-500" />
         </Link>
      </section>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
