import { motion } from "framer-motion";
import { fadeUp, slideRight, viewportOnce } from "../../animations/variants";
import { PROCESS } from "../../data/content";
import SectionTitle from "../ui/SectionTitle";

export default function ProcessSection() {
  return (
    <section id="process" className="section-padding bg-surface border-y border-card-border overflow-hidden">
      <div className="container-section">
        <SectionTitle
          eyebrow="Our Process"
          title="How we deliver"
          description="We do not write a single line of code until the architecture is proven and the constraints are understood."
        />

        <div className="mt-20 relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-px bg-card-border md:-translate-x-1/2" />

          <div className="space-y-16">
            {PROCESS.map((step, i) => {
              const isEven = i % 2 === 0;

              return (
                <div
                  key={step.title}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  } gap-8 md:gap-0`}
                >
                  {/* Timeline Node */}
                  <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={viewportOnce}
                    className="absolute left-0 md:left-1/2 top-0 -translate-x-0 md:-translate-x-1/2 w-14 h-14 rounded-2xl glass bg-white border-card-border flex items-center justify-center z-10 shadow-sm text-briams-orange font-mono font-bold text-lg"
                  >
                    {step.step}
                  </motion.div>

                  {/* Content Box */}
                  <motion.div
                    variants={slideRight}
                    custom={isEven ? 1 : -1}
                    initial="hidden"
                    whileInView="show"
                    viewport={viewportOnce}
                    className={`ml-20 md:ml-0 w-full md:w-1/2 ${
                      isEven ? "md:pr-16" : "md:pl-16"
                    }`}
                  >
                    <div className="glass p-8 group border-transparent hover:border-briams-blue/30 transition-all duration-300 bg-white shadow-sm rounded-2xl">
                      <h3 className="text-2xl font-bold text-text-primary tracking-tight group-hover:text-briams-blue transition-colors">
                        {step.title}
                      </h3>
                      <p className="mt-3 text-[15px] font-medium text-text-secondary leading-relaxed">
                        {step.description}
                      </p>
                    </div>
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
