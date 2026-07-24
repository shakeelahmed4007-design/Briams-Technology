import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ShieldCheck, Target, Users2, Zap } from "lucide-react";
import { fadeUp, viewportOnce } from "../animations/variants";
import SectionTitle from "../components/ui/SectionTitle";
import GlassCard from "../components/ui/GlassCard";
import Stats from "../components/home/Stats";
import CTASection from "../components/home/CTASection";

const VALUES = [
  {
    icon: Target,
    title: "Precision over speed theatre",
    description:
      "We'd rather scope carefully and deliver on time than sprint into a rebuild six months later.",
  },
  {
    icon: ShieldCheck,
    title: "Ownership, not handoff",
    description:
      "Every engagement includes a support plan. We don't disappear after launch.",
  },
  {
    icon: Zap,
    title: "Engineering with judgment",
    description:
      "Every architecture decision comes with a documented trade-off, not just a default choice.",
  },
  {
    icon: Users2,
    title: "Built by operators",
    description:
      "Our team has run engineering orgs, not just consulted for them — we know what breaks in production.",
  },
];

const TEAM = [
  { name: "Hassan Raza", role: "Founder & CEO" },
  { name: "Fatima Zahra", role: "Head of Engineering" },
  { name: "Omar Siddiqui", role: "Head of Product" },
  { name: "Layla Ahmed", role: "Lead, CureVirtual" },
];

export default function About() {
  return (
    <>
      <Helmet>
        <title>About — Briams Technologies</title>
        <meta
          name="description"
          content="Briams Technologies is an IT consultancy building enterprise software, ERP systems and CureVirtual, a telehealth platform."
        />
      </Helmet>

      <section className="pt-40 pb-16 relative bg-bg overflow-hidden">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-briams-blue/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="container-section max-w-3xl relative z-10 text-center flex flex-col items-center">
          <motion.span
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="inline-block font-mono text-xs uppercase tracking-[0.2em] text-briams-cyan mb-6 font-semibold bg-briams-cyan/10 border border-briams-cyan/20 px-3 py-1.5 rounded-full"
          >
            About
          </motion.span>
          <motion.h1
            variants={fadeUp}
            custom={0.08}
            initial="hidden"
            animate="show"
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight leading-[1.05] text-text-primary"
          >
            We started as engineers frustrated with fragile software.
          </motion.h1>
          <motion.p
            variants={fadeUp}
            custom={0.16}
            initial="hidden"
            animate="show"
            className="mt-8 text-lg text-text-secondary leading-relaxed font-medium max-w-2xl"
          >
            Briams Technologies was founded by engineers who'd spent years
            inheriting systems that broke under real load. Today we build
            software, apps and ERP platforms for clients who need
            infrastructure that holds — and we built CureVirtual to prove the
            same discipline works in healthcare.
          </motion.p>
        </div>
      </section>

      <Stats />

      <section className="section-padding bg-bg relative border-t border-card-border">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-briams-orange/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="container-section relative z-10">
          <SectionTitle
            eyebrow="Values"
            title="What we optimize for"
            description="Four principles that shape every engagement, not just marketing copy."
          />
          <div className="mt-14 grid sm:grid-cols-2 gap-6">
            {VALUES.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  variants={fadeUp}
                  custom={i * 0.08}
                  initial="hidden"
                  whileInView="show"
                  viewport={viewportOnce}
                >
                  <GlassCard className="p-8 h-full flex flex-col group">
                    <div className="w-12 h-12 rounded-2xl bg-surface border border-card-border flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-briams-orange/40 transition-all duration-300">
                      <Icon size={22} className="text-briams-orange" />
                    </div>
                    <h3 className="text-xl font-bold text-text-primary tracking-tight group-hover:text-briams-blue transition-colors">
                      {v.title}
                    </h3>
                    <p className="mt-3 text-[15px] text-text-secondary leading-relaxed font-medium">
                      {v.description}
                    </p>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-surface border-y border-card-border">
        <div className="container-section">
          <SectionTitle eyebrow="Team" title="Leadership" />
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((t, i) => (
              <motion.div
                key={t.name}
                variants={fadeUp}
                custom={i * 0.08}
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                className="text-center group"
              >
                <div className="w-24 h-24 mx-auto rounded-full glass border-card-border flex items-center justify-center font-display text-3xl font-bold text-briams-blue group-hover:text-white group-hover:bg-briams-blue transition-all duration-500">
                  {t.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <h4 className="mt-6 font-bold text-text-primary text-lg">
                  {t.name}
                </h4>
                <p className="text-sm font-mono tracking-wider uppercase text-text-muted mt-1 font-semibold">
                  {t.role}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
