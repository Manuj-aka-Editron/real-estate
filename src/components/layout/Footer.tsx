'use client';
import Link from 'next/link';

const SocialIcons = {
  Facebook: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
  Instagram: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  ),
  Youtube: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
    </svg>
  ),
  Linkedin: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
};

const navLinks = [
  ['Search', '/properties'],
  ['Agents', '/about'],
  ['Join', '/contact'],
  ['About Us', '/about'],
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0C0C0C] text-white">
      {/* CTA block */}
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12 pt-20 pb-16 border-b border-white/10">
        <p className="text-[11px] font-medium tracking-[0.25em] uppercase text-white/30 mb-6">
          Ready to begin?
        </p>
        <h2 className="text-[clamp(2.5rem,7vw,6rem)] font-bold tracking-[-0.04em] leading-[1.0] mb-10 max-w-3xl">
          Find You. We&apos;ll Help You Get There.
        </h2>
        <Link
          href="/contact"
          className="inline-flex items-center gap-3 text-[13px] font-semibold tracking-wide group"
        >
          <span>Get in touch</span>
          <span className="w-8 h-[1px] bg-white group-hover:w-16 transition-all duration-300" />
        </Link>
      </div>

      {/* Grid */}
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12 py-16 grid grid-cols-2 md:grid-cols-4 gap-12 border-b border-white/10">
        <div>
          <p className="text-[10px] font-medium tracking-[0.25em] uppercase text-white/30 mb-6">Navigate</p>
          <ul className="space-y-3">
            {navLinks.map(([label, href]) => (
              <li key={label}>
                <Link href={href} className="text-white/60 hover:text-white text-[13px] transition-colors font-light">{label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[10px] font-medium tracking-[0.25em] uppercase text-white/30 mb-6">Services</p>
          <ul className="space-y-3">
            {['Mortgage Services', 'Property Management', 'Development', 'Agent Portal'].map((s) => (
              <li key={s}><span className="text-white/60 text-[13px] font-light">{s}</span></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[10px] font-medium tracking-[0.25em] uppercase text-white/30 mb-6">Contact</p>
          <ul className="space-y-2.5 text-white/60 text-[13px] font-light">
            <li>5 West 37th Street, 12th Floor</li>
            <li>New York, NY 10018</li>
            <li className="pt-1">
              <a href="mailto:hello@aureliaestates.com" className="hover:text-white transition-colors">hello@aureliaestates.com</a>
            </li>
            <li>
              <a href="tel:+12129949965" className="hover:text-white transition-colors">+1 212 994 9965</a>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-[10px] font-medium tracking-[0.25em] uppercase text-white/30 mb-6">Follow</p>
          <div className="flex gap-5">
            {[SocialIcons.Facebook, SocialIcons.Instagram, SocialIcons.Youtube, SocialIcons.Linkedin].map((Icon, i) => (
              <a key={i} href="#" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-white/25 text-[11px] tracking-wide">© {year} Aurelia Estates. All rights reserved.</span>
        <div className="flex gap-8">
          {['Terms', 'Privacy Policy', 'Fair Housing Notice'].map((item) => (
            <span key={item} className="text-white/25 text-[11px] tracking-wide hover:text-white/50 cursor-pointer transition-colors">{item}</span>
          ))}
        </div>
      </div>
    </footer>
  );
}
