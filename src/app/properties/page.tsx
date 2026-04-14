'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { MoveRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

interface Property {
  id: string;
  name: string;
  location: string;
  size: string;
  price: string;
  image: string;
}

export default function PropertiesPage() {
  const [allProperties, setAllProperties] = useState<any[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeMood, setActiveMood] = useState('All Perspectives');
  const containerRef = useRef<HTMLDivElement>(null);

  const moods = ['All Perspectives', 'Minimalist', 'Industrial', 'Brutalist', 'Modernist', 'Old-World'];

  useEffect(() => {
    fetch('/api/properties')
      .then(res => res.json())
      .then(data => {
        setAllProperties(data);
        setFilteredProperties(data);
        setLoading(false);
      });
  }, []);

  // Filter Logic
  useEffect(() => {
    if (activeMood === 'All Perspectives') {
      setFilteredProperties(allProperties);
    } else {
      setFilteredProperties(allProperties.filter(p => p.aesthetic === activeMood));
    }
  }, [activeMood, allProperties]);

  useEffect(() => {
    if (loading) return;

    const ctx = gsap.context(() => {
      // Header entrance
      gsap.fromTo('.props-header > *',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
      );

      // Card reveals - animate on filter change
      gsap.fromTo('.property-card',
        { opacity: 0, y: 40, scale: 0.95 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 0.8, 
          stagger: 0.05, 
          ease: 'power4.out',
          overwrite: true
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [loading, filteredProperties]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-[1px] bg-border-grey relative overflow-hidden">
            <div className="absolute inset-0 bg-foreground animate-loading-bar" />
          </div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-mid-grey">Filtering Reality</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="bg-background min-h-screen pb-32 transition-colors duration-500">
      {/* ══════════════════════════════════════════ HEADER */}
      <section className="props-header pt-48 pb-16 max-w-[1400px] mx-auto px-8 lg:px-12">
        <div className="mb-24">
          <p className="text-[11px] font-medium tracking-[0.25em] uppercase text-mid-grey mb-8 italic">Chapter 01 — The Collection</p>
          <h1 className="text-[clamp(3.5rem,9vw,8rem)] font-bold tracking-[-0.04em] leading-[0.9] mb-12">
            Selection &<br />Perspective.
          </h1>
          
          {/* Aesthetic "Mood" Filter */}
          <div className="flex flex-wrap gap-x-12 gap-y-6 pt-12 border-t border-border-grey">
            {moods.map((mood) => (
              <button
                key={mood}
                onClick={() => setActiveMood(mood)}
                className={`text-[12px] font-bold uppercase tracking-[0.2em] transition-all duration-300 relative pb-2 cursor-none-trigger ${
                  activeMood === mood ? 'text-foreground' : 'text-mid-grey hover:text-foreground'
                }`}
              >
                {mood}
                {activeMood === mood && (
                  <motion.div 
                    layoutId="mood-underline" 
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-foreground" 
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-[20px] font-bold tracking-tight">{filteredProperties.length}</span>
          <span className="text-[11px] font-medium tracking-[0.1em] uppercase text-mid-grey">Curated Perspectives</span>
        </div>
      </section>

      {/* ══════════════════════════════════════════ GRID (Staggered Layout) */}
      <section className="props-grid max-w-[1400px] mx-auto px-8 lg:px-12 py-12">
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
            {filteredProperties.map((prop, i) => (
              <Link 
                href={`/properties/${prop.id}`} 
                key={prop.id} 
                className={`property-card group flex flex-col opacity-0 ${
                  i % 3 === 1 ? 'lg:mt-32' : i % 3 === 2 ? 'lg:mt-16' : ''
                }`}
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-cool-grey mb-8">
                  <div
                    className="absolute inset-0 bg-cover bg-center grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-expo"
                    style={{ backgroundImage: `url('${prop.image}')` }}
                  />
                  <div className="absolute top-6 left-6">
                    <span className="bg-background/90 backdrop-blur-sm text-foreground text-[10px] font-bold px-3 py-1.5 uppercase tracking-widest">Active</span>
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="flex items-baseline justify-between gap-4 mb-2">
                    <h3 className="text-xl font-bold tracking-tight text-foreground group-hover:opacity-50 transition-opacity">
                      {prop.name}
                    </h3>
                    <div className="w-8 h-[1px] bg-border-grey group-hover:w-12 transition-all duration-500" />
                  </div>
                  <p className="text-[13px] text-mid-grey font-light mb-6 tracking-wide">{prop.location}</p>
                  
                  <div className="flex items-center justify-between border-t border-cool-grey pt-6">
                    <span className="text-[15px] font-bold tracking-tight">{prop.price}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-mid-grey uppercase tracking-widest">{prop.size}</span>
                      <MoveRight size={14} className="text-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-32 text-center">
            <p className="text-mid-grey text-sm font-light">No properties found matching your criteria.</p>
            <button 
              onClick={() => setActiveMood('All Perspectives')}
              className="mt-6 text-[11px] font-bold uppercase tracking-widest border-b border-foreground pb-1 hover:opacity-50 transition-opacity"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* ══════════════════════════════════════════ CTA */}
        <div className="mt-48 pt-32 border-t border-border-grey text-center max-w-2xl mx-auto">
          <p className="text-[11px] font-medium tracking-[0.25em] uppercase text-mid-grey mb-8">Can't find it?</p>
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-[-0.03em] leading-tight mb-10">
            Let an expert search the<br />unlisted market for you.
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-foreground text-background px-10 py-5 text-[13px] font-semibold tracking-wide hover:opacity-80 transition-all duration-300"
          >
            Start a Conversation <MoveRight size={16} />
          </Link>
        </div>
      </section>

      <style jsx global>{`
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-loading-bar {
          animation: loading-bar 1.5s infinite linear;
        }
        .ease-expo {
          transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
        }
      `}</style>
    </div>
  );
}
