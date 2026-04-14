'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, MapPin, Maximize2, Bed, Bath, Ruler, MoveRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const featuresMock: Record<string, { features: string[]; beds: number; baths: number }> = {
  'sky-tower': { features: ['Private Balcony', 'Wine Cellar', 'Smart Home', 'Concierge'], beds: 3, baths: 4 },
  'golden-palm': { features: ['Infinity Pool', 'Private Dock', 'Cinema Room', 'Spa'], beds: 5, baths: 6 },
  'urban-heights': { features: ['Smart Kitchen', 'Rooftop Lounge', 'EV Charging', 'Storage'], beds: 2, baths: 2 },
};

interface Property {
  id: string;
  name: string;
  location: string;
  size: string;
  price: string;
  description: string;
  image: string;
}

export default function PropertyClient({ id }: { id: string }) {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/api/properties')
      .then(res => res.json())
      .then(data => {
        const found = data.find((p: { id: string }) => p.id === id);
        setProperty(found || null);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (loading || !property) return;

    const ctx = gsap.context(() => {
      // Hero image parallax
      gsap.to('.detail-hero-img', {
        y: '20%',
        ease: 'none',
        scrollTrigger: {
          trigger: '.detail-hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });

      // Entrance animations
      const tl = gsap.timeline();
      tl.fromTo('.back-btn', { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.6 })
        .fromTo('.detail-title-area > *', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }, '-=0.3')
        .fromTo('.detail-sidebar', { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5');

      // Reveal sections on scroll
      gsap.utils.toArray<HTMLElement>('.reveal-section').forEach(section => {
        gsap.fromTo(section, 
          { opacity: 0, y: 40 },
          { 
            opacity: 1, y: 0, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: section, start: 'top 90%' }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [loading, property]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-[1px] bg-foreground animate-pulse" />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4 tracking-tight">Perspective Lost.</h1>
        <Link href="/properties" className="text-sm font-semibold uppercase tracking-widest border-b border-foreground pb-1 hover:opacity-50 transition-all">Back to Portfolio</Link>
      </div>
    );
  }

  const extras = featuresMock[property.id] || { features: ['Architecture Study', 'Natural Lighting', 'Terrace Access'], beds: 3, baths: 3 };

  return (
    <div ref={containerRef} className="bg-background text-foreground min-h-screen pb-32 transition-colors duration-500 overflow-x-hidden">
      
      {/* ══════════════════════════════════════════ CINEMATIC HERO */}
      <section className="detail-hero relative h-[90vh] overflow-hidden bg-matte-black">
        <div
          className="detail-hero-img absolute inset-0 bg-cover bg-center opacity-85 scale-110 grayscale-[0.2]"
          style={{ backgroundImage: `url('${property.image}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-background/80" />
        
        {/* Navigation / Back */}
        <div className="absolute top-28 left-8 lg:left-12 z-10">
          <Link
            href="/properties"
            className="back-btn inline-flex items-center gap-2 text-white text-[11px] font-bold uppercase tracking-[0.2em] group cursor-none-trigger"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Portfolio
          </Link>
        </div>

        {/* Hero Bottom Content */}
        <div className="absolute bottom-16 left-8 lg:left-12 right-8 lg:right-12 z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="detail-title-area max-w-4xl">
            <div className="flex items-center gap-2 text-white/60 text-[11px] font-medium tracking-[0.25em] uppercase mb-6">
              <MapPin size={12} strokeWidth={2.5} /> {property.location}
            </div>
            <h1 className="text-[clamp(3rem,8vw,6.5rem)] font-bold text-white leading-[0.9] tracking-[-0.04em] mb-4">
              {property.name}
            </h1>
            <p className="text-[clamp(1.5rem,3vw,2.5rem)] font-light text-white/90 tracking-tight italic font-serif">
              {property.price}
            </p>
          </div>
          <button className="flex items-center gap-3 bg-white text-black px-8 py-5 text-[13px] font-bold uppercase tracking-widest hover:bg-white/80 transition-colors group cursor-none-trigger">
            <Maximize2 size={16} />
            Virtual Experience
          </button>
        </div>
      </section>

      {/* ══════════════════════════════════════════ CONTENT GRID */}
      <section className="max-w-[1400px] mx-auto px-8 lg:px-12 pt-24 md:pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24">
          
          {/* Main Info (Col span 7) */}
          <div className="lg:col-span-7 space-y-32">
            
            {/* Perspective Identity Block */}
            <div className="reveal-section grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              <div className="md:col-span-4">
                <h2 className="text-[11px] font-medium tracking-[0.25em] uppercase text-mid-grey italic">Identity — 01</h2>
              </div>
              <div className="md:col-span-8">
                <p className="text-2xl md:text-3xl font-light text-foreground leading-[1.5] tracking-tight mb-8">
                  {property.description}
                </p>
                <div className="w-12 h-[1px] bg-foreground" />
              </div>
            </div>

            {/* Quick Stats Block (Blueprint Specs) */}
            <div className="reveal-section border-y border-border-grey py-24">
              <h2 className="text-[11px] font-medium tracking-[0.25em] uppercase text-mid-grey mb-16 italic">Blueprint — 02</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-16">
                 {[
                   { icon: <Bed />, label: 'Chambers', val: extras.beds },
                   { icon: <Bath />, label: 'Sanctuary', val: extras.baths },
                   { icon: <Ruler />, label: 'Dimension', val: property.size }
                 ].map((stat, i) => (
                   <div key={i} className="flex flex-col gap-6">
                      <div className="text-mid-grey/40">{stat.icon}</div>
                      <div className="text-4xl font-bold tracking-tighter">{stat.val}</div>
                      <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-mid-grey">{stat.label}</span>
                   </div>
                 ))}
              </div>
            </div>

            {/* Features Block */}
            <div className="reveal-section grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              <div className="md:col-span-4">
                <h2 className="text-[11px] font-medium tracking-[0.25em] uppercase text-mid-grey italic">Refinements — 03</h2>
              </div>
              <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-y-12 gap-x-12">
                {extras.features.map((f, i) => (
                   <div key={f} className="flex flex-col gap-4 group">
                    <span className="text-[10px] font-bold text-mid-grey/40">{i+1 < 10 ? `0${i+1}` : i+1}</span>
                    <h3 className="text-xl font-bold tracking-tight">{f}</h3>
                    <div className="h-[1px] w-6 bg-border-grey group-hover:w-full group-hover:bg-foreground transition-all duration-700" />
                  </div>
                ))}
              </div>
            </div>

            {/* Editorial Gallery Block */}
            <div className="reveal-section pt-12">
              <div className="flex flex-col gap-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="aspect-[4/5] bg-cool-grey overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000">
                    <img src="https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?w=800&auto=format&fit=crop" alt="Interior 1" className="w-full h-full object-cover" />
                  </div>
                  <div className="aspect-[4/5] bg-cool-grey overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 md:mt-24">
                    <img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&auto=format&fit=crop" alt="Interior 2" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="aspect-[16/9] bg-cool-grey overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000">
                  <img src="https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=1200&auto=format&fit=crop" alt="Wide Interior" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar CTA (Col span 5) */}
          <div className="lg:col-span-5 relative">
            <div className="detail-sidebar sticky top-32 border border-border-grey p-10 lg:p-14 bg-background transition-colors">
              <div className="mb-10">
                <p className="text-[11px] font-medium tracking-[0.25em] uppercase text-mid-grey mb-6 italic">Guidance</p>
                <h3 className="text-3xl font-bold tracking-[-0.03em] mb-4">Request a Viewing.</h3>
                <p className="text-[13px] text-mid-grey font-light leading-relaxed">
                  Our stewards provide personalized tours of this perspective. Shared expertise on architectural provenance and neighborhood narrative.
                </p>
              </div>

              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Inquiry sent.'); }}>
                <div className="space-y-4">
                  <div className="border-b border-border-grey focus-within:border-foreground transition-colors">
                    <input type="text" placeholder="Full Name" required className="w-full bg-transparent py-4 text-[13px] outline-none" />
                  </div>
                  <div className="border-b border-border-grey focus-within:border-foreground transition-colors">
                    <input type="email" placeholder="Email Address" required className="w-full bg-transparent py-4 text-[13px] outline-none" />
                  </div>
                  <div className="border-b border-border-grey focus-within:border-foreground transition-colors">
                    <textarea rows={2} placeholder="Perspective and interest..." className="w-full bg-transparent py-4 text-[13px] outline-none resize-none" />
                  </div>
                </div>
                
                <button type="submit" className="w-full bg-foreground text-background py-5 text-[13px] font-bold uppercase tracking-widest hover:opacity-80 transition-opacity group flex items-center justify-center gap-3 cursor-none-trigger">
                  Start Conversation <MoveRight size={16} />
                </button>
              </form>

              <div className="mt-12 pt-10 border-t border-border-grey flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-mid-grey mb-1">Stewardship</p>
                  <a href="tel:+12129949965" className="text-[15px] font-bold tracking-tight hover:opacity-50 transition-opacity">+1 212 994 9965</a>
                </div>
                <div className="w-10 h-10 rounded-full bg-cool-grey flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-foreground" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL EXIT */}
      <section className="mt-64 border-t border-border-grey py-32 text-center">
          <p className="text-[11px] font-medium tracking-[0.25em] uppercase text-mid-grey mb-8 italic">The Voyage</p>
          <Link href="/properties" className="group flex flex-col items-center">
            <h3 className="text-[clamp(1.5rem,4vw,3rem)] font-bold tracking-tight mb-8 group-hover:opacity-60 transition-opacity">Return to Collection.</h3>
            <div className="w-12 h-[1px] bg-foreground group-hover:w-24 transition-all duration-500" />
          </Link>
      </section>
    </div>
  );
}
