import { NextRequest, NextResponse } from "next/server";

// Public high-reliability CDN video clips for meditation, natural scenery & craftsmanship
const VIDEO_REGISTRY: Record<string, string> = {
  "hero-ad": "https://cdn.pixabay.com/video/2020/05/25/40149-425021235_large.mp4",
  "rudraksha-meditation": "https://cdn.pixabay.com/video/2021/04/18/71447-539097940_large.mp4",
  "karungali-demo": "https://cdn.pixabay.com/video/2020/07/04/43834-436737562_large.mp4",
  "kuber-potli": "https://cdn.pixabay.com/video/2022/01/18/104768-667104353_large.mp4",
};

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const targetUrl = VIDEO_REGISTRY[id] || VIDEO_REGISTRY["hero-ad"];

  const range = req.headers.get("range");

  try {
    const upstreamHeaders: HeadersInit = {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    };
    if (range) {
      upstreamHeaders["Range"] = range;
    }

    const upstreamResponse = await fetch(targetUrl, {
      headers: upstreamHeaders,
      cache: "no-store",
    });

    const status = upstreamResponse.status;
    const responseHeaders = new Headers();

    [
      "content-type",
      "content-length",
      "content-range",
      "accept-ranges",
      "cache-control",
    ].forEach((header) => {
      const val = upstreamResponse.headers.get(header);
      if (val) responseHeaders.set(header, val);
    });

    if (!responseHeaders.has("accept-ranges")) {
      responseHeaders.set("accept-ranges", "bytes");
    }

    return new NextResponse(upstreamResponse.body, {
      status,
      headers: responseHeaders,
    });
  } catch (err) {
    return new NextResponse("Video streaming chunk error", { status: 500 });
  }
}
