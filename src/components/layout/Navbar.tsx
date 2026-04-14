'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'Search', href: '/properties' },
    { name: 'Neighborhoods', href: '/neighborhoods' },
    { name: 'Agents', href: '/about' },
    { name: 'Join', href: '/contact' },
    { name: 'About', href: '/about' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-1000 ${
        scrolled ? 'bg-background/80 backdrop-blur-md py-4 border-b border-border-grey' : 'bg-transparent py-8'
      }`}
      role="navigation"
      aria-label="Main Navigation"
    >
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12 flex items-center justify-between">
        
        {/* LOGO */}
        <Link 
          href="/" 
          className="text-2xl font-bold tracking-tighter flex items-baseline gap-0 cursor-none-trigger group"
          aria-label="Aurelia Estates Home"
        >
          <span className="bg-foreground text-background pl-2 pr-0 py-0.5">A</span>
          <span className="group-hover:tracking-[0.1em] transition-all duration-700">URELIA</span>
          <span className="font-light italic text-mid-grey">.</span>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden md:flex items-center gap-12">
          <div className="flex items-center gap-8 border-r border-border-grey pr-8">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[11px] font-bold uppercase tracking-[0.2em] text-foreground/50 hover:text-foreground transition-all duration-500 cursor-none-trigger"
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          <div className="flex items-center gap-8">
            <ThemeToggle />
            <Link 
              href="/signin" 
              className="px-8 py-3 bg-foreground text-background text-[11px] font-bold uppercase tracking-[0.2em] hover:opacity-80 transition-all cursor-none-trigger"
              aria-label="Sign in to your private portfolio"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* MOBILE TRIGGER */}
        <div className="flex md:hidden items-center gap-6">
          <ThemeToggle />
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="flex flex-col gap-1.5 p-2"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
          >
            <span className={`w-6 h-[1px] bg-foreground transition-all duration-500 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-6 h-[1px] bg-foreground transition-all duration-500 ${isOpen ? 'opacity-0' : ''}`} />
            <span className={`w-6 h-[1px] bg-foreground transition-all duration-500 ${isOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
          </button>
        </div>
      </div>

      {/* MOBILE OVERLAY */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-background z-40 flex flex-col justify-center items-center gap-8 animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Menu"
        >
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-4xl font-bold tracking-tighter"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            href="/signin" 
            className="mt-12 px-16 py-6 bg-foreground text-background text-[12px] font-bold uppercase tracking-[0.3em]"
            onClick={() => setIsOpen(false)}
          >
            Sign In
          </Link>
          <button 
            className="mt-16 text-[11px] font-bold uppercase tracking-[0.2em] text-mid-grey"
            onClick={() => setIsOpen(false)}
          >
            Close
          </button>
        </div>
      )}
    </nav>
  );
}
