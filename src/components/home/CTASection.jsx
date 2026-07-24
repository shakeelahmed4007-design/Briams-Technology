import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "../../animations/variants";
import Button from "../ui/Button";

export default function CTASection() {
  return (
    <section className="py-24 sm:py-32 bg-bg overflow-hidden border-t border-card-border relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-briams-orange/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="container-section relative z-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="relative rounded-[2.5rem] overflow-hidden glass border-card-border px-6 sm:px-16 py-20 sm:py-24 text-center shadow-lg"
        >
          {/* Deep Navy inner background for CTA contrast */}
          <div className="absolute inset-0 bg-briams-navy" />
          <div className="absolute inset-0 bg-grain opacity-10" />
          
          <div className="relative z-10">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white leading-[1.1] tracking-tight max-w-3xl mx-auto">
              Ready to build infrastructure that{" "}
              <span className="text-gradient-cta">scales</span>?
            </h2>
            <p className="mt-6 text-lg text-white/70 font-medium max-w-2xl mx-auto leading-relaxed">
              We take on a limited number of new clients per quarter to ensure
              engineering quality. Let's discuss your roadmap.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button to="/book-consultation" size="lg">
                Book a consultation
              </Button>
              <Button to="/contact" variant="glass" size="lg" icon={false}>
                Contact sales
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
