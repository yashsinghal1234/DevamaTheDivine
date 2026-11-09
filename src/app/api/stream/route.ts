import { NextRequest, NextResponse } from "next/server";

// Real Adaptive Bitrate HLS Stream Registry (.m3u8 chunk playlists)
const VIDEO_REGISTRY: Record<string, string> = {
  "hero-ad": "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
  "rudraksha-meditation": "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
  "karungali-demo": "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
  "kuber-potli": "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
};

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id") || "hero-ad";
  const targetUrl = VIDEO_REGISTRY[id] || VIDEO_REGISTRY["hero-ad"];

  // 307 temporary redirect to the HLS chunked manifest URL
  return NextResponse.redirect(targetUrl, 307);
}
