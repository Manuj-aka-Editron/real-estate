'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { MoveRight, ArrowLeft, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dynamic from 'next/dynamic';

gsap.registerPlugin(ScrollTrigger);

const HeroBuilding = dynamic(() => import('@/components/canvas/HeroBuilding'), { 
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-transparent" /> 
});

const testimonials = [
  {
    quote: "Working with this team changed how I think about home. They didn't just find me a property — they found exactly what I'd been looking for without knowing how to say it.",
    author: "Sarah G.",
    location: "Upper West Side, NY",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&auto=format&fit=crop&q=80",
  },
  {
    quote: "After 12 years in NYC, I've worked with many brokers. This was my best experience by far. Fast, intuitive, and deeply knowledgeable about every neighborhood.",
    author: "James T.",
    location: "Brooklyn Heights, NY",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&auto=format&fit=crop&q=80",
  },
  {
    quote: "She immediately understood what we were looking for and helped tailor our search perfectly. Proactive, responsive, and genuinely invested in our outcome.",
    author: "Priya M.",
    location: "Manhattan, NY",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&auto=format&fit=crop&q=80",
  },
  {
    quote: "I was skeptical of boutique agencies, but Aurelia exceeded every expectation. The process was seamless and honest from start to finish.",
    author: "Marcus W.",
    location: "Tribeca, NY",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&auto=format&fit=crop&q=80",
  },
];

const services = [
  { n: "01", title: "Mortgage Services", desc: "Helping you secure your dream home with flexible mortgage options tailored to your financial goals and timeline." },
  { n: "02", title: "Property Management", desc: "Let us handle the details so you can enjoy the full rewards of your real estate investment without the stress." },
  { n: "03", title: "Development", desc: "Expert guidance through the intricacies of building and developing properties from concept to completion." },
];

