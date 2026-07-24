import { motion } from "framer-motion";
import { HeartPulse, ShieldCheck } from "lucide-react";
import { fadeRight, zoomIn, viewportOnce } from "../../animations/variants";
import Button from "../ui/Button";

export default function FeaturedProduct() {
  return (
    <section className="section-padding bg-surface relative overflow-hidden border-y border-card-border">
      {/* Premium Dark Theme Overlays */}
      <div className="absolute inset-0 bg-dark-mesh opacity-50 mix-blend-screen" />
      <div className="absolute inset-0 bg-grain opacity-20" />
      
      {/* Accent Glow Blob */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-section relative z-10 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          variants={fadeRight}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-success/10 border border-success/20 text-xs font-mono uppercase tracking-wider text-success mb-6 shadow-[0_0_15px_rgba(0,255,136,0.15)]">
            <HeartPulse size={14} className="text-success" />
            Flagship product
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-text-primary leading-[1.1]">
            CureVirtual is telehealth infrastructure, not just an app.
          </h2>
          <p className="mt-6 text-text-muted text-lg leading-relaxed max-w-lg">
            Five connected modules — Patient, Doctor, Physician Assistant,
            Laboratory and Pharmacy — coordinating care in regions where
            specialists are hours away. Launching first in Ghana.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <Button to="/products/curevirtual" size="lg">
              Visit CureVirtual
            </Button>
            <div className="inline-flex items-center gap-2 text-text-muted text-sm font-medium">
              <ShieldCheck size={18} className="text-success drop-shadow-[0_0_8px_rgba(0,255,136,0.4)]" />
              Built by Briams Technologies
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={zoomIn}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="relative"
        >
          <div className="rounded-3xl glass p-8 card-hover-glow relative overflow-hidden group">
            {/* Inner Glow Effect on Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-success/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="rounded-2xl bg-surface border border-card-border aspect-[4/3] flex items-center justify-center relative z-10 overflow-hidden shadow-inner">
              <div className="grid grid-cols-2 gap-4 p-8 w-full">
                {["Patient", "Doctor", "Laboratory", "Pharmacy"].map((m, i) => (
                  <motion.div
                    key={m}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.05)", borderColor: "rgba(0,255,136,0.3)" }}
                    className="rounded-xl bg-bg border border-card-border p-5 flex items-center justify-center text-text-secondary text-sm font-semibold transition-all duration-300 cursor-default shadow-sm"
                  >
                    {m}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
