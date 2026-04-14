'use client';
import { ReactLenis } from 'lenis/react';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Synchronize Lenis with GSAP ScrollTrigger
    const update = (time: number) => {
      ScrollTrigger.update();
    };
    
    gsap.ticker.add(update);

    // Initial refresh to ensure ScrollTrigger measurements are correct
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <ReactLenis 
      root 
      options={{ 
        lerp: 0.1, 
        duration: 1.5, 
        smoothWheel: true,
        wheelMultiplier: 1.1,
        touchMultiplier: 2
      }}
    >
      {children}
    </ReactLenis>
  );
}
