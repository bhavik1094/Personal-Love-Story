import { useState } from 'react';
import SectionHeading from './SectionHeading';

function FinalSurpriseSection({ message }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10 sm:py-24 lg:px-12 lg:py-28">
      <div className="overflow-hidden rounded-[2.75rem] border border-white/60 bg-[linear-gradient(135deg,rgba(255,255,255,0.72),rgba(255,241,242,0.92),rgba(252,231,243,0.8))] p-8 shadow-[0_35px_120px_rgba(120,53,15,0.16)] backdrop-blur-xl sm:p-12">
        <SectionHeading
          eyebrow="Final Surprise"
          title={message.title}
          description={message.teaser}
        />

        <div className="mt-10 flex flex-col items-center">
          <button
            type="button"
            onClick={() => setRevealed((current) => !current)}
            className="rounded-full bg-stone-900 px-8 py-4 text-sm font-semibold uppercase tracking-[0.25em] text-white transition duration-300 hover:-translate-y-0.5 hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-rose-300"
          >
            {revealed ? 'Hide The Message' : message.buttonLabel}
          </button>

          <div
            className={`grid transition-all duration-700 ease-out ${
              revealed ? 'mt-10 grid-rows-[1fr] opacity-100' : 'mt-0 grid-rows-[0fr] opacity-0'
            }`}
          >
            <div className="overflow-hidden">
              <div className="mx-auto max-w-3xl rounded-[2rem] border border-white/70 bg-white/72 p-8 text-center shadow-[0_24px_70px_rgba(120,53,15,0.12)] sm:p-10">
                <p className="font-serif-display text-3xl leading-tight text-stone-800 sm:text-4xl">
                  {message.reveal}
                </p>
                <p className="mt-6 text-base leading-8 text-stone-600 sm:text-lg">
                  {message.closing}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FinalSurpriseSection;
