'use client';
import { Mail, MapPin, Phone, MoveRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance
      gsap.fromTo('.contact-header > *',
        { opacity: 0, y: 30 },
        { 
          opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' 
        }
      );

      // Staggered reveal for info and form
      gsap.fromTo('.contact-reveal',
        { opacity: 0, y: 40 },
        { 
          opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out', delay: 0.4
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    // Simulate premium processing delay
    setTimeout(() => {
      gsap.to('.contact-form-inner', { 
        opacity: 0, 
        y: -20, 
        duration: 0.5, 
        ease: 'power2.in',
        onComplete: () => {
          setFormStatus('success');
          gsap.fromTo('.success-message', 
            { opacity: 0, y: 20 }, 
            { opacity: 1, y: 0, duration: 0.8, ease: 'power4.out' }
          );
        }
      });
    }, 1500);
  };

  return (
    <div ref={containerRef} className="bg-white min-h-screen pb-32 overflow-x-hidden">
      
      {/* ══════════════════════════════════════════ HEADER */}
      <section className="contact-header pt-48 pb-20 max-w-[1400px] mx-auto px-8 lg:px-12">
        <div className="max-w-3xl border-b border-[#E8E8E8] pb-16">
          <p className="text-[11px] font-medium tracking-[0.25em] uppercase text-[#888] mb-8">Connect With Us</p>
          <h1 className="text-[clamp(3.5rem,8vw,7rem)] font-bold tracking-[-0.03em] leading-[0.95] mb-8">
            Let&apos;s find your<br /><em className="font-serif not-italic" style={{ fontStyle: 'italic', fontFamily: 'var(--font-playfair-display), Georgia, serif' }}>alignment.</em>
          </h1>
          <p className="text-xl md:text-2xl font-light text-[#555] leading-relaxed tracking-tight">
            Whether you&apos;re curious about a property or ready to discuss your next chapter, our team is here to listen.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════ FORM & INFO */}
      <section className="max-w-[1400px] mx-auto px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-32 items-start">
          
          {/* Form Side */}
          <div className="lg:col-span-7 contact-reveal opacity-0">
            {formStatus === 'success' ? (
              <div className="success-message space-y-8 pt-12">
                <div className="w-16 h-[1px] bg-[#0C0C0C]" />
                <h2 className="text-[clamp(2rem,5vw,4.5rem)] font-bold tracking-tight leading-none">Perspective received.</h2>
                <p className="text-xl font-light text-[#555] max-w-lg leading-relaxed">
                  We appreciate your outreach. An agent with neighborhood expertise will be in touch within 24 hours to begin the conversation.
                </p>
                <button 
                  onClick={() => setFormStatus('idle')}
                  className="text-[11px] font-bold uppercase tracking-widest border-b border-[#0C0C0C] pb-2 hover:opacity-50 transition-all"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form
                className="contact-form-inner space-y-12"
                onSubmit={handleSubmit}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="border-b border-[#E8E8E8] focus-within:border-[#0C0C0C] transition-colors">
                    <label className="block text-[10px] text-[#AAAAAA] uppercase tracking-widest mb-1">First Name</label>
                    <input type="text" required className="w-full bg-transparent py-4 text-base outline-none font-medium text-[#0C0C0C]" />
                  </div>
                  <div className="border-b border-[#E8E8E8] focus-within:border-[#0C0C0C] transition-colors">
                    <label className="block text-[10px] text-[#AAAAAA] uppercase tracking-widest mb-1">Last Name</label>
                    <input type="text" required className="w-full bg-transparent py-4 text-base outline-none font-medium text-[#0C0C0C]" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="border-b border-[#E8E8E8] focus-within:border-[#0C0C0C] transition-colors">
                    <label className="block text-[10px] text-[#AAAAAA] uppercase tracking-widest mb-1">Email</label>
                    <input type="email" required className="w-full bg-transparent py-4 text-base outline-none font-medium text-[#0C0C0C]" />
                  </div>
                  <div className="border-b border-[#E8E8E8] focus-within:border-[#0C0C0C] transition-colors">
                    <label className="block text-[10px] text-[#AAAAAA] uppercase tracking-widest mb-1">Phone</label>
                    <input type="tel" className="w-full bg-transparent py-4 text-base outline-none font-medium text-[#0C0C0C]" />
                  </div>
                </div>

                <div className="border-b border-[#E8E8E8] focus-within:border-[#0C0C0C] transition-colors">
                  <label className="block text-[10px] text-[#AAAAAA] uppercase tracking-widest mb-1">Inquiry Type</label>
                  <select className="appearance-none w-full bg-transparent py-4 text-base outline-none font-medium text-[#0C0C0C] cursor-pointer">
                    <option>Buying a property</option>
                    <option>Selling a property</option>
                    <option>Renting a property</option>
                    <option>Investment & Development</option>
                    <option>Other / General Inquiry</option>
                  </select>
                </div>

                <div className="border-b border-[#E8E8E8] focus-within:border-[#0C0C0C] transition-colors">
                  <label className="block text-[10px] text-[#AAAAAA] uppercase tracking-widest mb-1">Message</label>
                  <textarea rows={3} className="w-full bg-transparent py-4 text-base outline-none font-medium text-[#0C0C0C] resize-none" />
                </div>

                <button
                  type="submit"
                  disabled={formStatus === 'sending'}
                  className="inline-flex items-center gap-4 bg-[#0C0C0C] text-white px-12 py-6 text-[13px] font-bold uppercase tracking-widest hover:bg-[#333] transition-all duration-300 group disabled:opacity-50"
                >
                  {formStatus === 'sending' ? 'Sending...' : 'Send Message'} 
                  {formStatus === 'idle' && <MoveRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                </button>
              </form>
            )}
          </div>

          {/* Info Side */}
          <div className="lg:col-span-5 space-y-20 contact-reveal opacity-0">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-12">
              <div className="space-y-4">
                <p className="text-[11px] font-medium tracking-[0.25em] uppercase text-[#AAAAAA]">The Office</p>
                <div className="flex gap-4">
                  <MapPin size={18} className="text-[#0C0C0C] mt-1 flex-shrink-0" />
                  <p className="text-lg font-bold leading-tight tracking-tight">
                    5 West 37th Street,<br />12th Floor<br />
                    New York, NY 10018
                  </p>
                </div>
              </div>

              <div className="space-y-8">
                <div className="space-y-4">
                  <p className="text-[11px] font-medium tracking-[0.25em] uppercase text-[#AAAAAA]">Reach Out</p>
                  <div className="flex items-center gap-4">
                    <Phone size={18} className="text-[#0C0C0C] flex-shrink-0" />
                    <a href="tel:+12129949965" className="text-xl font-bold tracking-tight hover:opacity-50 transition-opacity">+1 212 994 9965</a>
                  </div>
                  <div className="flex items-center gap-4">
                    <Mail size={18} className="text-[#0C0C0C] flex-shrink-0" />
                    <a href="mailto:hello@aureliaestates.com" className="text-xl font-bold tracking-tight hover:opacity-50 transition-opacity">hello@aureliaestates.com</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Area */}
            <div className="relative group cursor-pointer overflow-hidden aspect-[16/10] bg-[#F5F5F5]">
              <div
                className="absolute inset-0 bg-cover bg-center grayscale opacity-60 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-1000"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1000&auto=format&fit=crop&q=80')` }}
              />
              <div className="absolute inset-0 flex items-center justify-center p-8 text-center bg-black/5">
                <div className="bg-white/95 backdrop-blur-sm px-8 py-5 shadow-2xl">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#0C0C0C]">Aurelia NYC HQ</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
