import { CLIENTS } from "../../data/content";

export default function ClientsStrip() {
  const doubled = [...CLIENTS, ...CLIENTS];

  return (
    <section className="py-12 border-b border-card-border bg-briams-navy overflow-hidden">
      <div className="container-section text-center mb-6">
        <p className="text-xs font-mono uppercase tracking-widest text-white/50 font-semibold">
          Trusted by operators at
        </p>
      </div>
      <div className="relative flex overflow-hidden">
        <div className="flex w-fit animate-marquee hover:[animation-play-state:paused] gap-12 sm:gap-20 pl-12 sm:pl-20 items-center">
          {doubled.map((name, i) => (
            <span
              key={i}
              className="text-2xl font-display font-semibold text-white whitespace-nowrap hover:text-briams-gold transition-colors duration-300 cursor-default"
            >
              {name}
            </span>
          ))}
        </div>
        <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-briams-navy to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-briams-navy to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
}
