"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftTextRef = useRef<HTMLSpanElement>(null);
  const rightTextRef = useRef<HTMLSpanElement>(null);
  const zoomContainerRef = useRef<HTMLDivElement>(null);
  const mockUIRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useGSAP(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => {
        setIsVisible(false);
        // Persist preloader completion for internal navigation
        sessionStorage.setItem('preloaderDone', 'true');
        // Dispatch event for components that are already mounted to synchronize
        window.dispatchEvent(new CustomEvent('preloaderComplete'));
        document.body.style.overflow = "auto";
      },
    });

    // Initial state
    gsap.set([leftTextRef.current, rightTextRef.current], { 
      y: 40, 
      opacity: 0,
      force3D: true
    });
    
    gsap.set(zoomContainerRef.current, { 
      scale: 0.15, 
      opacity: 0,
      display: "none",
      transformOrigin: "center center",
      force3D: true
    });

    gsap.set(mockUIRef.current, { opacity: 0, y: 20 });

    document.body.style.overflow = "hidden";

    // Snappy Timeline
    tl.to([leftTextRef.current, rightTextRef.current], {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: "power3.out",
      stagger: 0.1,
    })
    .to({}, { duration: 0.3 }) // Short focus pause
    .to(leftTextRef.current, {
      x: "-120%", // Split left
      duration: 0.8,
      ease: "expo.inOut",
      force3D: true,
    }, "split")
    .to(rightTextRef.current, {
      x: "120%", // Split right
      duration: 0.8,
      ease: "expo.inOut",
      force3D: true,
    }, "split")
    .set(zoomContainerRef.current, {
      display: "block"
    }, "split+=0.05")
    .to(zoomContainerRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.8,
      ease: "expo.inOut",
      force3D: true,
    }, "split")
    .to(mockUIRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out",
      force3D: true,
    }, "split+=0.4")
    .to(zoomContainerRef.current, {
      scale: 1.5, // Reduced peak scale for performance
      opacity: 0, // Fade out while zooming
      duration: 1.0,
      ease: "power2.in",
      force3D: true,
    }, "expand")
    .to(containerRef.current, {
      opacity: 0,
      duration: 0.6,
      ease: "power2.inOut",
    }, "expand+=0.2")
    .set(containerRef.current, { display: "none" });

  }, { scope: containerRef });

  if (!isVisible) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-white flex items-center justify-center overflow-hidden pointer-events-none"
    >
      <div className="relative flex items-center justify-center w-full h-full">
        {/* Left Text */}
        <span 
          ref={leftTextRef}
          className="font-serif text-5xl md:text-9xl text-matte-black tracking-tighter whitespace-nowrap z-10 select-none will-change-transform"
        >
          Aurelia
        </span>

        {/* Literal Homepage Zoom Container */}
        <div 
          ref={zoomContainerRef}
          className="absolute inset-0 m-auto w-[400px] h-[300px] md:w-[600px] md:h-[450px] overflow-hidden border border-border-grey bg-white shadow-2xl z-0 rounded-lg will-change-transform"
        >
          {/* Background Building Render (matching the site) */}
          <div className="absolute inset-0 opacity-40">
            <Image
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop"
              alt="Homepage Context"
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* Literal Site UI Mockup */}
          <div ref={mockUIRef} className="relative w-full h-full p-8 md:p-12 flex flex-col pointer-events-none">
            {/* Logo */}
            <div className="text-xl font-bold tracking-tighter flex items-baseline gap-0 mb-16">
              <span className="bg-matte-black text-white pl-2 pr-1 py-0.5">A</span>
              <span className="tracking-[0.1em]">URELIA</span>
              <span className="font-light italic text-mid-grey">.</span>
            </div>

            {/* Hero Quote */}
            <div className="space-y-1 mb-8">
              <p className="text-[6px] tracking-[0.2em] uppercase text-mid-grey mb-2">AURELIA ESTATES EDITORIAL</p>
              <h1 className="text-4xl md:text-5xl font-bold leading-[0.95] tracking-tighter">
                Find what<br />moves you.<br />next.
              </h1>
            </div>

            {/* Buttons */}
            <div className="flex gap-2">
              <div className="bg-matte-black text-white px-6 py-3 text-[8px] font-bold uppercase tracking-widest">
                Explore Portfolio
              </div>
              <div className="border border-matte-black text-matte-black px-6 py-3 text-[8px] font-bold uppercase tracking-widest">
                Connect With Us
              </div>
            </div>
          </div>
        </div>

        {/* Right Text */}
        <span 
          ref={rightTextRef}
          className="font-serif text-5xl md:text-9xl text-matte-black tracking-tighter whitespace-nowrap z-10 select-none"
        >
          Estates
        </span>
      </div>
    </div>
  );
}
