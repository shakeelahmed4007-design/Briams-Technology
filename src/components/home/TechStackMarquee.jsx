import {
  SiReact,
  SiNodedotjs,
  SiTypescript,
  SiPostgresql,
  SiDocker,
  SiKubernetes,
  SiGraphql,
  SiPython,
  SiRedis,
  SiTerraform,
  SiFigma,
  SiTailwindcss,
  SiNextdotjs,
  SiVite,
} from "react-icons/si";
import { FaAws } from "react-icons/fa6";

const TECH_ITEMS = [
  { name: "React", Icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", Icon: SiNextdotjs, color: "#0E1B33" },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { name: "Node.js", Icon: SiNodedotjs, color: "#5FA04E" },
  { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1" },
  { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#06B6D4" },
  { name: "AWS", Icon: FaAws, color: "#FF9900" },
  { name: "Docker", Icon: SiDocker, color: "#2496ED" },
  { name: "Kubernetes", Icon: SiKubernetes, color: "#326CE5" },
  { name: "GraphQL", Icon: SiGraphql, color: "#E10098" },
  { name: "Python", Icon: SiPython, color: "#3776AB" },
  { name: "Redis", Icon: SiRedis, color: "#FF4438" },
  { name: "Terraform", Icon: SiTerraform, color: "#844FBA" },
  { name: "Figma", Icon: SiFigma, color: "#F24E1E" },
  { name: "Vite", Icon: SiVite, color: "#646CFF" },
];

export default function TechStackMarquee() {
  const items = [...TECH_ITEMS, ...TECH_ITEMS];

  return (
    <section className="py-24 overflow-hidden bg-bg border-y border-card-border relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-briams-blue/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-section mb-14 relative z-10">
        <div className="text-center">
          <span className="inline-block font-mono text-xs uppercase tracking-[0.2em] text-briams-blue font-semibold mb-4 bg-briams-blue/10 border border-briams-blue/20 px-3 py-1.5 rounded-full">
            Tech Stack
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-text-primary tracking-tight">
            The tools we use to build.
          </h2>
          <p className="mt-4 text-text-secondary text-base max-w-xl mx-auto font-medium">
            Enterprise-grade technologies engineered for high availability, security, and performance.
          </p>
        </div>
      </div>

      <div className="relative flex overflow-hidden py-4">
        {/* Marquee Track */}
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused] gap-5 pl-5">
          {items.map((item, i) => {
            const IconComponent = item.Icon;
            return (
              <div
                key={i}
                className="flex items-center gap-3.5 px-6 py-4 rounded-2xl bg-surface text-text-primary shadow-sm border border-card-border text-sm font-mono font-bold whitespace-nowrap hover:border-briams-blue/40 hover:-translate-y-1 transition-all duration-300 cursor-default group"
              >
                <IconComponent
                  size={22}
                  style={{ color: item.color }}
                  className="transition-transform duration-300 group-hover:scale-125 shrink-0"
                />
                <span className="text-text-primary group-hover:text-briams-blue transition-colors">
                  {item.name}
                </span>
              </div>
            );
          })}
        </div>

        {/* Fades for smooth edge gradient blending */}
        <div className="absolute top-0 left-0 w-36 h-full bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-36 h-full bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
}
