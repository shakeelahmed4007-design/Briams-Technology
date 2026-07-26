import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "../../animations/variants";
import StatCounter from "../ui/StatCounter";

const STATS = [
  { value: 50, suffix: "+", label: "Projects Delivered", gradient: "text-gradient-cta" },
  { value: 99, suffix: "%", label: "Client Retention", gradient: "text-gradient-tech" },
  { value: 15, suffix: "+", label: "Enterprise Clients", gradient: "text-gradient-emerald" },
  { value: 5, suffix: "M+", label: "Lines of Code", gradient: "text-gradient-purple" },
];

export default function Stats() {
  return (
    <section className="py-20 border-y border-card-border bg-surface relative z-20">
      <div className="container-section">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 divide-x divide-transparent md:divide-card-border">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              custom={i * 0.1}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className={`text-center flex flex-col items-center justify-center ${
                i % 2 === 1 ? "md:border-l-0" : "" // Handle 2-col to 4-col borders
              }`}
            >
              <StatCounter
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                gradientClass={stat.gradient}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
