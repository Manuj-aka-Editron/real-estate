'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useLayoutEffect, useRef } from 'react';
import { MoveRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const blogPosts = [
  {
    id: 1,
    title: "The Architecture of Silence: Why Minimalism is Still the Ultimate Luxury.",
    category: "Design",
    date: "April 12, 2026",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200",
    summary: "As cities grow louder, the true marker of a premium property isn't its footprint, but its ability to foster stillness. We explore the evolving landscape of architectural quietude."
  },
  {
    id: 2,
    title: "Tribeca's Industrial Renaissance: The Shift from Steel to Soul.",
    category: "Neighborhoods",
    date: "April 10, 2026",
    image: "https://images.unsplash.com/photo-1543269664-76bc3997d9ea?w=1200",
    summary: "How the once-gritty heart of Manhattan's manufacturing district became the global gold standard for residential loft living, and what's coming next for the cobblestone streets."
  },
  {
    id: 3,
    title: "Curating the Collection: The Art of the Mood-Based Acquisition.",
    category: "Insight",
    date: "April 08, 2026",
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1200",
    summary: "Real estate is no longer a math problem. It's a mood. Our curators discuss the transition from traditional filtering to emotional alignment in luxury acquisitions."
  },
  {
    id: 4,
    title: "The Future of Heritage: Why 'Old Money' Aesthetics are Trending with the New Guard.",
    category: "Trends",
    date: "April 05, 2026",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200",
    summary: "A deep dive into why Gen-Z and Millennial high-net-worth individuals are moving away from glass towers and back toward brownstones with history."
  }
];

export default function BlogPage() {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in stories on scroll
      gsap.utils.toArray('.blog-post').forEach((post: any) => {
        gsap.from(post, {
          opacity: 0,
          y: 40,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: post,
            start: 'top 85%',
          }
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="bg-white text-foreground min-h-screen pt-32 pb-64">
      {/* ══════════════════════════════════════════ HEADER */}
      <section className="max-w-[1400px] mx-auto px-8 lg:px-12 mb-32">
        <div className="max-w-4xl">
          <p className="text-[10px] font-bold tracking-[0.5em] uppercase text-foreground/40 mb-8">THE PERSPECTIVE • EDITORIAL INSIGHTS</p>
          <h1 className="text-[clamp(3.5rem,10vw,9.5rem)] font-bold tracking-[-0.05em] leading-[0.88] mb-16">
            Stories that<br />
            <span className="font-serif italic font-light opacity-60">shape space.</span>
          </h1>
          <div className="w-full h-[1px] bg-foreground/10" />
        </div>
      </section>

      {/* ══════════════════════════════════════════ FEATURED STORY */}
      <section className="blog-post max-w-[1400px] mx-auto px-8 lg:px-12 mb-48 group cursor-pointer">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-8 relative aspect-[16/9] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000">
            <Image 
              src={blogPosts[0].image} 
              alt={blogPosts[0].title} 
              fill 
              className="object-cover scale-105 group-hover:scale-100 transition-transform duration-1000"
            />
          </div>
          <div className="lg:col-span-4">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[10px] font-bold tracking-widest uppercase border border-foreground/20 px-3 py-1">{blogPosts[0].category}</span>
              <span className="text-[10px] font-bold text-foreground/30 uppercase">{blogPosts[0].date}</span>
            </div>
            <h2 className="text-4xl font-bold tracking-tight leading-tight mb-8 group-hover:text-foreground/60 transition-colors">
              {blogPosts[0].title}
            </h2>
            <p className="text-foreground/60 font-light leading-relaxed mb-10">
              {blogPosts[0].summary}
            </p>
            <Link href={`/blog/${blogPosts[0].id}`} className="inline-flex items-center gap-4 text-[12px] font-bold tracking-[0.3em] uppercase group/link">
              <span>Read Perspective</span>
              <MoveRight className="group-hover/link:translate-x-4 transition-transform duration-500" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════ ARTICLE GRID */}
      <section className="max-w-[1400px] mx-auto px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24">
          {blogPosts.slice(1).map((post) => (
            <div key={post.id} className="blog-post group cursor-pointer">
              <div className="relative aspect-[4/5] overflow-hidden mb-10 border border-foreground/5 grayscale hover:grayscale-0 transition-all duration-700">
                <Image 
                  src={post.image} 
                  alt={post.title} 
                  fill 
                  className="object-cover scale-110 group-hover:scale-100 transition-transform duration-1000"
                />
              </div>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-[10px] font-bold tracking-widest uppercase text-foreground/40">{post.category}</span>
                <span className="text-[10px] text-foreground/20 italic">{post.date}</span>
              </div>
              <h3 className="text-2xl font-bold tracking-tight leading-snug mb-6 group-hover:opacity-60 transition-opacity">
                {post.title}
              </h3>
              <p className="text-foreground/50 text-sm font-light leading-relaxed line-clamp-3 mb-8">
                {post.summary}
              </p>
              <Link href={`/blog/${post.id}`} className="text-[11px] font-bold tracking-widest uppercase border-b border-foreground/10 pb-1 hover:border-foreground transition-colors overflow-hidden inline-block">
                Continue Reading
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════ NEWSLETTER */}
      <section className="mt-64 border-t border-foreground/10 py-32 md:py-48 bg-matte-black text-white">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12 text-center">
          <p className="text-[10px] font-bold tracking-[0.6em] uppercase text-white/40 mb-12 italic italic-eye">STAY INFORMED</p>
          <h2 className="text-[clamp(2.5rem,7vw,5.5rem)] font-bold tracking-[-0.04em] leading-[0.9] mb-16">
            Join the editorial<br /><span className="font-serif italic font-light opacity-40">mailing list.</span>
          </h2>
          <div className="max-w-xl mx-auto flex gap-4">
            <input 
              type="email" 
              placeholder="YOUR EMAIL" 
              className="flex-grow bg-transparent border-b border-white/20 py-4 text-[12px] tracking-widest focus:border-white transition-colors outline-none"
            />
            <button className="border border-white/20 px-8 py-4 text-[12px] font-bold tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