const blog = [
  { title: "5 Cozy Ways to Spend a Snow Day at Home", tag: "Lifestyle", date: "Jan 2026", img: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=900&h=600&auto=format&fit=crop&q=80", summary: "When the city slows down, lean in. Five cozy ways to make the most of a snow day in NYC." },
  { title: "January 2026 NYC Market Update", tag: "Market", date: "Jan 2026", img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&h=600&auto=format&fit=crop&q=80", summary: "Inventory is up across NYC to start 2026. See how Manhattan, Brooklyn, and Queens are trending." },
  { title: "Why January Is a Smart Time to Buy", tag: "Insight", date: "Dec 2025", img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=900&h=600&auto=format&fit=crop&q=80", summary: "Forget the spring rush. December clears the field and strategic buyers know it." },
];

const propertiesArr = [
  { id: 'sky-tower', name: 'Sky Tower Residences', location: 'Downtown Core', price: '$4,200,000', img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=900&auto=format&fit=crop&q=80' },
  { id: 'golden-palm', name: 'Golden Palm Villas', location: 'Coastal Avenue', price: '$8,500,000', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&auto=format&fit=crop&q=80' },
  { id: 'urban-heights', name: 'Urban Heights', location: 'Midtown District', price: '$2,900,000', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&auto=format&fit=crop&q=80' },
];

export default function Home() {
  const [tIndex, setTIndex] = useState(0);
  const mainRef = useRef<HTMLDivElement>(null);

  // Hero entrance animation
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 }); // Stagger start after 3D builds a bit
    tl.fromTo('.hero-eyebrow', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' })
      .fromTo('.hero-h1 .line', { opacity: 0, y: 60, skewY: 2 }, { opacity: 1, y: 0, skewY: 0, duration: 0.9, ease: 'power4.out', stagger: 0.12 }, '-=0.3')
      .fromTo('.hero-cta', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.1 }, '-=0.4')
      .fromTo('.hero-scroll', { opacity: 0 }, { opacity: 1, duration: 0.5 }, '-=0.2');

    return () => { tl.kill(); };
  }, []);

  // Scroll-triggered reveals
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered reveal for all [data-a] elements
      gsap.utils.toArray<HTMLElement>('[data-a]').forEach((el) => {
        const delay = parseFloat(el.dataset.delay || '0');
        gsap.fromTo(el,
          { opacity: 0, y: 50 },
          {
            opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay,
            scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
          }
        );
      });

      // Horizontal slide for [data-ax] elements
      gsap.utils.toArray<HTMLElement>('[data-ax]').forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, x: -40 },
          {
            opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
          }
        );
      });

      // Scale reveal for images [data-img]
      gsap.utils.toArray<HTMLElement>('[data-img]').forEach((el) => {
        gsap.fromTo(el,
          { scale: 1.08, opacity: 0 },
          {
            scale: 1, opacity: 1, duration: 1.2, ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
          }
        );
      });

      // Line expander on service items
      gsap.utils.toArray<HTMLElement>('.service-line').forEach((el) => {
        gsap.fromTo(el,
          { scaleX: 0 },
          {
            scaleX: 1, duration: 0.8, ease: 'power2.out', transformOrigin: 'left',
            scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
          }
        );
      });

      // Horizontal Voyage Scroll
      const mm = gsap.matchMedia();
      
      mm.add("(min-width: 1024px)", () => {
        const wrapper = mainRef.current?.querySelector<HTMLElement>('.voyage-wrapper');
        const section = mainRef.current?.querySelector<HTMLElement>('.voyage-section');
        
        if (wrapper && section) {
          gsap.to(wrapper, {
            x: () => -(wrapper.scrollWidth - window.innerWidth),
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${wrapper.scrollWidth}`,
              scrub: 1,
              pin: true,
              pinSpacing: true,
              invalidateOnRefresh: true,
              anticipatePin: 1,
            }
          });
        }
      });

      // Horizontal Testimonials Scroll
      mm.add("(min-width: 320px)", () => {
        const wrapper = mainRef.current?.querySelector<HTMLElement>('.testimonials-wrapper');
        const section = mainRef.current?.querySelector<HTMLElement>('.testimonials-sticky-section');
        const progressBar = mainRef.current?.querySelector<HTMLElement>('.t-progress-bar');
        const counter = mainRef.current?.querySelector<HTMLElement>('.t-counter');

        if (wrapper && section) {
          const scrollWidth = wrapper.scrollWidth - window.innerWidth;
          
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${wrapper.scrollWidth * (window.innerWidth < 768 ? 1.5 : 1)}`,
              scrub: 1,
              pin: true,
              pinSpacing: true,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                // Update progress bar
                if (progressBar) gsap.set(progressBar, { scaleX: self.progress });
                // Update counter
                if (counter) {
                  const currentIdx = Math.min(
                    testimonials.length,
                    Math.ceil(self.progress * testimonials.length) || 1
                  );
                  counter.textContent = `0${currentIdx} / 0${testimonials.length}`;
                }
              }
            }
          });

          tl.to(wrapper, {
            x: -scrollWidth,
            ease: "none"
          });

          // Handle manual buttons
          const prevBtn = section.querySelector('.t-prev');
          const nextBtn = section.querySelector('.t-next');

          const scrollDistance = wrapper.scrollWidth;
          const snapPoints = testimonials.map((_, i) => i / (testimonials.length - 1));

          if (prevBtn && nextBtn) {
            nextBtn.addEventListener('click', () => {
              const st = tl.scrollTrigger;
              if (st) {
                const currentProgress = st.progress;
                const nextSnap = snapPoints.find(p => p > currentProgress + 0.05) || 1;
                gsap.to(window, {
                  scrollTo: st.start + (nextSnap * (st.end - st.start)),
                  duration: 1,
                  ease: "power2.inOut"
                });
              }
            });

            prevBtn.addEventListener('click', () => {
              const st = tl.scrollTrigger;
              if (st) {
                const currentProgress = st.progress;
                const prevSnap = [...snapPoints].reverse().find(p => p < currentProgress - 0.05) || 0;
                gsap.to(window, {
                  scrollTo: st.start + (prevSnap * (st.end - st.start)),
                  duration: 1,
                  ease: "power2.inOut"
                });
              }
            });
          }
        }
      });

      // Marquee parallax speed boost
      ScrollTrigger.create({
        trigger: '.marquee-wrap',
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const marquee = document.querySelector<HTMLElement>('.marquee-inner');
          if (marquee) {
            const speed = 30 - self.getVelocity() * 0.005;
            marquee.style.animationDuration = `${Math.max(10, speed)}s`;
          }
        },
      });

      // Final refresh to ensure everything is measured correctly
      ScrollTrigger.refresh();

    }, mainRef);

    return () => ctx.revert();
  }, []);

  // Testimonial auto-advance
  useEffect(() => {
    const t = setInterval(() => setTIndex(i => (i + 1) % testimonials.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <div ref={mainRef} className="bg-white text-[#0C0C0C] overflow-x-hidden">

      {/* ══════════════════════════════════════════ HERO */}
      <section className="relative w-full h-screen flex flex-col overflow-hidden bg-white" id="hero">
        {/* 3D Builder Canvas */}
        <div className="absolute inset-0 z-0">
          <HeroBuilding />
        </div>

        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/40 pointer-events-none" />

        <div className="relative z-10 flex-grow flex flex-col justify-end max-w-[1400px] mx-auto px-8 lg:px-12 pb-20 md:pb-40 w-full">
          <div className="max-w-4xl mt-12 md:mt-20">
            <p className="hero-eyebrow text-[#0C0C0C]/40 text-[10px] font-bold tracking-[0.5em] uppercase mb-8">
              AURELIA ESTATES • THE EDITORIAL PERSPECTIVE
            </p>
            <h1 className="hero-h1 mb-12">
              {['Find what', 'moves you.', 'next.'].map((line, i) => (
                <div key={i} className="overflow-hidden">
                  <span className="line block text-[clamp(3rem,9vw,9rem)] font-bold text-[#0C0C0C] leading-[0.92] tracking-[-0.04em]">
                    {line}
                  </span>
                </div>
              ))}
            </h1>
            <div className="flex flex-wrap gap-8 items-center">
              <Link
                href="/properties"
                className="hero-cta bg-[#0C0C0C] text-white px-14 py-7 text-[13px] font-bold tracking-[0.3em] uppercase hover:bg-[#333] transition-all duration-300 shadow-2xl"
              >
                Curated Collection
              </Link>
              <Link
                href="/about"
                className="hero-cta border-b border-[#0C0C0C]/40 text-[#0C0C0C] pb-2 text-[13px] font-bold tracking-[0.2em] uppercase hover:border-[#0C0C0C] transition-all duration-300"
              >
                The Manifesto
              </Link>
            </div>
          </div>
        </div>

        <div className="hero-scroll relative z-10 flex items-center gap-4 max-w-[1400px] mx-auto px-8 lg:px-12 pb-12 w-full text-[#0C0C0C]/30 italic">
          <div className="w-12 h-[1px] bg-[#0C0C0C]/10" />
          <span className="text-[10px] tracking-[0.3em] uppercase not-italic font-bold">Scroll to Explore</span>
        </div>
      </section>

      {/* ══════════════════════════════════════════ MARQUEE */}
      <div className="marquee-wrap border-y border-[#E8E8E8] py-4 overflow-hidden">
        <div className="marquee-inner flex whitespace-nowrap" style={{ animation: 'marquee 30s linear infinite' }}>
          {Array(8).fill(null).map((_, i) => (
            <span key={i} className="flex items-center text-[11px] font-medium tracking-[0.2em] uppercase text-[#888] pr-12">
              Purchase&nbsp;&nbsp;•&nbsp;&nbsp;Rent&nbsp;&nbsp;•&nbsp;&nbsp;Sell&nbsp;&nbsp;•&nbsp;&nbsp;Commercial&nbsp;&nbsp;•&nbsp;&nbsp;Residential&nbsp;&nbsp;•&nbsp;&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════ PHILOSOPHY */}
      <section className="max-w-[1400px] mx-auto px-8 lg:px-12 py-32 md:py-52">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start">
          <div className="md:col-span-5">
            <p data-a data-delay="0" className="text-[11px] font-medium tracking-[0.25em] uppercase text-mid-grey mb-8">Our Philosophy</p>
            <h2 data-a data-delay="0.1" className="text-[clamp(2rem,5vw,3.75rem)] font-bold tracking-[-0.03em] leading-[1.05]">
              This isn&apos;t just<br />about real estate.
            </h2>
          </div>
          <div className="md:col-span-6 md:col-start-7 md:pt-20">
            <p data-a data-delay="0" className="text-mid-grey text-lg font-light leading-[1.7] mb-6">
              It&apos;s about identity. Progress. Getting unstuck. You&apos;re not just looking for a place — you&apos;re looking for alignment. That&apos;s what we help you find.
            </p>
            <p data-a data-delay="0.1" className="text-mid-grey text-lg font-light leading-[1.7] mb-10">
              Our agents are deeply embedded in the communities they serve, bringing local knowledge and genuine human connection to every transaction.
            </p>
            <Link data-a data-delay="0.15" href="/about" className="inline-flex items-center gap-3 text-[13px] font-semibold tracking-wide group cursor-none-trigger">
              <span>Meet our agents</span>
              <span className="w-8 h-[1px] bg-foreground group-hover:w-16 transition-all duration-500" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════ NEIGHBORHOOD VOYAGE (Horizontal) */}
      <section className="voyage-section relative bg-matte-black overflow-hidden lg:min-h-screen flex flex-col justify-center">
        <div className="voyage-sticky flex flex-col justify-center overflow-hidden py-24 lg:py-0 w-full">
          <div className="voyage-wrapper flex gap-8 lg:gap-24 px-8 lg:px-[15vw] items-center lg:flex-nowrap flex-wrap h-full">
            {/* Section Title as first card/segment */}
            <div className="flex-shrink-0 w-full lg:w-[45vw] mb-12 lg:mb-0">
              <p className="text-[11px] font-medium tracking-[0.25em] uppercase text-white/40 mb-4 italic">02 — The Habitat</p>
              <h2 className="text-[clamp(2.5rem,7vw,5.5rem)] font-bold tracking-[-0.03em] text-white leading-[0.9] max-w-xl">
                The Neighborhood Voyage.
              </h2>
            </div>

            {[
              { name: 'Tribeca', mood: 'Quiet Luxury', img: 'https://images.unsplash.com/photo-1543269664-76bc3997d9ea?w=1200&h=1600&auto=format&fit=crop', desc: 'Cobblestones and cast-iron history.' },
              { name: 'SOHO', mood: 'Artist Legacy', img: 'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=1200&h=1600&auto=format&fit=crop', desc: 'The heart of global fashion and steel.' },
              { name: 'DUMBO', mood: 'Waterfront', img: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1200&h=1600&auto=format&fit=crop', desc: 'Framing bridges and factory lofts.' },
              { name: 'Brooklyn', mood: 'Creative Soul', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=1600&auto=format&fit=crop', desc: 'Brownstones meeting boutique living.' }
            ].map((n, i) => (
              <div key={i} className="voyage-card group flex-shrink-0 w-full lg:w-[35vw] aspect-[3/4] lg:aspect-[4/5] relative overflow-hidden bg-[#222]">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105 opacity-60" style={{ backgroundImage: `url('${n.img}')` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />
                
                <div className="absolute top-0 left-0 right-0 p-8 lg:p-12 bg-black/40 backdrop-blur-md border-b border-white/10 group-hover:bg-black/60 transition-all duration-500">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-white/50 font-bold mb-3 block">{n.mood}</span>
                  <h3 className="text-4xl lg:text-5xl font-bold text-white tracking-tighter mb-2">{n.name}</h3>
                </div>
                
                <div className="absolute bottom-12 left-12 right-12">
                  <p className="text-white/60 font-light text-sm max-w-[240px] opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    {n.desc}
                  </p>
                </div>
                
                <Link href={`/neighborhoods/${n.name.toLowerCase()}`} className="absolute inset-0 z-10 cursor-none-trigger" />
              </div>
            ))}

            <div className="flex-shrink-0 w-full lg:w-[40vw] flex flex-col items-center justify-center text-center p-12">
               <h3 className="text-white text-3xl font-bold mb-8">Ready for the Narrative?</h3>
               <Link href="/neighborhoods" className="text-white border border-white/20 px-12 py-6 text-[12px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                  Browse All Guides
               </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════ PROPERTIES */}
      <section className="border-t border-[#E8E8E8] py-24 md:py-36">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
          <div className="flex items-baseline justify-between mb-16">
            <div>
              <p data-a className="text-[11px] font-medium tracking-[0.25em] uppercase text-[#888] mb-4">Portfolio</p>
              <h2 data-a data-delay="0.08" className="text-[clamp(1.75rem,3.5vw,3rem)] font-bold tracking-[-0.03em]">Featured Properties</h2>
            </div>
            <Link href="/properties" data-a className="hidden md:flex items-center gap-3 text-[13px] font-semibold tracking-wide group">
              <span>View all</span>
              <span className="w-6 h-[1px] bg-[#0C0C0C] group-hover:w-12 transition-all duration-500" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Big card */}
            <Link href={`/properties/${propertiesArr[0].id}`} data-img className="md:col-span-7 group relative aspect-[4/3] overflow-hidden bg-[#F5F5F5] block cursor-pointer opacity-0">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url('${propertiesArr[0].img}')` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 transition-transform duration-300 group-hover:-translate-y-1">
                <p className="text-white/60 text-[11px] tracking-[0.2em] uppercase mb-2">{propertiesArr[0].location}</p>
                <h3 className="text-white text-2xl font-bold tracking-tight mb-1">{propertiesArr[0].name}</h3>
                <p className="text-white/80 text-sm font-medium">{propertiesArr[0].price}</p>
              </div>
            </Link>
            {/* Stacked 2 */}
            <div className="md:col-span-5 flex flex-col gap-4">
              {propertiesArr.slice(1).map((p, i) => (
                <Link key={p.id} href={`/properties/${p.id}`} data-img className="group relative flex-1 min-h-[200px] overflow-hidden bg-[#F5F5F5] block cursor-pointer opacity-0" style={{ transitionDelay: `${i * 0.1}s` }}>
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url('${p.img}')` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6 transition-transform duration-300 group-hover:-translate-y-1">
                    <p className="text-white/60 text-[10px] tracking-[0.2em] uppercase mb-1">{p.location}</p>
                    <h3 className="text-white text-lg font-bold tracking-tight">{p.name}</h3>
                    <p className="text-white/70 text-xs font-medium mt-0.5">{p.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════ REWIRED STATEMENT */}
      <section className="border-t border-foreground/5 py-32 md:py-64 overflow-hidden relative" id="movement">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-16 md:gap-32">
            
            {/* Image Column */}
            <div className="md:col-span-6 relative" data-a data-delay="0.1">
              <div className="relative aspect-[4/5] md:aspect-[3/4] overflow-hidden grayscale hover:grayscale-0 transition-all duration-[2s] group">
                <Image 
                  src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1200&auto=format&fit=crop&q=80" 
                  alt="Atmospheric Architecture" 
                  fill
                  className="object-cover scale-110 group-hover:scale-100 transition-transform duration-[3s] ease-out"
                />
                <div className="absolute inset-0 bg-matte-black/10 mix-blend-overlay" />
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 border border-foreground/10 pointer-events-none hidden md:block" />
            </div>

            {/* Text Column */}
            <div className="md:col-span-6 flex flex-col justify-center">
              <p data-a className="text-[10px] font-bold tracking-[0.4em] uppercase text-foreground/40 mb-10">THE MOVEMENT</p>
              <h2 className="text-[clamp(3rem,8vw,7.5rem)] font-bold tracking-[-0.04em] leading-[0.9] mb-12">
                Real Estate,<br />
                <span className="font-serif italic font-light opacity-60">Rewired.</span>
              </h2>
              <div className="max-w-md space-y-10">
                <p data-a data-delay="0.2" className="text-foreground/70 text-xl font-light leading-relaxed">
                  We believe the best real estate experience feels less like a transaction and more like a conversation. We are orchestrating a shift in perspective.
                </p>
                <Link data-a data-delay="0.3" href="/contact" className="inline-flex items-center gap-6 text-[14px] font-bold tracking-[0.3em] uppercase group border-b border-foreground/20 pb-4 scale-100 hover:scale-105 transition-all duration-300">
                  <span>Sign the Manifesto</span>
                  <MoveRight size={20} className="group-hover:translate-x-4 transition-transform duration-500" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════ TESTIMONIALS (STICKY HORIZONTAL) */}
      <section className="testimonials-sticky-section relative bg-[#0C0C0C] overflow-hidden" id="conversation">
        <div className="testimonials-wrapper flex min-h-[500px] lg:h-screen items-center">
          
          {/* Left Intro Card */}
          <div className="flex-shrink-0 w-full lg:w-[40vw] px-8 lg:px-20 py-20 lg:py-0">
            <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/30 mb-6">THE FEEDBACK</p>
            <h2 className="text-[clamp(2.5rem,6vw,5.5rem)] font-bold tracking-[-0.03em] text-white leading-[0.9] mb-12">
              The Conversation.
            </h2>
            <div className="flex gap-4">
              <button 
                className="t-prev w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-500"
              >
                <ArrowLeft size={20} />
              </button>
              <button 
                className="t-next w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-500"
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </div>

          {/* Testimonial Cards */}
          <div className="flex gap-16 pr-[20vw]">
            {testimonials.map((t, i) => (
              <div 
                key={i} 
                className="testimonial-card flex-shrink-0 w-[85vw] md:w-[60vw] lg:w-[45vw] aspect-[4/3] md:aspect-[16/9] relative group overflow-hidden"
              >
                <div className="absolute inset-0 bg-[#111] border border-white/5 p-12 lg:p-20 flex flex-col justify-between">
                  <div>
                    <span className="text-[6rem] font-serif italic text-white/5 h-12 block -mt-10">&ldquo;</span>
                    <p className="text-[clamp(1.25rem,3vw,2rem)] font-light leading-[1.3] text-white/90 tracking-tight">
                      {t.quote}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-6 mt-12">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-[#222] grayscale">
                      <Image 
                        src={t.avatar} 
                        alt={t.author} 
                        width={64} 
                        height={64} 
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <p className="text-white text-lg font-bold tracking-tight">{t.author}</p>
                      <p className="text-white/40 text-[11px] uppercase tracking-widest font-bold">{t.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Progress Indicator */}
          <div className="absolute bottom-16 left-8 lg:left-20 right-8 lg:right-20 flex items-center gap-8 z-20">
             <div className="flex-grow h-[1px] bg-white/10 relative overflow-hidden">
                <div className="t-progress-bar absolute top-0 left-0 h-full bg-white scale-x-0 origin-left" />
             </div>
             <span className="text-white/20 font-mono text-sm leading-none t-counter">01 / 0{testimonials.length}</span>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════ SERVICES */}
      <section id="services" className="border-t border-[#E8E8E8] py-24 md:py-36">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-20">
            <div className="md:col-span-5">
              <p data-a className="text-[11px] font-medium tracking-[0.25em] uppercase text-[#888] mb-4">Services</p>
              <h2 data-a data-delay="0.08" className="text-[clamp(1.75rem,3.5vw,3rem)] font-bold tracking-[-0.03em]">
                Support Beyond<br />Buying &amp; Selling
              </h2>
            </div>
            <div className="md:col-span-4 md:col-start-9 flex items-end">
              <p data-a className="text-[#888] text-base font-light leading-relaxed">
                The real estate market never stands still — and neither do we.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#E8E8E8] border border-[#E8E8E8]">
            {services.map((s, i) => (
              <div key={s.n} data-a data-delay={`${i * 0.1}`} className="p-10 lg:p-12 flex flex-col gap-6 group hover:bg-[#F9F9F9] transition-colors duration-300">
                <span className="text-[11px] font-medium tracking-[0.25em] text-[#CCC]">{s.n}</span>
                <div className="service-line w-8 h-[1px] bg-[#0C0C0C] group-hover:w-full transition-all duration-700 origin-left" />
                <h3 className="text-xl font-bold tracking-[-0.02em]">{s.title}</h3>
                <p className="text-[#888] text-sm font-light leading-relaxed flex-grow">{s.desc}</p>
                <Link href="/contact" className="inline-flex items-center gap-3 text-[13px] font-semibold tracking-wide group/link mt-auto">
                  <span>Learn more</span>
                  <span className="w-5 h-[1px] bg-[#0C0C0C] group-hover/link:w-10 transition-all duration-500" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════ BLOG */}
      <section id="blog" className="border-t border-[#E8E8E8] py-24 md:py-36 bg-[#F9F9F9]">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
          <div className="flex items-baseline justify-between mb-16">
            <div>
              <p data-a className="text-[11px] font-medium tracking-[0.25em] uppercase text-[#888] mb-4">Resources</p>
              <h2 data-a data-delay="0.08" className="text-[clamp(1.75rem,3.5vw,3rem)] font-bold tracking-[-0.03em]">Blog &amp; Resources</h2>
            </div>
            <Link href="/blog" data-a className="hidden md:flex items-center gap-3 text-[13px] font-semibold tracking-wide group">
              <span>Visit Blog</span>
              <span className="w-6 h-[1px] bg-[#0C0C0C] group-hover:w-12 transition-all duration-500" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Big post */}
            <div data-img className="md:col-span-6 group cursor-pointer opacity-0">
              <div className="relative aspect-[3/2] overflow-hidden bg-[#E8E8E8] mb-5">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url('${blog[0].img}')` }} />
              </div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-[#888]">{blog[0].tag}</span>
                <span className="text-[10px] text-[#CCC]">·</span>
                <span className="text-[10px] text-[#888]">{blog[0].date}</span>
              </div>
              <h3 className="text-xl font-bold tracking-[-0.02em] mb-3 group-hover:opacity-60 transition-opacity duration-300">{blog[0].title}</h3>
              <p className="text-[#888] text-sm font-light leading-relaxed">{blog[0].summary}</p>
            </div>

            {/* 2 small */}
            <div className="md:col-span-6 flex flex-col gap-8">
              {blog.slice(1).map((post, i) => (
                <div data-a data-delay={`${i * 0.1}`} key={i} className="group cursor-pointer flex gap-5">
                  <div className="relative w-28 h-20 flex-shrink-0 overflow-hidden bg-[#E8E8E8]">
                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url('${post.img}')` }} />
                  </div>
                  <div className="flex-grow min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-[#888]">{post.tag}</span>
                      <span className="text-[10px] text-[#CCC]">·</span>
                      <span className="text-[10px] text-[#888]">{post.date}</span>
                    </div>
                    <h3 className="text-sm font-bold tracking-[-0.01em] leading-tight mb-2 group-hover:opacity-60 transition-opacity duration-300">{post.title}</h3>
                    <p className="text-[#888] text-xs font-light leading-relaxed line-clamp-2">{post.summary}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
