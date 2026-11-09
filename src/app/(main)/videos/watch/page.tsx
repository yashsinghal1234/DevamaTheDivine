"use client";

import { useState } from "react";
import Link from "next/link";
import ChunkedVideo from "@/components/chunked-video";

interface VideoItem {
  id: string;
  title: string;
  description: string;
  streamUrl: string; // HLS .m3u8 or /api/stream/...
  duration: string;
  views: string;
  date: string;
  channel: {
    name: string;
    verified: boolean;
    subscribers: string;
  };
  relatedProducts: {
    title: string;
    price: number;
    image: string;
    handle: string;
  }[];
}

const PLAYLIST: VideoItem[] = [
  {
    id: "rudraksha-meditation",
    title: "How to Meditate with a 5 Mukhi Rudraksha Mala — Sacred Pranayama Guide",
    description:
      "A complete walkthrough on holding, counting, and activating your 5 Mukhi Rudraksha beads during morning Japa meditation. Consecrated through Vedic mantras before dispatch.",
    streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    duration: "10:24",
    views: "24.8K views",
    date: "3 days ago",
    channel: {
      name: "Devama The Divine",
      verified: true,
      subscribers: "128K devotees",
    },
    relatedProducts: [
      {
        title: "5 Mukhi Rudraksha Mala (108+1 Beads)",
        price: 1499,
        image:
          "https://devamathedivine.com/cdn/shop/files/1_722ae3a9-a9ae-48f7-9fc2-9f8188f1864d.png?width=400",
        handle: "5-mukhi-rudraksha",
      },
      {
        title: "Kuber Dhan Prapti Potli",
        price: 999,
        image:
          "https://devamathedivine.com/cdn/shop/files/3_1ca42fee-84ed-4fda-891d-9ff2d36fb6c2.png?width=400",
        handle: "kuber-potali",
      },
    ],
  },
  {
    id: "karungali-demo",
    title: "Karungali Ebony Wood vs Fake Replicas: Water Density & Authenticity Test",
    description:
      "Watch our laboratory density sink test and inspect the jet-black natural grain of authentic Karungali wood harvested from aged South Indian ebony trees.",
    streamUrl: "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
    duration: "08:15",
    views: "52.1K views",
    date: "1 week ago",
    channel: {
      name: "Devama The Divine",
      verified: true,
      subscribers: "128K devotees",
    },
    relatedProducts: [
      {
        title: "Original Karungali Mala 8mm",
        price: 1899,
        image:
          "https://devamathedivine.com/cdn/shop/collections/gemstone-bracelet-collection-devama.png?width=400",
        handle: "karungali-mala-original",
      },
    ],
  },
  {
    id: "kuber-potli",
    title: "Placing the Kuber Potli in Your Home: Auspicious North-East Direction Ritual",
    description:
      "Step-by-step guidance on unwrapping your energized Kuber potli, lighting the diya, and placing the sacred herbs and coins for domestic prosperity.",
    streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    duration: "12:40",
    views: "18.3K views",
    date: "2 weeks ago",
    channel: {
      name: "Devama The Divine",
      verified: true,
      subscribers: "128K devotees",
    },
    relatedProducts: [
      {
        title: "Kuber Poojan Potli with Consecrated Yantra",
        price: 999,
        image:
          "https://devamathedivine.com/cdn/shop/collections/devama-potli-collection.png?width=400",
        handle: "kuber-potali",
      },
    ],
  },
];

