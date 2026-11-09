"use client";

import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

export interface ChunkedVideoProps {
  src: string; // .m3u8 (HLS chunk manifest) or .mp4 or internal /api/stream/...
  poster?: string;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  playsInline?: boolean;
  onTimeUpdate?: (currentTime: number, duration: number) => void;
  onEnded?: () => void;
}

/**
 * High-performance Video Player supporting:
 * - HLS Adaptive Bitrate Chunking (.m3u8) via hls.js
 * - Native iOS Safari HLS streaming
 * - HTTP Byte-range chunking fallback for MP4 (/api/stream/...)
 */
export default function ChunkedVideo({
  src,
  poster,
  className = "w-full h-full object-cover",
  autoPlay = false,
  muted = true,
  loop = false,
  controls = true,
  playsInline = true,
  onTimeUpdate,
  onEnded,
}: ChunkedVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [isBuffering, setIsBuffering] = useState(false);
  const [resolution, setResolution] = useState<string>("");

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    const isHls = src.includes(".m3u8") || src.includes("application/x-mpegURL");

    if (isHls && Hls.isSupported()) {
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }

      const hls = new Hls({
        maxBufferLength: 30, // Buffer 30 seconds ahead in memory
        maxMaxBufferLength: 60,
        enableWorker: true,
        lowLatencyMode: true,
      });

      hlsRef.current = hls;
      hls.loadSource(src);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, (_, data) => {
        if (data.levels.length > 0) {
          const highest = data.levels[data.levels.length - 1];
          setResolution(`${highest.height}p`);
        }
        if (autoPlay) {
          video.play().catch(() => {});
        }
      });

      hls.on(Hls.Events.LEVEL_SWITCHED, (_, data) => {
        const level = hls.levels[data.level];
        if (level) {
          setResolution(`${level.height}p`);
        }
      });

      hls.on(Hls.Events.ERROR, (_, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              hls.recoverMediaError();
              break;
            default:
              hls.destroy();
              break;
          }
        }
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Native Apple WebKit HLS (Safari, iOS)
      video.src = src;
      if (autoPlay) {
        video.play().catch(() => {});
      }
    } else {
      // Standard MP4 / HTTP range chunking
      video.src = src;
      if (autoPlay) {
        video.play().catch(() => {});
      }
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [src, autoPlay]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-black flex items-center justify-center">
      <video
        ref={videoRef}
        poster={poster}
        className={className}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        controls={controls}
        playsInline={playsInline}
        onWaiting={() => setIsBuffering(true)}
        onPlaying={() => setIsBuffering(false)}
        onEnded={onEnded}
        onTimeUpdate={(e) => {
          const target = e.currentTarget;
          if (onTimeUpdate) {
            onTimeUpdate(target.currentTime, target.duration || 0);
          }
        }}
      />

      {/* Buffering Indicator */}
      {isBuffering && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-none">
          <div className="h-9 w-9 rounded-full border-2 border-gold/40 border-t-gold animate-spin" />
        </div>
      )}

      {/* Adaptive resolution pill */}
      {resolution && (
        <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-black/60 backdrop-blur text-[10px] font-mono text-gold/90 pointer-events-none tracking-wider">
          HD {resolution}
        </div>
      )}
    </div>
  );
}

