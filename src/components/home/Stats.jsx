import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "../../animations/variants";
import StatCounter from "../ui/StatCounter";

const STATS = [
  { value: 50, suffix: "+", label: "Projects Delivered" },
  { value: 99, suffix: "%", label: "Client Retention" },
  { value: 15, suffix: "+", label: "Enterprise Clients" },
  { value: 5, suffix: "M+", label: "Lines of Code" },
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
              <div className="text-4xl sm:text-5xl font-display font-bold text-briams-blue">
                <StatCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="mt-3 text-[13px] font-mono tracking-wider uppercase text-text-muted font-semibold">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
