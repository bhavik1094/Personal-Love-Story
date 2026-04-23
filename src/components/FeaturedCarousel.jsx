import { useRef } from 'react';
import SectionHeading from './SectionHeading';

function FeaturedCarousel({ items, onOpen }) {
  const scrollerRef = useRef(null);

  const scrollByAmount = (direction) => {
    if (!scrollerRef.current) {
      return;
    }

    const amount = direction === 'next' ? 380 : -380;
    scrollerRef.current.scrollBy({ left: amount, behavior: 'smooth' });
  };

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10 sm:py-24 lg:px-12 lg:py-28">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow="Favorite Moments"
          title="The Memories I Replay The Most"
          description="A featured ribbon of moments that deserve an extra spotlight."
          align="left"
        />

        <div className="flex gap-3 self-start lg:self-auto">
          <button
            type="button"
            onClick={() => scrollByAmount('prev')}
            className="rounded-full border border-white/70 bg-white/75 px-4 py-3 text-sm font-semibold text-stone-700 shadow-[0_16px_35px_rgba(120,53,15,0.1)] transition hover:-translate-y-0.5 hover:bg-white focus:outline-none focus:ring-2 focus:ring-rose-300"
            aria-label="Scroll memories left"
          >
            &#8592;
          </button>
          <button
            type="button"
            onClick={() => scrollByAmount('next')}
            className="rounded-full border border-white/70 bg-white/75 px-4 py-3 text-sm font-semibold text-stone-700 shadow-[0_16px_35px_rgba(120,53,15,0.1)] transition hover:-translate-y-0.5 hover:bg-white focus:outline-none focus:ring-2 focus:ring-rose-300"
            aria-label="Scroll memories right"
          >
            &#8594;
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => (
          <article
            key={item.id}
            className="group min-w-[88%] snap-center overflow-hidden rounded-[2rem] border border-white/60 bg-white/80 shadow-[0_25px_75px_rgba(120,53,15,0.14)] backdrop-blur sm:min-w-[30rem] lg:min-w-[34rem]"
          >
            <button
              type="button"
              onClick={() => onOpen(item)}
              className="block w-full text-left focus:outline-none focus:ring-2 focus:ring-inset focus:ring-rose-300"
            >
              <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
                <div className="overflow-hidden bg-rose-50">
                  <img
                    src={item.image}
                    alt={item.alt}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-[1.06] lg:h-full lg:aspect-auto"
                  />
                </div>
                <div className="flex flex-col justify-between gap-6 p-6 sm:p-8">
                  <div className="space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-rose-500">
                      Featured Memory
                    </p>
                    <h3 className="font-serif-display text-3xl leading-tight text-stone-800">
                      {item.caption}
                    </h3>
                    <p className="text-sm leading-7 text-stone-600 sm:text-base">{item.description}</p>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm uppercase tracking-[0.25em] text-stone-400">
                      Tap to view larger
                    </p>
                    <span className="rounded-full border border-rose-100 bg-rose-50 px-3 py-2 text-[0.64rem] font-semibold uppercase tracking-[0.28em] text-rose-500">
                      {item.category}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

export default FeaturedCarousel;
