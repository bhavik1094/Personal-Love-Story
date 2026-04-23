import GalleryItem from './GalleryItem';
import Reveal from './Reveal';

function MemorySection({ chapter, onOpen, index }) {
  return (
    <section
      className="relative py-14 sm:py-16 lg:py-20"
      style={{ contentVisibility: 'auto', containIntrinsicSize: '1px 1200px' }}
    >
      <Reveal className="mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-4 text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-rose-500">
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-rose-300" />
          Chapter {String(index + 1).padStart(2, '0')}
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-rose-300" />
        </span>
        <h3 className="mt-4 font-serif-display text-4xl leading-tight text-stone-800 sm:text-5xl">
          {chapter.title}
        </h3>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-stone-600 sm:text-lg">
          {chapter.subtitle}
        </p>
      </Reveal>

      <div className="pointer-events-none mx-auto mt-8 flex max-w-4xl items-center gap-4 px-6 sm:px-0">
        <span className="h-px flex-1 bg-gradient-to-r from-transparent via-rose-200 to-rose-300/80" />
        <span className="font-serif-display text-2xl text-rose-300">*</span>
        <span className="h-px flex-1 bg-gradient-to-l from-transparent via-rose-200 to-rose-300/80" />
      </div>

      <div className="mt-10 columns-1 gap-6 sm:columns-2 xl:columns-3">
        {chapter.items.map((item, itemIndex) => (
          <GalleryItem
            key={item.id}
            item={item}
            index={itemIndex}
            onOpen={onOpen}
          />
        ))}
      </div>
    </section>
  );
}

export default MemorySection;
