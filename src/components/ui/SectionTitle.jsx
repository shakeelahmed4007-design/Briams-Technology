import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "../../animations/variants";

export default function SectionTitle({
  eyebrow,
  title,
  description,
  align = "center",
  className = "",
}) {
  const isCenter = align === "center";

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className={`flex flex-col ${
        isCenter ? "items-center text-center mx-auto" : "items-start text-left"
      } ${className}`}
    >
      {eyebrow && (
        <span className="inline-block font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] text-briams-orange font-bold mb-4 border border-briams-orange/20 bg-gradient-to-r from-briams-orange/10 via-briams-blue/5 to-briams-cyan/10 px-3.5 py-1 rounded-full shadow-xs">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-text-primary tracking-tight leading-[1.1]">
        {title}
      </h2>
      {description && (
        <p
          className={`mt-6 text-base sm:text-lg text-text-secondary leading-relaxed font-medium ${
            isCenter ? "max-w-2xl" : "max-w-xl"
          }`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
