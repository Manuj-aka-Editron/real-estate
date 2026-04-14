'use client';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.lost-title span', 
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out', stagger: 0.1 }
      );
      
      gsap.fromTo('.lost-desc',
        { opacity: 0 },
        { opacity: 1, duration: 1, delay: 0.8 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-matte-black text-white flex flex-col items-center justify-center p-8 text-center">
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
         <div className="absolute top-[10%] left-[20%] text-[20vw] font-bold text-white/5 select-none">404</div>
         <div className="absolute bottom-[10%] right-[20%] text-[20vw] font-bold text-white/5 select-none">LOST</div>
      </div>

      <p className="text-[11px] font-medium tracking-[0.4em] uppercase text-white/40 mb-12 italic">Chapter 404 — The Void</p>
      
      <h1 className="lost-title text-[clamp(3.5rem,12vw,9rem)] font-bold tracking-[-.04em] leading-[0.9] mb-12 overflow-hidden flex flex-col items-center">
         <span className="block">Perspective</span>
         <span className="block italic font-serif font-light">Lost.</span>
      </h1>

      <div className="lost-desc max-w-sm">
        <p className="text-white/60 text-lg font-light leading-relaxed mb-12">
          The alignment you are seeking has shifted. The narrative for this specific path does not exist.
        </p>
        
        <Link 
          href="/" 
          className="inline-flex items-center gap-3 bg-white text-black px-12 py-5 text-[13px] font-bold uppercase tracking-widest hover:bg-white/80 transition-all cursor-none-trigger"
        >
          <ArrowLeft size={16} /> Return to Home
        </Link>
      </div>

      <div className="mt-24 w-[1px] h-32 bg-gradient-to-b from-white/20 to-transparent" />
    </div>
  );
}
