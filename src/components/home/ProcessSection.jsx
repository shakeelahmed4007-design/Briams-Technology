import { motion } from "framer-motion";
import { Search, Layers, Code2, Rocket, TrendingUp, CheckCircle2 } from "lucide-react";
import { PROCESS } from "../../data/content";
import SectionTitle from "../ui/SectionTitle";

const STEP_STYLES = [
  {
    icon: Search,
    phase: "Phase 01",
    gradient: "from-orange-500/15 via-amber-500/5 to-white",
    nodeBg: "bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-[0_0_20px_rgba(249,115,22,0.4)]",
    titleHover: "group-hover:text-orange-600",
    borderHover: "hover:border-orange-500/50 hover:shadow-[0_12px_30px_rgba(249,115,22,0.18)]",
    badge: "bg-orange-500/10 text-orange-600 border-orange-500/25",
    iconColor: "text-orange-600",
  },
  {
    icon: Layers,
    phase: "Phase 02",
    gradient: "from-blue-500/15 via-cyan-500/5 to-white",
    nodeBg: "bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]",
    titleHover: "group-hover:text-blue-600",
    borderHover: "hover:border-blue-500/50 hover:shadow-[0_12px_30px_rgba(37,99,235,0.18)]",
    badge: "bg-blue-500/10 text-blue-600 border-blue-500/25",
    iconColor: "text-blue-600",
  },
  {
    icon: Code2,
    phase: "Phase 03",
    gradient: "from-emerald-500/15 via-teal-500/5 to-white",
    nodeBg: "bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]",
    titleHover: "group-hover:text-emerald-600",
    borderHover: "hover:border-emerald-500/50 hover:shadow-[0_12px_30px_rgba(16,185,129,0.18)]",
    badge: "bg-emerald-500/10 text-emerald-600 border-emerald-500/25",
    iconColor: "text-emerald-600",
  },
  {
    icon: Rocket,
    phase: "Phase 04",
    gradient: "from-purple-500/15 via-pink-500/5 to-white",
    nodeBg: "bg-gradient-to-br from-purple-600 to-pink-500 text-white shadow-[0_0_20px_rgba(147,51,234,0.4)]",
    titleHover: "group-hover:text-purple-600",
    borderHover: "hover:border-purple-500/50 hover:shadow-[0_12px_30px_rgba(147,51,234,0.18)]",
    badge: "bg-purple-500/10 text-purple-600 border-purple-500/25",
    iconColor: "text-purple-600",
  },
  {
    icon: TrendingUp,
    phase: "Phase 05",
    gradient: "from-amber-500/15 via-cyan-500/5 to-white",
    nodeBg: "bg-gradient-to-br from-amber-500 to-cyan-500 text-white shadow-[0_0_20px_rgba(245,158,11,0.4)]",
    titleHover: "group-hover:text-amber-600",
    borderHover: "hover:border-amber-500/50 hover:shadow-[0_12px_30px_rgba(245,158,11,0.18)]",
    badge: "bg-amber-500/10 text-amber-600 border-amber-500/25",
    iconColor: "text-amber-600",
  },
];

export default function ProcessSection() {
  return (
    <section id="process" className="section-padding bg-surface border-y border-card-border overflow-hidden relative">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-briams-orange/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-[500px] h-[500px] bg-briams-blue/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container-section relative z-10">
        <SectionTitle
          eyebrow="Our Process"
          title={
            <>
              How we <span className="text-gradient-cta font-extrabold">deliver.</span>
            </>
          }
          description="We do not write a single line of code until the architecture is proven and the constraints are understood."
        />

        <div className="mt-20 relative max-w-4xl mx-auto">
          {/* Glowing Gradient Timeline Line */}
          <div
            className="absolute left-[27px] md:left-1/2 top-4 bottom-4 w-1 rounded-full md:-translate-x-1/2 opacity-70"
            style={{
              background:
                "linear-gradient(to bottom, #f97316, #3b82f6, #10b981, #a855f7, #f59e0b)",
            }}
          />

          <div className="space-y-16">
            {PROCESS.map((step, i) => {
              const isEven = i % 2 === 0;
              const style = STEP_STYLES[i % STEP_STYLES.length];
              const IconComponent = style.icon;

              return (
                <div
                  key={step.title}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  } gap-8 md:gap-0`}
                >
                  {/* Timeline Glowing Node */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + i * 0.1, type: "spring", stiffness: 350, damping: 20 }}
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    className={`absolute left-0 md:left-1/2 top-0 -translate-x-0 md:-translate-x-1/2 w-14 h-14 rounded-2xl ${style.nodeBg} flex flex-col items-center justify-center z-20 cursor-pointer`}
                  >
                    <span className="font-mono font-extrabold text-base tracking-tight leading-none">
                      {step.step}
                    </span>
                  </motion.div>

                  {/* Content Box with Alternating Spring Sliding Animation */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -70 : 70 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 24,
                      delay: i * 0.1,
                    }}
                    className={`ml-20 md:ml-0 w-full md:w-1/2 ${
                      isEven ? "md:pr-14" : "md:pl-14"
                    }`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.03, y: -4 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      className={`glass p-8 group border border-card-border ${style.borderHover} transition-all duration-300 bg-gradient-to-br ${style.gradient} shadow-sm rounded-3xl relative overflow-hidden cursor-pointer`}
                    >
                      {/* Top Header Row with Icon & Phase Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-extrabold uppercase tracking-wider border ${style.badge}`}>
                          <IconComponent size={14} className={style.iconColor} />
                          {style.phase}
                        </span>
                        <CheckCircle2 size={18} className="text-text-muted/40 group-hover:text-emerald-500 transition-colors" />
                      </div>

                      <h3 className={`text-2xl font-bold text-text-primary tracking-tight ${style.titleHover} transition-colors font-display`}>
                        {step.title}
                      </h3>
                      
                      <p className="mt-3 text-[15px] font-medium text-text-secondary leading-relaxed">
                        {step.description}
                      </p>
                    </motion.div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