export default function WatchPage() {
  const [currentVideo, setCurrentVideo] = useState<VideoItem>(PLAYLIST[0]);
  const [isLiked, setIsLiked] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  return (
    <main className="min-h-screen bg-[#FBF7F0] text-ink pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Breadcrumb Navigation */}
        <nav className="text-xs text-clay mb-4 flex items-center gap-2">
          <Link href="/" className="hover:text-maroon">Home</Link>
          <span>/</span>
          <Link href="/videos" className="hover:text-maroon">Videos</Link>
          <span>/</span>
          <span className="text-ink font-medium truncate">{currentVideo.title}</span>
        </nav>

        {/* YouTube-Style Layout: Video Left (8 cols) + Sidebar Right (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Video Section */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* 16:9 Cinema Player with Chunking & HLS */}
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black border border-line">
              <ChunkedVideo
                src={currentVideo.streamUrl}
                poster="https://devamathedivine.com/cdn/shop/files/Banner_unfadded_c95e4b43-3a2c-4a0a-b20b-19883a9e7c0e.jpg?v=1783797078&width=1600"
                autoPlay={false}
                muted={false}
                controls={true}
              />
            </div>

            {/* Video Title */}
            <h1 className="font-serif text-2xl sm:text-3xl font-medium text-ink leading-snug">
              {currentVideo.title}
            </h1>

            {/* Channel, Likes & Actions Row */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-line">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-maroon text-cream flex items-center justify-center font-serif text-lg font-bold shadow-xs">
                  D
                </div>
                <div>
                  <div className="flex items-center gap-1.5 font-semibold text-sm text-ink">
                    <span>{currentVideo.channel.name}</span>
                    <span className="text-gold text-xs">✓</span>
                  </div>
                  <span className="text-xs text-clay">
                    {currentVideo.channel.subscribers}
                  </span>
                </div>
                <button
                  onClick={() => setSubscribed((s) => !s)}
                  className={`ml-3 px-5 py-2 rounded-full text-xs font-semibold transition-all shadow-xs ${
                    subscribed
                      ? "bg-sand text-ink hover:bg-line"
                      : "bg-maroon hover:bg-maroon-deep text-cream btn-sheen"
                  }`}
                >
                  {subscribed ? "Subscribed" : "Subscribe"}
                </button>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsLiked((l) => !l)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium border border-line transition-colors ${
                    isLiked ? "bg-maroon/10 text-maroon border-maroon/30" : "bg-white text-ink hover:bg-sand/40"
                  }`}
                >
                  <span>{isLiked ? "❤️ Liked" : "🤍 Like"}</span>
                </button>
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({ title: currentVideo.title, url: window.location.href });
                    }
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium border border-line bg-white hover:bg-sand/40 transition-colors"
                >
                  <span>↗ Share</span>
                </button>
              </div>
            </div>

            {/* Expandable Video Description Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-cream-card border border-line space-y-2">
              <div className="flex items-center gap-3 text-xs font-semibold text-ink">
                <span>{currentVideo.views}</span>
                <span>•</span>
                <span>{currentVideo.date}</span>
                <span className="ml-auto px-2 py-0.5 rounded bg-sand font-mono text-[10px] text-clay">
                  HLS CHUNKED STREAM
                </span>
              </div>
              <p className="text-xs sm:text-sm text-clay leading-relaxed">
                {currentVideo.description}
              </p>
            </div>

            {/* Featured Product Shelf (Shopify Integrated in Video) */}
            <div className="pt-2">
              <h3 className="eyebrow text-terracotta text-xs mb-3">
                Sacred Pieces Featured in this Video
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentVideo.relatedProducts.map((p) => (
                  <div
                    key={p.handle}
                    className="flex items-center gap-4 p-3 rounded-2xl border border-line bg-white shadow-xs hover:border-gold-deep transition-all"
                  >
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-16 h-16 rounded-xl object-contain bg-sand/30 p-1"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-serif text-sm font-medium text-ink truncate">
                        {p.title}
                      </p>
                      <p className="text-xs font-semibold text-maroon mt-0.5">
                        ₹{p.price.toLocaleString("en-IN")}
                      </p>
                      <Link
                        href={`/products/${p.handle}`}
                        className="text-[11px] font-medium text-gold-deep hover:underline mt-1 inline-block"
                      >
                        View Sacred Piece →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar / Recommended Playlist */}
          <div className="lg:col-span-4 space-y-4">
            <h2 className="font-serif text-xl font-medium text-ink">
              Ritual & Guidance Videos
            </h2>
            <div className="space-y-3">
              {PLAYLIST.map((video) => {
                const isActive = video.id === currentVideo.id;
                return (
                  <div
                    key={video.id}
                    onClick={() => setCurrentVideo(video)}
                    className={`flex gap-3 p-2.5 rounded-2xl border cursor-pointer transition-all ${
                      isActive
                        ? "bg-maroon/8 border-maroon/30 shadow-xs"
                        : "bg-white border-line hover:border-gold/60 hover:bg-cream-card"
                    }`}
                  >
                    {/* Thumbnail preview */}
                    <div className="relative w-36 h-22 rounded-xl overflow-hidden bg-black shrink-0">
                      <img
                        src="https://devamathedivine.com/cdn/shop/files/Banner_unfadded_c95e4b43-3a2c-4a0a-b20b-19883a9e7c0e.jpg?v=1783797078&width=400"
                        alt={video.title}
                        className="w-full h-full object-cover opacity-80"
                      />
                      <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/80 text-[10px] font-mono text-white">
                        {video.duration}
                      </span>
                      {isActive && (
                        <div className="absolute inset-0 bg-maroon/20 flex items-center justify-center">
                          <span className="w-6 h-6 rounded-full bg-maroon text-cream flex items-center justify-center text-xs">
                            ▶
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                      <h4 className="text-xs font-semibold text-ink line-clamp-2 leading-snug">
                        {video.title}
                      </h4>
                      <p className="text-[11px] text-clay">{video.channel.name}</p>
                      <p className="text-[10px] text-clay/70">
                        {video.views} • {video.date}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
