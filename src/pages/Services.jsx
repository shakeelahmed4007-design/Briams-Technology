import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { SERVICES } from "../data/services";
import { fadeUp, viewportOnce } from "../animations/variants";
import GlassCard from "../components/ui/GlassCard";
import Button from "../components/ui/Button";
import CTASection from "../components/home/CTASection";

export default function Services() {
  return (
    <>
      <Helmet>
        <title>Services — Briams Technologies</title>
        <meta
          name="description"
          content="Software development, app development, ERP solutions, IT consultancy, data analysis, tech training and coaching."
        />
      </Helmet>

      <section className="pt-40 pb-16 relative overflow-hidden bg-bg text-center flex flex-col items-center">
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-briams-cyan/5 rounded-full blur-[150px] pointer-events-none" />
        
        <div className="container-section max-w-4xl relative z-10">
          <motion.span
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="inline-block font-mono text-xs uppercase tracking-[0.2em] text-briams-cyan mb-6 font-semibold bg-briams-cyan/10 border border-briams-cyan/20 px-3 py-1.5 rounded-full"
          >
            Services
          </motion.span>
          <motion.h1
            variants={fadeUp}
            custom={0.08}
            initial="hidden"
            animate="show"
            className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold tracking-tight leading-[1.05] text-text-primary"
          >
            Seven disciplines, one accountable team.
          </motion.h1>
          <motion.p
            variants={fadeUp}
            custom={0.16}
            initial="hidden"
            animate="show"
            className="mt-8 text-lg text-text-secondary max-w-2xl mx-auto font-medium leading-relaxed"
          >
            From first architecture sketch to the training that keeps your
            team self-sufficient after launch — we cover the full lifecycle.
          </motion.p>
        </div>
      </section>

      <section className="pb-28 bg-bg relative">
        <div className="container-section space-y-10 relative z-10">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            const reversed = i % 2 === 1;
            return (
              <motion.div
                key={service.id}
                id={service.id}
                variants={fadeUp}
                custom={0.05}
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
              >
                <GlassCard
                  tilt={false}
                  className={`p-8 sm:p-12 grid md:grid-cols-2 gap-10 items-center hover:border-briams-blue/30 transition-all duration-300 ${
                    reversed ? "md:[direction:rtl]" : ""
                  }`}
                >
                  <div className={reversed ? "[direction:ltr]" : ""}>
                    <div className="w-14 h-14 rounded-2xl bg-surface border border-card-border flex items-center justify-center mb-6 shadow-sm">
                      <Icon size={26} className="text-briams-orange" />
                    </div>
                    <h2 className="text-3xl font-bold text-text-primary tracking-tight group-hover:text-briams-blue transition-colors">
                      {service.title}
                    </h2>
                    <p className="mt-4 text-text-secondary leading-relaxed text-[15px] font-medium">
                      {service.description}
                    </p>
                    <div className="mt-8">
                      <Button to="/book-consultation" size="md">
                        Discuss this service
                      </Button>
                    </div>
                  </div>
                  <div className={`grid grid-cols-1 gap-3 ${reversed ? "[direction:ltr]" : ""}`}>
                    {service.capabilities.map((cap) => (
                      <div
                        key={cap}
                        className="flex items-center gap-3 px-5 py-4 rounded-xl glass border border-card-border hover:border-briams-cyan/30 hover:bg-briams-cyan/5 transition-colors duration-300"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-briams-cyan shrink-0" />
                        <span className="text-[15px] font-semibold text-text-primary">{cap}</span>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </section>

      <CTASection />
    </>
  );
}
