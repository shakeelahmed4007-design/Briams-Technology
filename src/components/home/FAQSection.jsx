import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "../../animations/variants";
import { FAQ } from "../../data/content";
import SectionTitle from "../ui/SectionTitle";
import FAQAccordion from "../ui/FAQAccordion";

export default function FAQSection() {
  return (
    <section id="faq" className="section-padding bg-bg relative">
      <div className="container-section max-w-3xl relative z-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={fadeUp}
        >
          <SectionTitle
            eyebrow="FAQ"
            title="Questions we hear often"
            align="left"
            className="!items-start !text-left"
          />
        </motion.div>
        
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={fadeUp}
          custom={0.2}
          className="mt-16"
        >
          <FAQAccordion items={FAQ} />
        </motion.div>
      </div>
    </section>
  );
}
