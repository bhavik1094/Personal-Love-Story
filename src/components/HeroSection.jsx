import { useEffect, useState } from 'react';

function HeroSection({ hero }) {
  const slides = hero.backgroundSlides?.length ? hero.backgroundSlides : [{ image: hero.image, alt: hero.featuredAlt }];
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, [slides.length]);

  return (
    <header className="relative isolate flex min-h-screen items-end overflow-hidden">
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id ?? slide.image}
            className={`absolute inset-0 transition-opacity duration-[1800ms] ease-out ${
              index === activeSlide ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            aria-hidden="true"
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,24,39,0.14),rgba(17,24,39,0.76))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,244,246,0.45),_transparent_34%),linear-gradient(130deg,_rgba(255,255,255,0.12),_transparent_42%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.08),transparent_24%,rgba(15,23,42,0.18)_62%,rgba(15,23,42,0.58)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-rose-50 via-rose-50/50 to-transparent" />

      <nav className="absolute inset-x-0 top-0 z-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-10 lg:px-12">
          <a
            href="#top"
            className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.35em] text-white/90 backdrop-blur-md"
          >
            Me & My Lifeline
          </a>
          <div className="hidden items-center gap-3 rounded-full border border-white/15 bg-white/10 px-2 py-2 text-xs font-medium text-white/85 backdrop-blur-md sm:flex">
            <a className="rounded-full px-4 py-2 transition hover:bg-white/10" href="#love-note">
              Love Note
            </a>
            <a className="rounded-full px-4 py-2 transition hover:bg-white/10" href="#timeline">
              Timeline
            </a>
            <a className="rounded-full px-4 py-2 transition hover:bg-white/10" href="#gallery">
              Gallery
            </a>
          </div>
        </div>
      </nav>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col px-6 pb-14 pt-32 sm:px-10 sm:pb-16 lg:px-12 lg:pb-24">
        <div className="grid items-end gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          <div className="max-w-3xl rounded-[2.25rem] border border-white/20 bg-white/10 p-7 text-left shadow-[0_35px_120px_rgba(15,23,42,0.35)] backdrop-blur-md animate-fade-up sm:p-10 lg:p-12">
            <span className="mb-5 inline-flex rounded-full border border-white/35 bg-white/10 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.35em] text-rose-100">
              A Love Story Made For Her
            </span>
            <h1 className="font-serif-display text-5xl leading-[0.96] text-white sm:text-6xl lg:text-7xl">
              {hero.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-rose-50/90 sm:text-lg">
              {hero.subtitle}
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a
                href="#love-note"
                className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-semibold tracking-[0.2em] text-rose-700 transition duration-300 hover:-translate-y-0.5 hover:bg-rose-100 focus:outline-none focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-rose-900"
              >
                {hero.ctaLabel}
              </a>
              <a
                href="#gallery"
                className="inline-flex items-center justify-center rounded-full border border-white/40 bg-white/10 px-7 py-3 text-sm font-semibold tracking-[0.2em] text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-rose-900"
              >
                See Our Memories
              </a>
            </div>

            {slides.length > 1 ? (
              <div className="mt-7 flex items-center gap-2">
                {slides.map((slide, index) => (
                  <button
                    key={slide.id ?? slide.image}
                    type="button"
                    onClick={() => setActiveSlide(index)}
                    className={`h-2.5 rounded-full transition-all ${
                      index === activeSlide ? 'w-8 bg-white' : 'w-2.5 bg-white/45 hover:bg-white/70'
                    }`}
                    aria-label={`Show hero memory ${index + 1}`}
                  />
                ))}
              </div>
            ) : null}
          </div>

          <div className="animate-fade-soft-delay lg:justify-self-end">
            <div className="mx-auto max-w-sm rounded-[2rem] border border-white/20 bg-white/12 p-4 shadow-[0_35px_120px_rgba(15,23,42,0.28)] backdrop-blur-md sm:p-5">
              <div className="overflow-hidden rounded-[1.6rem]">
                <img
                  src={hero.featuredImage}
                  alt={hero.featuredAlt}
                  className="aspect-[4/5] w-full object-cover transition duration-700 hover:scale-[1.02]"
                />
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {hero.details.map((detail) => (
                  <div
                    key={detail.label}
                    className="rounded-[1.35rem] border border-white/15 bg-black/10 px-4 py-4 text-white/90"
                  >
                    <p className="text-[0.65rem] uppercase tracking-[0.28em] text-rose-100/70">
                      {detail.label}
                    </p>
                    <p className="mt-2 font-serif-display text-2xl leading-none text-white">
                      {detail.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeroSection;
