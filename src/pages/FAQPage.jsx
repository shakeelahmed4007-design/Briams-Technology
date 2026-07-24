import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { FAQ } from "../data/content";
import { fadeUp, viewportOnce } from "../animations/variants";
import FAQAccordion from "../components/ui/FAQAccordion";
import CTASection from "../components/home/CTASection";

export default function FAQPage() {
  return (
    <>
      <Helmet>
        <title>FAQ — Briams Technologies</title>
        <meta
          name="description"
          content="Frequently asked questions about working with Briams Technologies, our process, and pricing."
        />
      </Helmet>

      <section className="pt-40 pb-20 bg-bg relative text-center flex flex-col items-center">
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-briams-orange/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="container-section max-w-3xl relative z-10">
          <motion.span
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="inline-block font-mono text-xs uppercase tracking-[0.2em] text-briams-cyan mb-6 font-semibold bg-briams-cyan/10 border border-briams-cyan/20 px-3 py-1.5 rounded-full"
          >
            FAQ
          </motion.span>
          <motion.h1
            variants={fadeUp}
            custom={0.08}
            initial="hidden"
            animate="show"
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight text-text-primary"
          >
            Questions we hear often.
          </motion.h1>
        </div>
      </section>

      <section className="pb-32 bg-bg relative">
        <div className="container-section max-w-3xl">
          <motion.div
            variants={fadeUp}
            custom={0.16}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
          >
            <FAQAccordion items={FAQ} />
          </motion.div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
