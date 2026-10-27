import Reveal from "./reveal";
import { IconArrowRight, IconPlay } from "./icons";
import { getVideoStories, type VideoStory } from "@/lib/shopify";

export default async function VideoStories() {
  const stories: VideoStory[] = await getVideoStories();

  return (
    <section className="bg-cream py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow text-terracotta">Video guidance</p>
            <h2 className="mt-3 max-w-xl font-serif text-4xl font-medium leading-tight text-ink sm:text-5xl">
              See the details. Discover the stories.
            </h2>
          </div>
          <a
            href="/videos"
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-medium text-maroon hover:text-terracotta"
          >
            View all videos
            <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stories.map((story, i) => (
            <Reveal key={story.title} delay={i * 100} className="h-full">
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-cream-card transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-[0_16px_36px_-16px_rgba(54,34,23,0.28)]">
                {story.poster && story.videoUrl ? (
                  <div className="relative aspect-video overflow-hidden">
                    <video
                      className="h-full w-full object-cover"
                      poster={story.poster}
                      preload="metadata"
                      controls
                      playsInline
                    >
                      <source src={story.videoUrl} />
                    </video>
                  </div>
                ) : (
                  <div className="p-6 pb-0">
                    <div className="flex items-center justify-between">
                      <span className="pulse-ring flex h-11 w-11 items-center justify-center rounded-full bg-maroon text-cream transition-transform duration-300 group-hover:scale-110">
                        <IconPlay className="h-4 w-4 translate-x-[1px]" />
                      </span>
                      <span className="rounded-full border border-line px-2.5 py-1 text-[9px] font-medium tracking-[0.18em] text-clay/80">
                        {story.videoUrl ? "WATCH NOW" : "VIDEO COMING SOON"}
                      </span>
                    </div>
                    <div className="mt-5 h-px bg-line/80" />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6 pt-5">
                  <h3 className="font-serif text-xl font-semibold text-ink">
                    {story.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-clay">
                    {story.text}
                  </p>
                  {!story.videoUrl && (
                    <div className="mt-auto pt-5">
                      <span className="rounded-full bg-sand px-2.5 py-1 text-[9px] font-medium tracking-[0.18em] text-clay">
                        UPCOMING VIDEO
                      </span>
                    </div>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
