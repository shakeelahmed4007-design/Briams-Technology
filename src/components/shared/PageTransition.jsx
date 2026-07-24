import { motion } from "framer-motion";
import { pageTransition } from "../../animations/variants";

export default function PageTransition({ children }) {
  return (
    <motion.div
      initial={pageTransition.initial}
      animate={pageTransition.animate}
      exit={pageTransition.exit}
      transition={pageTransition.transition}
    >
      {children}
    </motion.div>
  );
}
