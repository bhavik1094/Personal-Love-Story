import { useState } from 'react';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

function MemoryRevealSection({ items, onOpen }) {
  const [revealedId, setRevealedId] = useState(null);

  if (!items?.length) {
    return null;
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10 sm:py-24 lg:px-12 lg:py-28">
      <SectionHeading
        eyebrow="Unlock Our Memories"
        title="A Few More Moments Hidden In Plain Sight"
        description="A softer little pause in the story. Tap a card and let another memory unfold."
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {items.map((item, index) => {
          const revealed = revealedId === item.id;

          return (
            <Reveal key={item.id} className="h-full" delay={index * 90}>
              <article className="h-full overflow-hidden rounded-[2rem] border border-white/65 bg-white/75 shadow-[0_24px_70px_rgba(120,53,15,0.12)] backdrop-blur-xl">
                <button
                  type="button"
                  onClick={() => setRevealedId(revealed ? null : item.id)}
                  className="group block h-full w-full text-left focus:outline-none focus:ring-2 focus:ring-inset focus:ring-rose-300"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-stone-200">
                    <img
                      src={item.image}
                      alt={item.alt}
                      loading="lazy"
                      className={`h-full w-full object-cover transition duration-700 ${revealed ? 'scale-100' : 'scale-[1.08] blur-[1px]'}`}
                    />
                    <div
                      className={`absolute inset-0 transition duration-500 ${
                        revealed
                          ? 'bg-[linear-gradient(180deg,rgba(0,0,0,0.04),rgba(0,0,0,0.28))]'
                          : 'bg-[linear-gradient(180deg,rgba(17,24,39,0.25),rgba(17,24,39,0.68))]'
                      }`}
                    />
                    <div className="absolute inset-0 flex items-center justify-center p-6">
                      <div
                        className={`max-w-[16rem] rounded-[1.5rem] border border-white/25 bg-white/12 px-5 py-4 text-center text-white shadow-[0_20px_50px_rgba(15,23,42,0.24)] backdrop-blur-md transition duration-500 ${
                          revealed ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                        }`}
                      >
                        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-rose-100/90">
                          Tap To Reveal
                        </p>
                        <p className="mt-3 font-serif-display text-2xl leading-tight">
                          Hidden Memory
                        </p>
                      </div>
                    </div>
                    <div
                      className={`absolute inset-x-0 bottom-0 p-6 transition duration-500 ${
                        revealed ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                      }`}
                    >
                      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.34em] text-rose-100/80">
                        Revealed
                      </p>
                      <h3 className="mt-3 font-serif-display text-2xl leading-tight text-white">
                        {item.caption}
                      </h3>
                    </div>
                  </div>
                </button>

                <div className="flex items-center justify-between gap-4 px-5 py-4">
                  <p className="text-sm leading-6 text-stone-500">
                    {revealed ? 'This one deserves a closer look.' : 'One more soft chapter waiting for you.'}
                  </p>
                  <button
                    type="button"
                    onClick={() => onOpen(item)}
                    className="rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-rose-600 transition hover:bg-rose-100 focus:outline-none focus:ring-2 focus:ring-rose-300"
                  >
                    Open
                  </button>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

export default MemoryRevealSection;
