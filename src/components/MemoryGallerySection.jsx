import SectionHeading from './SectionHeading';
import MemorySection from './MemorySection';
import Reveal from './Reveal';

function MemoryGallerySection({ chapters, featuredMemory, onOpen }) {
  return (
    <section id="gallery" className="mx-auto max-w-7xl px-6 py-20 sm:px-10 sm:py-24 lg:px-12 lg:py-28">
      <SectionHeading
        eyebrow="Memory Chapters"
        title="A Journey Told Through The Moments We Kept"
        description="Not just a gallery, but the little chapters that became our story. Every section below is meant to feel like a memory unfolding as you scroll."
      />

      {featuredMemory ? (
        <Reveal className="mt-14 sm:mt-16">
          <article className="overflow-hidden rounded-[2.4rem] border border-white/70 bg-white/70 shadow-[0_35px_100px_rgba(120,53,15,0.14)] backdrop-blur-xl">
            <button
              type="button"
              onClick={() => onOpen(featuredMemory)}
              className="group block w-full text-left focus:outline-none focus:ring-2 focus:ring-inset focus:ring-rose-300"
            >
              <div className="grid lg:grid-cols-[1.12fr_0.88fr]">
                <div className="relative min-h-[20rem] overflow-hidden bg-stone-900 sm:min-h-[28rem]">
                  <img
                    src={featuredMemory.image}
                    alt={featuredMemory.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.06),rgba(0,0,0,0.12)_38%,rgba(0,0,0,0.5)_100%)]" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-rose-100/90">
                      Featured Memory
                    </p>
                    <h3 className="mt-3 max-w-xl font-serif-display text-3xl leading-tight text-white sm:text-4xl">
                      {featuredMemory.featuredTitle}
                    </h3>
                  </div>
                </div>

                <div className="flex flex-col justify-center gap-6 p-7 sm:p-10">
                  <span className="inline-flex w-fit rounded-full border border-rose-200 bg-rose-50 px-4 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-rose-500">
                    {featuredMemory.category}
                  </span>
                  <div className="space-y-4">
                    <h3 className="font-serif-display text-4xl leading-tight text-stone-800">
                      {featuredMemory.caption}
                    </h3>
                    <p className="text-base leading-8 text-stone-600 sm:text-lg">
                      {featuredMemory.featuredDescription}
                    </p>
                  </div>
                  <p className="text-sm uppercase tracking-[0.26em] text-stone-400">
                    Tap to open this memory
                  </p>
                </div>
              </div>
            </button>
          </article>
        </Reveal>
      ) : null}

      <div className="mt-10 sm:mt-14">
        {chapters.map((chapter, index) => (
          <MemorySection
            key={chapter.key}
            chapter={chapter}
            index={index}
            onOpen={onOpen}
          />
        ))}
      </div>
    </section>
  );
}

export default MemoryGallerySection;
