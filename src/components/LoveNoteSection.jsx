import SectionHeading from './SectionHeading';
import TypewriterText from './TypewriterText';

function LoveNoteSection({ note }) {
  return (
    <section id="love-note" className="mx-auto max-w-7xl px-6 py-20 sm:px-10 sm:py-24 lg:px-12 lg:py-28">
      <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-14">
        <div className="space-y-6">
          <SectionHeading eyebrow="Love Note" title={note.title} description={note.intro} align="left" />
          <div className="flex items-center gap-4 text-rose-400">
            <span className="h-px flex-1 bg-gradient-to-r from-rose-300/10 via-rose-400/50 to-transparent" />
            <span className="font-serif-display text-2xl text-stone-700">For my wife</span>
            <span className="h-px flex-1 bg-gradient-to-l from-rose-300/10 via-rose-400/50 to-transparent" />
          </div>
        </div>

        <article className="relative overflow-hidden rounded-[2.25rem] border border-white/65 bg-white/75 p-8 shadow-[0_28px_90px_rgba(120,53,15,0.12)] backdrop-blur-xl sm:p-10 lg:p-12">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top,_rgba(251,207,232,0.45),_transparent_70%)]" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-40 bg-[radial-gradient(circle_at_center,_rgba(251,191,200,0.18),_transparent_72%)]" />

          <div className="relative">
            <p className="font-serif-display text-3xl leading-tight text-stone-800 sm:text-4xl lg:text-[2.65rem]">
              "
              <TypewriterText key={note.typedLine ?? note.highlight} text={note.typedLine ?? note.highlight} />
              "
            </p>
            <div className="mt-8 space-y-5 text-base leading-8 text-stone-600 sm:text-lg">
              {note.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <p className="mt-10 text-sm uppercase tracking-[0.35em] text-rose-500">
              {/* Replace this closing line with your personal signature if you want */}
              Forever yours, Bhavik
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}

export default LoveNoteSection;
