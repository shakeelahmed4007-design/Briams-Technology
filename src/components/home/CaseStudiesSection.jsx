import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { fadeUp, viewportOnce } from "../../animations/variants";
import { CASE_STUDIES } from "../../data/content";
import SectionTitle from "../ui/SectionTitle";
import GlassCard from "../ui/GlassCard";

export default function CaseStudiesSection() {
  const featuredWork = CASE_STUDIES.slice(0, 2);

  return (
    <section className="section-padding bg-bg border-y border-card-border relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-briams-cyan/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="container-section relative z-10">
        <SectionTitle
          eyebrow="Case Studies"
          title="Architecture that scaled"
          description="A look at how we've solved complex engineering problems for high-growth companies."
        />

        <div className="mt-16 grid md:grid-cols-2 gap-8">
          {featuredWork.map((work, i) => (
            <motion.div
              key={work.id}
              variants={fadeUp}
              custom={i * 0.1}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
            >
              <Link to={`/work`} className="block h-full group">
                <GlassCard className="p-8 h-full flex flex-col justify-between overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-briams-blue/5 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform duration-500" />
                  
                  <div>
                    <div className="flex items-center gap-4 mb-6 text-sm font-mono tracking-wider font-semibold">
                      <span className="text-briams-orange uppercase font-bold">{work.client}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-briams-orange/40" />
                      <span className="text-briams-blue uppercase font-bold">{work.industry}</span>
                    </div>

                    <h3 className="text-2xl font-bold text-text-primary tracking-tight group-hover:text-briams-blue transition-colors duration-300">
                      {work.title}
                    </h3>
                    
                    <p className="mt-4 text-[15px] text-text-secondary leading-relaxed font-medium">
                      {work.description}
                    </p>

                    <div className="mt-8 flex flex-wrap gap-2">
                      {work.tag.split(' · ').map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full border border-card-border bg-surface text-text-secondary text-xs font-mono uppercase tracking-wider font-bold transition-colors group-hover:border-briams-blue/30 group-hover:text-briams-blue"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-10 pt-6 border-t border-card-border flex items-center justify-between text-briams-orange font-bold group-hover:text-briams-blue transition-colors">
                    <span className="group-hover:translate-x-1 transition-transform duration-300">Read case study</span>
                    <ArrowUpRight
                      size={20}
                      className="group-hover:rotate-45 transition-transform duration-300"
                    />
                  </div>
                </GlassCard>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
