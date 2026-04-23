import SectionHeading from './SectionHeading';

function TimelineSection({ events }) {
  return (
    <section id="timeline" className="mx-auto max-w-7xl px-6 py-20 sm:px-10 sm:py-24 lg:px-12 lg:py-28">
      <SectionHeading
        eyebrow="Our Story"
        title="Moments That Quietly Became Our Forever"
        description="A graceful timeline you can edit later with your real milestones, dates, and words."
      />

      <div className="relative mt-14 sm:mt-16">
        <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-rose-200 via-rose-300 to-transparent md:left-1/2 md:-translate-x-1/2" />

        <div className="space-y-10 sm:space-y-12">
          {events.map((event, index) => {
            const isRight = index % 2 !== 0;

            return (
              <article
                key={event.id}
                className={`relative grid gap-6 md:grid-cols-2 md:gap-12 ${
                  isRight ? 'md:[&>*:first-child]:order-2' : ''
                }`}
              >
                <div className="hidden md:flex md:items-start md:justify-center">
                  <span className="mt-10 h-4 w-4 rounded-full border-4 border-rose-50 bg-rose-400 shadow-[0_0_0_10px_rgba(251,207,232,0.55)]" />
                </div>

                <div className={`${isRight ? 'md:pr-16' : 'md:pl-16'} relative`}>
                  <div className="absolute left-0 top-10 flex md:hidden">
                    <span className="ml-1 h-3.5 w-3.5 rounded-full border-4 border-rose-50 bg-rose-400 shadow-[0_0_0_8px_rgba(251,207,232,0.45)]" />
                  </div>

                  <div className="ml-10 overflow-hidden rounded-[2rem] border border-white/70 bg-white/75 p-5 shadow-[0_25px_80px_rgba(120,53,15,0.12)] backdrop-blur xl:p-6 md:ml-0">
                    <div className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
                      <div className="space-y-3 lg:space-y-4">
                        <span className="text-xs font-semibold uppercase tracking-[0.35em] text-rose-500">
                          {event.date}
                        </span>
                        <h3 className="font-serif-display text-3xl leading-tight text-stone-800">
                          {event.title}
                        </h3>
                        <p className="text-base leading-7 text-stone-600">{event.description}</p>
                      </div>
                      <div className="overflow-hidden rounded-[1.6rem] bg-rose-50">
                        <img
                          src={event.image}
                          alt={event.alt}
                          className="aspect-[4/3] w-full object-cover transition duration-700 hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default TimelineSection;
