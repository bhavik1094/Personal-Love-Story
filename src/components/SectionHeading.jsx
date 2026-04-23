function SectionHeading({ eyebrow, title, description, align = 'center' }) {
  const alignment =
    align === 'left' ? 'items-start text-left' : 'items-center text-center';

  return (
    <div className={`mx-auto flex max-w-3xl flex-col gap-4 ${alignment}`}>
      {eyebrow ? (
        <span className="inline-flex rounded-full border border-white/60 bg-white/60 px-4 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.35em] text-rose-500 shadow-[0_10px_30px_rgba(190,24,93,0.08)] backdrop-blur">
          {eyebrow}
        </span>
      ) : null}
      <div className="space-y-4">
        <h2 className="font-serif-display text-4xl text-stone-800 sm:text-5xl">
          {title}
        </h2>
        {description ? (
          <p className="text-base leading-8 text-stone-600 sm:text-lg">{description}</p>
        ) : null}
      </div>
    </div>
  );
}

export default SectionHeading;
