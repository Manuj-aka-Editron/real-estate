import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import CursorEffect from "@/components/layout/CursorEffect";
import PageTransition from "@/components/layout/PageTransition";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import Preloader from "@/components/layout/Preloader";
import { Providers } from "./providers";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aurelia Estates | The Editorial Perspective on Luxury Real Estate",
  description: "A boutique real estate collective dedicated to architectural provenance and cinematic lifestyle curation. Discover unique perspectives in Tribeca, SOHO, and beyond.",
  keywords: ["Aurelia Estates", "Luxury Real Estate NYC", "Boutique Property Agency", "Tribeca Lofts", "SOHO Real Estate", "Editorial Design", "Modernist Architecture"],
  authors: [{ name: "Aurelia Collective" }],
  robots: "index, follow",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased lg:cursor-none`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-white text-[#111111] overflow-x-hidden transition-colors duration-500">
        <Preloader />
        <Providers>
          <SmoothScroll>
            <CursorEffect />
            <Navbar />
            <main className="flex-grow">
              <PageTransition>
                {children}
              </PageTransition>
            </main>
            <Footer />
            <WhatsAppButton />
          </SmoothScroll>
        </Providers>
      </body>
    </html>
  );
}
