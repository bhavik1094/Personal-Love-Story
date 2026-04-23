import Reveal from './Reveal';

const rotations = [
  'sm:rotate-[-1.2deg]',
  'sm:rotate-[0.9deg]',
  'sm:rotate-[-0.6deg]',
  'sm:rotate-[1.15deg]',
  'sm:rotate-[-0.8deg]',
];

function GalleryItem({ item, index, onOpen }) {
  const rotation = rotations[index % rotations.length];

  return (
    <Reveal className="mb-6 break-inside-avoid" delay={(index % 6) * 55}>
      <button
        type="button"
        onClick={() => onOpen(item)}
        className={`memory-card group block w-full overflow-hidden rounded-[1.8rem] border border-white/70 bg-white/80 text-left shadow-[0_18px_55px_rgba(120,53,15,0.12)] transition duration-500 hover:z-10 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_30px_80px_rgba(120,53,15,0.18)] focus:outline-none focus:ring-2 focus:ring-rose-300 ${rotation}`}
      >
        <div className="relative overflow-hidden bg-rose-50">
          <img
            src={item.image}
            alt={item.alt}
            loading="lazy"
            className="h-auto w-full object-cover transition duration-700 group-hover:scale-[1.05]"
          />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_10%,rgba(28,25,23,0.05)_50%,rgba(28,25,23,0.72)_100%)] opacity-70 transition duration-500 group-hover:opacity-100" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-3 px-5 pb-5 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-rose-100/90">
              {item.category}
            </p>
            <p className="mt-2 font-serif-display text-2xl leading-tight text-white">
              {item.caption}
            </p>
          </div>
        </div>
      </button>
    </Reveal>
  );
}

export default GalleryItem;
