import { useEffect } from 'react';

function Lightbox({ item, onClose, onPrevious, onNext }) {
  useEffect(() => {
    if (!item) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }

      if (event.key === 'ArrowLeft') {
        onPrevious();
      }

      if (event.key === 'ArrowRight') {
        onNext();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, onClose, onPrevious, onNext]);

  if (!item) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/85 px-4 py-6 backdrop-blur-xl sm:px-6 sm:py-8"
      role="dialog"
      aria-modal="true"
      aria-label={item.caption}
      onClick={onClose}
    >
      <div
        className="animate-modal-in relative max-h-full w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/12 bg-white/10 shadow-[0_40px_120px_rgba(15,23,42,0.55)]"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 rounded-full bg-white/85 px-3 py-2 text-sm font-semibold text-stone-700 transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-rose-300"
          aria-label="Close image preview"
        >
          Close
        </button>

        <button
          type="button"
          onClick={onPrevious}
          className="absolute left-3 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-white/85 px-3 py-3 text-stone-700 shadow-lg transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-rose-300 sm:block"
          aria-label="Previous image"
        >
          &#8592;
        </button>

        <button
          type="button"
          onClick={onNext}
          className="absolute right-3 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-white/85 px-3 py-3 text-stone-700 shadow-lg transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-rose-300 sm:block"
          aria-label="Next image"
        >
          &#8594;
        </button>

        <div className="grid max-h-[88vh] lg:grid-cols-[1.2fr_0.8fr]">
          <div className="relative bg-stone-950">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_45%)]" />
            <img
              src={item.image}
              alt={item.alt}
              className="max-h-[62vh] w-full object-contain sm:max-h-[68vh] lg:max-h-[88vh]"
            />
          </div>

          <div className="flex flex-col justify-center gap-5 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(255,241,242,0.96))] p-6 sm:p-8 lg:p-10">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-rose-500">
                {item.category}
              </p>
              <h3 className="font-serif-display text-3xl leading-tight text-stone-800 sm:text-4xl">
                {item.caption}
              </h3>
            </div>
            <p className="text-base leading-8 text-stone-600">{item.description}</p>
            <div className="flex gap-3 pt-4 sm:hidden">
              <button
                type="button"
                onClick={onPrevious}
                className="rounded-full border border-rose-200 bg-white px-4 py-2 text-sm font-semibold text-stone-700"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={onNext}
                className="rounded-full border border-rose-200 bg-white px-4 py-2 text-sm font-semibold text-stone-700"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Lightbox;
