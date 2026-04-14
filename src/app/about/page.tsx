'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MoveRight, Quote } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from 'next-themes';

gsap.registerPlugin(ScrollTrigger);

const teamArr = [
  {
    name: 'Michael Chen',
    title: 'Senior Sales Agent',
    area: 'Manhattan',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&auto=format&fit=crop&q=80',
    bio: 'Specializing in high-yield luxury developments across the downtown gallery district.'
  },
  {
    name: 'Shirin Moradi',
    title: 'Residential Specialist',
    area: 'Brooklyn & Queens',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=500&auto=format&fit=crop&q=80',
    bio: 'Dedicated to finding iconic architectural gems in historic neighborhoods.'
  },
  {
    name: 'James Carter',
    title: 'Luxury Property Advisor',
    area: 'Upper East Side',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&auto=format&fit=crop&q=80',
    bio: 'A bridge between traditional legacy estates and global investment strategies.'
  },
];

const statsArr = [
  { num: 500, label: 'Curation Units', suffix: '+' },
  { num: 2.4, label: 'Capital Curation', prefix: '$', suffix: 'B' },
  { num: 98, label: 'Client Retention', suffix: '%' },
  { num: 15, label: 'Market Tenure', suffix: 'Yrs' },
];

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cinematic Header Reveal
      gsap.fromTo('.editorial-title .word', 
        { y: '100%', opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1.5, ease: 'expo.out', stagger: 0.1 }
      );

      // Parallax for main image
      gsap.to('.hero-parallax', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-parallax-trigger',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });

      // Section reveal triggers
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 60 },
          {
            opacity: 1, 
            y: 0, 
            duration: 1.2, 
            ease: 'power3.out',
            scrollTrigger: { 
              trigger: el, 
              start: 'top 85%', 
              toggleActions: 'play none none none' 
            },
          }
        );
      });

      // Stats counters with horizontal line growth
      gsap.utils.toArray<HTMLElement>('.stat-item').forEach((el, i) => {
        const line = el.querySelector('.stat-line');
        const num = el.querySelector('.stat-num');
        const target = parseFloat(num?.getAttribute('data-target') || '0');
        
        const tl = gsap.timeline({
          scrollTrigger: { trigger: el, start: 'top 90%' }
        });

        tl.fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 1.5, ease: 'power4.out' })
          .fromTo(num, { innerText: 0 }, {
            innerText: target,
            duration: 2,
            snap: { innerText: 0.1 },
            ease: 'power2.out'
          }, '<');
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-background text-foreground min-h-screen pt-32 pb-64 overflow-x-hidden transition-colors duration-500">
      
      {/* ══════════════════════════════════════════ EDITORIAL HEADER */}
      <section className="max-w-[1400px] mx-auto px-8 lg:px-12 mb-32 md:mb-52 hero-parallax-trigger">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
          <div className="md:col-span-8">
            <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-foreground/40 mb-10">THE PERSPECTIVE</p>
            <h1 className="editorial-title text-[clamp(2.5rem,8vw,8rem)] font-bold tracking-tight leading-[0.95] mb-12">
              <span className="inline-block overflow-hidden pb-2"><span className="word inline-block">The</span></span>{' '}
              <span className="inline-block overflow-hidden pb-2"><span className="word inline-block">process.</span></span><br />
              <span className="inline-block overflow-hidden pb-2"><span className="word inline-block font-serif italic font-light">The</span></span>{' '}
              <span className="inline-block overflow-hidden pb-2"><span className="word inline-block">Legacy.</span></span>
            </h1>
          </div>
          <div className="md:col-span-4 pb-4">
            <p className="text-xl font-light leading-relaxed text-foreground/60 max-w-sm">
              In a world of transactions, we specialize in transitions. Welcome to the editorial perspective on luxury living.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════ NARRATIVE IMAGE BLOCK */}
      <section className="relative h-[60vh] md:h-[90vh] overflow-hidden mb-52">
        <div className="hero-parallax absolute inset-0 -top-20 -bottom-20 grayscale transition-all duration-1000">
          <Image 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=2000&auto=format&fit=crop&q=80" 
            alt="Minimalist Architecture" 
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-background/10 backdrop-blur-[2px]" />
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="max-w-4xl text-center" data-reveal>
             <Quote className="mx-auto mb-10 w-16 h-16 opacity-10" />
             <h2 className="text-3xl md:text-5xl font-serif italic text-white mix-blend-difference leading-tight">
               "Real estate is the ultimate form of curated storytelling — a canvas where life and architecture intersect."
             </h2>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════ THE MANIFESTO */}
      <section className="max-w-[1400px] mx-auto px-8 lg:px-12 mb-52">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-20">
          <div className="md:col-span-4" data-reveal>
             <div className="sticky top-40">
                <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-foreground/40 mb-8 underline decoration-foreground/20 underline-offset-8">OUR MANIFESTO</p>
                <h3 className="text-4xl font-bold tracking-tight mb-8">Beyond the Square Footage.</h3>
                <p className="text-lg text-foreground/60 leading-relaxed font-light">
                  We believe that a home is not just an asset; it is a manifestation of your intent in the world.
                </p>
             </div>
          </div>
          <div className="md:col-span-7 md:col-start-6 space-y-16" data-reveal>
             <div className="space-y-6 text-xl text-foreground/80 leading-relaxed font-light">
                <p>
                  Aurelia Estates was founded to challenge the standardized approach of the brokerage industry. We viewed the market not through the lens of data alone, but through the lens of design, history, and narrative flow.
                </p>
                <p>
                  Our collectors are those who value the nuance of light, the integrity of materials, and the structural poetry of their surroundings. We don't just list properties; we represent architectural heritage.
                </p>
             </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 pt-12 border-t border-foreground/10">
                <div>
                   <h4 className="text-sm font-bold uppercase tracking-widest mb-4">The Selection</h4>
                   <p className="text-sm text-foreground/60 font-light leading-relaxed">Only house 1% of the available inventory, curated for those who demand architectural significance.</p>
                </div>
                <div>
                   <h4 className="text-sm font-bold uppercase tracking-widest mb-4">The Service</h4>
                   <p className="text-sm text-foreground/60 font-light leading-relaxed">Discreet, data-driven, and intensely personal property acquisitions across global capitals.</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════ INTELLIGENCE (STATS) */}
      <section className="bg-foreground text-background py-32 mb-52 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
          <p className="text-[10px] font-bold tracking-[0.4em] uppercase opacity-40 mb-20 text-center">INTELLIGENCE BY THE NUMBERS</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16">
            {statsArr.map((stat, i) => (
              <div key={i} className="stat-item flex flex-col gap-6">
                <div className="stat-line h-[1px] w-full bg-background/20 origin-left" />
                <div className="text-6xl md:text-7xl font-bold tracking-tighter">
                  {stat.prefix}<span className="stat-num" data-target={stat.num}>0</span>{stat.suffix}
                </div>
                <p className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-60">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════ THE COLLECTIVE (TEAM) */}
      <section className="max-w-[1400px] mx-auto px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-32 gap-12">
          <div data-reveal>
            <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-foreground/40 mb-6">THE CURATORS</p>
            <h2 className="text-[clamp(2.5rem,6vw,5.5rem)] font-bold tracking-tight leading-none mb-4">Meet the Collective.</h2>
          </div>
          <p className="max-w-sm text-foreground/50 text-base font-light leading-relaxed mb-4" data-reveal>
            A boutique assembly of industry leaders, architectural historians, and market strategists.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {teamArr.map((member, i) => (
            <div key={i} data-reveal className="group relative">
              <div className="relative aspect-[3/4.5] overflow-hidden bg-foreground/5 mb-8">
                <Image 
                  src={member.image} 
                  alt={member.name}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-background/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <div className="absolute bottom-0 left-0 w-full p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-700 bg-background/80 backdrop-blur-md">
                   <p className="text-xs font-light text-foreground/70 leading-snug">{member.bio}</p>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold tracking-tight">{member.name}</h3>
                  <span className="text-[9px] uppercase tracking-widest font-bold opacity-30">{member.area}</span>
                </div>
                <p className="text-sm font-light text-foreground/40 uppercase tracking-widest">{member.title}</p>
                <div className="flex items-center gap-3 pt-6 opacity-40 group-hover:opacity-100 group-hover:gap-6 transition-all duration-500">
                  <span className="text-[10px] uppercase tracking-widest font-bold">Inquiry Portfolio</span>
                  <MoveRight size={16} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════ FINAL INVITE */}
      <section className="max-w-[1400px] mx-auto px-8 lg:px-12 mt-64 text-center">
        <div data-reveal className="flex flex-col items-center py-40 border-t border-foreground/5">
          <p className="text-[10px] font-bold tracking-[0.5em] uppercase text-foreground/30 mb-12 italic">EST. 2009</p>
          <h2 className="text-[clamp(2.5rem,6vw,6rem)] font-bold tracking-tight mb-20 leading-[0.95] max-w-4xl mx-auto">
             For those ready to move<br /> 
             <span className="font-serif italic font-light">beyond the standard.</span>
          </h2>
          <Link href="/contact" className="group flex flex-col items-center gap-8 translate-y-0 hover:-translate-y-2 transition-transform duration-500">
            <span className="text-[14px] font-bold uppercase tracking-[0.4em] bg-foreground text-background px-16 py-8 hover:opacity-90 transition-all shadow-2xl">
              Initiate Consultation
            </span>
          </Link>
        </div>
      </section>

    </div>
  );
}
