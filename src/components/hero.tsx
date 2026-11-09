"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IconArrowRight } from "./icons";
import Reveal from "./reveal";
import ChunkedVideo from "./chunked-video";

interface HeroProps {
  initialImage: string;
}

export default function Hero({ initialImage }: HeroProps) {
  // Toggle between high-impact Video Ad mode and traditional Photography mode
  const [isVideoMode, setIsVideoMode] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  return (
    <section className="bg-maroon text-cream relative">
      <div className="grid grid-cols-1 overflow-hidden lg:grid-cols-[1.05fr_1fr]">
        
        {/* Copy Column */}
        <div className="relative px-6 py-14 sm:px-10 sm:py-20 lg:px-14 lg:py-24 z-10">
          <div className="flex items-center gap-3">
            <p className="eyebrow anim-fade-up text-cream/70">
              Sacred Rudraksha · Consecrated with Mantras
            </p>
            {/* Mode Toggle Switch */}
            <button
              onClick={() => setIsVideoMode((v) => !v)}
              className="px-2.5 py-0.5 rounded-full border border-gold/40 text-[9px] font-mono tracking-wider text-gold hover:bg-gold/10 transition-colors"
            >
              {isVideoMode ? "▶ LIVE VIDEO AD" : "📷 STATIC PHOTO"}
            </button>
          </div>

          <h1 className="mt-4 max-w-md font-serif text-5xl font-semibold leading-[1.05] sm:mt-5 sm:text-6xl lg:text-7xl d-100 anim-fade-up">
            Where Faith Meets Authenticity.
          </h1>
          <p className="mt-5 max-w-sm text-sm font-light leading-relaxed text-cream/85 sm:text-[15px] d-200 anim-fade-up">
            Discover lab-certified Rudraksha malas and consecrated Karungali for meditation and domestic peace.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3 d-300 anim-fade-up">
            <Link
              href="/collections/all"
              className="btn-sheen group inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-gold px-6 py-3 text-sm font-medium text-maroon-dark transition-colors hover:bg-gold-deep sm:w-auto"
            >
              Explore the collection
              <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/videos/watch"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-cream/30 px-6 py-3 text-sm font-medium text-cream transition-colors hover:border-cream/60 hover:bg-cream/10 sm:w-auto"
            >
              Watch Video Stories
            </Link>
          </div>

          <Reveal delay={400} className="mt-14 sm:mt-20">
            <Link
              href="/collections/all"
              className="eyebrow inline-flex items-center gap-3 text-cream/70 transition-colors hover:text-gold"
            >
              Rudraksha collections
              <span className="h-px w-6 bg-cream/40" />
              Starting from ₹499
            </Link>
          </Reveal>
        </div>

        {/* Media Column: Seamless Chunked Video Ad OR Static Photography */}
        <div className="relative min-h-[360px] sm:min-h-[440px] lg:min-h-full overflow-hidden bg-black">
          {isVideoMode ? (
            <div className="relative w-full h-full min-h-[360px] sm:min-h-[440px] lg:min-h-full">
              {/* Chunked Streaming Video */}
              <ChunkedVideo
                src="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
                poster={initialImage}
                autoPlay={true}
                muted={isMuted}
                loop={true}
                controls={false}
                className="w-full h-full object-cover scale-105"
              />

              {/* Gradient Overlay for luxury readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-maroon/80 via-transparent to-transparent pointer-events-none lg:from-maroon/60" />

              {/* Sound toggle & Video Ad Badge */}
              <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
                <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur text-[10px] font-mono tracking-widest text-gold border border-gold/30 uppercase">
                  ● Featured Video Ad
                </span>
                <button
                  onClick={() => setIsMuted((m) => !m)}
                  className="w-8 h-8 rounded-full bg-black/60 backdrop-blur border border-cream/20 text-cream flex items-center justify-center hover:bg-black/90 transition-colors text-xs"
                  aria-label={isMuted ? "Unmute video" : "Mute video"}
                >
                  {isMuted ? "🔇" : "🔊"}
                </button>
              </div>

              {/* Bottom pill link to full YouTube-style watch page */}
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between z-20">
                <p className="eyebrow rounded-full bg-maroon-dark/80 px-4 py-2 text-[10px] text-cream/90 backdrop-blur-sm">
                  Sacred Consecration in Progress
                </p>
                <Link
                  href="/videos/watch"
                  className="px-3.5 py-1.5 rounded-full bg-gold text-maroon-dark text-xs font-semibold hover:bg-gold-deep transition-all shadow-md flex items-center gap-1.5"
                >
                  <span>Watch in Full HD</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          ) : (
            <Reveal className="relative w-full h-full min-h-[360px] sm:min-h-[440px] lg:min-h-full" delay={200}>
              <Image
                src={initialImage}
                alt="Rudraksha malas arranged before a lit diya"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover kenburns"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-maroon/35 via-transparent to-transparent lg:from-maroon/25" />
              <p className="eyebrow absolute bottom-5 left-5 rounded-full bg-maroon-dark/70 px-4 py-2 text-[10px] text-cream/90 backdrop-blur-sm sm:bottom-6 sm:left-6">
                Rooted in tradition, chosen with care
              </p>
            </Reveal>
          )}
        </div>

      </div>
    </section>
  );
}
