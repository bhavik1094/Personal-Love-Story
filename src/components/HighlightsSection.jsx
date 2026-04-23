import { useEffect, useMemo, useRef, useState } from 'react';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

function VideoThumb({ video, active, onSelect, index }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group w-[min(17rem,calc(100vw-8rem))] shrink-0 snap-center overflow-hidden rounded-[1.6rem] border p-3 text-left transition duration-300 focus:outline-none focus:ring-2 focus:ring-rose-300 sm:w-[17rem] ${
        active
          ? 'border-rose-200 bg-white/90 shadow-[0_18px_55px_rgba(120,53,15,0.14)]'
          : 'border-white/70 bg-white/65 shadow-[0_16px_45px_rgba(120,53,15,0.08)] hover:-translate-y-0.5 hover:bg-white/85'
      }`}
      aria-label={`Show highlight ${index + 1}: ${video.title}`}
    >
      <div className="relative overflow-hidden rounded-[1.2rem] bg-stone-950">
        {video.poster ? (
          <img
            src={video.poster}
            alt={`${video.title} preview`}
            className="aspect-video w-full object-cover opacity-95 transition duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
        ) : (
          <div className="aspect-video w-full bg-[radial-gradient(circle_at_top,rgba(255,228,230,0.24),rgba(12,10,9,1))]" />
        )}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.48)_100%)]" />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="rounded-full border border-white/20 bg-white/15 px-3 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-white backdrop-blur">
            Preview
          </span>
        </div>
      </div>
      <div className="space-y-2 px-1 pb-1 pt-4">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-rose-500">
          Highlight {String(index + 1).padStart(2, '0')}
        </p>
        <h3 className="font-serif-display text-2xl leading-tight text-stone-800">{video.title}</h3>
        <p className="text-sm leading-6 text-stone-500">{video.subtitle}</p>
      </div>
    </button>
  );
}

function HighlightsSection({ highlights }) {
  const videos = highlights?.videos ?? [];
  const [activeIndex, setActiveIndex] = useState(0);
  const [videoError, setVideoError] = useState('');
  const mainVideoRef = useRef(null);
  const thumbStripRef = useRef(null);

  const activeVideo = videos[activeIndex] ?? null;
  const hasVideos = videos.length > 0;

  const statusLabel = useMemo(() => {
    if (!hasVideos) {
      return 'Add videos to begin';
    }

    return `${String(activeIndex + 1).padStart(2, '0')} / ${String(videos.length).padStart(2, '0')}`;
  }, [activeIndex, hasVideos, videos.length]);

  const goTo = (nextIndex) => {
    mainVideoRef.current?.pause();
    setVideoError('');
    setActiveIndex(nextIndex);

    if (thumbStripRef.current) {
      const child = thumbStripRef.current.children[nextIndex];
      child?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!hasVideos) {
        return;
      }

      if (event.key === 'ArrowLeft') {
        goTo((activeIndex - 1 + videos.length) % videos.length);
      }

      if (event.key === 'ArrowRight') {
        goTo((activeIndex + 1) % videos.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, hasVideos, videos.length]);

  const showNext = () => {
    if (!hasVideos) {
      return;
    }

    goTo((activeIndex + 1) % videos.length);
  };

  const showPrevious = () => {
    if (!hasVideos) {
      return;
    }

    goTo((activeIndex - 1 + videos.length) % videos.length);
  };

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10 sm:py-24 lg:px-12 lg:py-28">
      <SectionHeading
        eyebrow={highlights.eyebrow}
        title={highlights.title}
        description={highlights.subtitle}
      />

      <Reveal className="mt-12 sm:mt-14">
        <div className="overflow-hidden rounded-[2.5rem] border border-white/65 bg-[linear-gradient(180deg,rgba(255,255,255,0.75),rgba(255,244,246,0.86))] shadow-[0_35px_110px_rgba(120,53,15,0.14)] backdrop-blur-xl">
          {hasVideos && activeVideo ? (
            <div className="grid gap-0 lg:grid-cols-[minmax(0,1.12fr)_minmax(20rem,0.88fr)]">
              <div className="relative bg-stone-950">
                <video
                  ref={mainVideoRef}
                  key={activeVideo.id}
                  src={activeVideo.src}
                  className="aspect-video w-full object-cover"
                  poster={activeVideo.poster || undefined}
                  playsInline
                  preload="metadata"
                  controls
                  onLoadedData={() => setVideoError('')}
                  onPlay={() => setVideoError('')}
                  onError={() => {
                    setVideoError('This file could not be played in the browser. Try another highlight while I keep this one visible.');
                  }}
                />

                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-stone-950/65 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4 px-5 pb-5 sm:px-7 sm:pb-6">
                  <div className="max-w-md">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-rose-100/85">
                      Wedding Reel
                    </p>
                    <h3 className="mt-2 font-serif-display text-2xl leading-tight text-white sm:text-3xl">
                      {activeVideo.title}
                    </h3>
                  </div>
                  <p className="hidden rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/90 backdrop-blur sm:block">
                    {statusLabel}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={showPrevious}
                  className="absolute left-4 top-1/2 hidden -translate-y-1/2 rounded-full border border-white/20 bg-white/15 px-4 py-4 text-white shadow-lg backdrop-blur transition hover:bg-white/25 focus:outline-none focus:ring-2 focus:ring-white/80 sm:block"
                  aria-label="Previous highlight video"
                >
                  &#8592;
                </button>
                <button
                  type="button"
                  onClick={showNext}
                  className="absolute right-4 top-1/2 hidden -translate-y-1/2 rounded-full border border-white/20 bg-white/15 px-4 py-4 text-white shadow-lg backdrop-blur transition hover:bg-white/25 focus:outline-none focus:ring-2 focus:ring-white/80 sm:block"
                  aria-label="Next highlight video"
                >
                  &#8594;
                </button>
              </div>

              <div className="min-w-0 flex flex-col justify-between gap-6 p-6 sm:p-8 lg:p-10">
                <div className="space-y-4">
                  <span className="inline-flex rounded-full border border-rose-200 bg-white/80 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-rose-500">
                    Our Special Moments
                  </span>
                  <h3 className="font-serif-display text-4xl leading-tight text-stone-800">
                    {activeVideo.title}
                  </h3>
                  <p className="text-base leading-8 text-stone-600 sm:text-lg">
                    {activeVideo.subtitle}
                  </p>
                  {videoError ? (
                    <div className="space-y-3 rounded-2xl border border-rose-100 bg-rose-50 px-4 py-4 text-sm text-rose-700">
                      <p>{videoError}</p>
                      <a
                        href={activeVideo.src}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex rounded-full border border-rose-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-rose-600 transition hover:bg-rose-50"
                      >
                        Open Video Directly
                      </a>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-sm uppercase tracking-[0.24em] text-stone-400">
                        Use the native play button on the video to hear the original audio and music.
                      </p>
                      <a
                        href={activeVideo.src}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex rounded-full border border-rose-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-rose-600 transition hover:bg-rose-50"
                      >
                        Open Video Directly
                      </a>
                    </div>
                  )}
                </div>

                <div className="rounded-[1.8rem] border border-white/70 bg-white/65 p-5 shadow-[0_18px_55px_rgba(120,53,15,0.08)]">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold uppercase tracking-[0.26em] text-stone-400">
                      Browse Highlights
                    </p>
                    <p className="text-sm font-semibold uppercase tracking-[0.26em] text-rose-500">
                      {statusLabel}
                    </p>
                  </div>

                  <div
                    ref={thumbStripRef}
                    className="-mx-2 mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-2 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                  >
                    {videos.map((video, index) => (
                      <VideoThumb
                        key={video.id}
                        video={video}
                        index={index}
                        active={index === activeIndex}
                        onSelect={() => goTo(index)}
                      />
                    ))}
                  </div>

                  <div className="mt-5 flex gap-3 sm:hidden">
                    <button
                      type="button"
                      onClick={showPrevious}
                      className="rounded-full border border-rose-200 bg-white px-4 py-2 text-sm font-semibold text-stone-700"
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      onClick={showNext}
                      className="rounded-full border border-rose-200 bg-white px-4 py-2 text-sm font-semibold text-stone-700"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="px-6 py-16 text-center sm:px-10 sm:py-20">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.34em] text-rose-500">
                Highlights Ready
              </p>
              <h3 className="mt-4 font-serif-display text-4xl text-stone-800">
                Drop Your Videos Into The Highlights Folder
              </h3>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-stone-600 sm:text-lg">
                Add `.mp4`, `.mov`, or `.webm` files to `src/assets/photos/wedding/Highlights` and this section
                will automatically turn them into a premium video showcase.
              </p>
            </div>
          )}
        </div>
      </Reveal>
    </section>
  );
}

export default HighlightsSection;
