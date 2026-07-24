import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { fadeUp, viewportOnce } from "../animations/variants";
import { CASE_STUDIES } from "../data/content";
import GlassCard from "../components/ui/GlassCard";
import CTASection from "../components/home/CTASection";

export default function Work() {
  return (
    <>
      <Helmet>
        <title>Work — Briams Technologies</title>
        <meta
          name="description"
          content="Explore our portfolio of enterprise software, ERP implementations, and technical consultancy projects."
        />
      </Helmet>

      <section className="pt-40 pb-16 relative bg-bg text-center flex flex-col items-center">
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-briams-cyan/5 rounded-full blur-[150px] pointer-events-none" />
        
        <div className="container-section max-w-3xl relative z-10">
          <motion.span
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="inline-block font-mono text-xs uppercase tracking-[0.2em] text-briams-cyan mb-6 font-semibold bg-briams-cyan/10 border border-briams-cyan/20 px-3 py-1.5 rounded-full"
          >
            Selected Work
          </motion.span>
          <motion.h1
            variants={fadeUp}
            custom={0.08}
            initial="hidden"
            animate="show"
            className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold tracking-tight leading-[1.05] text-text-primary"
          >
            Engineering that drives revenue.
          </motion.h1>
          <motion.p
            variants={fadeUp}
            custom={0.16}
            initial="hidden"
            animate="show"
            className="mt-8 text-lg text-text-secondary font-medium leading-relaxed max-w-2xl mx-auto"
          >
            A selection of projects where our architecture directly improved
            operational efficiency, reduced downtime, or enabled new business models.
          </motion.p>
        </div>
      </section>

      <section className="pb-28 bg-bg relative">
        <div className="container-section relative z-10">
          <div className="grid md:grid-cols-2 gap-8">
            {CASE_STUDIES.map((work, i) => (
              <motion.div
                key={work.id}
                variants={fadeUp}
                custom={i * 0.1}
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
              >
                <Link to={`/work/${work.id}`} className="block h-full group">
                  <GlassCard className="p-8 h-full flex flex-col justify-between overflow-hidden relative border-card-border hover:border-briams-blue/30 transition-all duration-300">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-briams-blue/5 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform duration-500" />
                    
                    <div>
                      <div className="flex items-center gap-4 mb-6 text-sm font-mono tracking-wider font-semibold">
                        <span className="text-briams-blue uppercase">{work.client}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-card-border" />
                        <span className="text-text-muted uppercase">{work.industry}</span>
                      </div>

                      <h3 className="text-2xl font-bold text-text-primary tracking-tight group-hover:text-briams-blue transition-colors duration-300">
                        {work.title}
                      </h3>
                      
                      <p className="mt-4 text-[15px] text-text-muted leading-relaxed font-medium">
                        {work.description}
                      </p>

                      <div className="mt-8 flex flex-wrap gap-2">
                        {work.tag.split(' · ').map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 rounded-full border border-card-border bg-surface text-text-secondary text-xs font-mono uppercase tracking-wider font-semibold"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-10 pt-6 border-t border-card-border flex items-center justify-between text-briams-blue font-semibold">
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

      <CTASection />
    </>
  );
}
