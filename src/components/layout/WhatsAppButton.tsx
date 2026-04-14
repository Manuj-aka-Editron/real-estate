'use client';
import { MessageCircle, MoveRight } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const phoneNumber = '917988914606'; 
  const message = encodeURIComponent('Can I get more info regarding this?');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    const timeout = setTimeout(() => setIsVisible(true), 3000);
    return () => {
      window.removeEventListener('resize', check);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[100] transition-all duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)] ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      } group flex items-center gap-4`}
      aria-label="Contact us on WhatsApp"
    >
      {/* Label (Hidden on mobile) */}
      <span className="hidden md:block bg-white/95 backdrop-blur-md text-[#0C0C0C] text-[10px] font-bold tracking-[0.3em] uppercase px-8 py-4 shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-[#E8E8E8] opacity-0 -translate-x-6 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-700 pointer-events-none">
        Start Conversation
      </span>

      {/* WhatsApp Icon Circle */}
      <div className="relative w-14 h-14 md:w-16 md:h-16 bg-[#25D366] hover:bg-[#20bd5c] rounded-full flex items-center justify-center text-white shadow-[0_15px_30px_rgba(37,211,102,0.3)] transition-all duration-500 hover:scale-110 active:scale-95 group-hover:rotate-[360deg]">
        <MessageCircle size={isMobile ? 22 : 26} strokeWidth={2.5} />
        
        {/* Subtle pulse animation */}
        <div className="absolute inset-0 rounded-full bg-[#25D366]/30 animate-pulse -z-10" />
      </div>
    </a>
  );
}
