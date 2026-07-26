import { motion } from "framer-motion";
import Button from "../ui/Button";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 300, damping: 24 } 
  },
};

export default function Hero() {
  return (
    <section className="relative min-h-[95vh] flex items-center overflow-hidden pt-32 pb-20 bg-bg">
      {/* Aurora Background Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-briams-orange/10 rounded-full blur-[150px] animate-aurora-1 mix-blend-multiply will-change-transform" />
        <div className="absolute top-[10%] right-[-10%] w-[45vw] h-[45vw] bg-briams-cyan/10 rounded-full blur-[160px] animate-aurora-2 mix-blend-multiply will-change-transform" />
        <div className="absolute bottom-[-10%] left-[15%] w-[55vw] h-[55vw] bg-briams-blue/10 rounded-full blur-[180px] animate-aurora-3 mix-blend-multiply will-change-transform" />
        <div className="absolute bottom-[5%] right-[5%] w-[40vw] h-[40vw] bg-briams-gold/10 rounded-full blur-[140px] animate-aurora-4 mix-blend-multiply will-change-transform" />
      </div>
      <div className="absolute inset-0 bg-grain opacity-[0.03] pointer-events-none z-0" />

      <div className="container-section relative z-10 text-center flex flex-col items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="max-w-4xl w-full"
        >
          <motion.div variants={itemVariants}>
            <span className="inline-block px-4.5 py-1.5 rounded-full bg-gradient-to-r from-briams-cyan/15 via-briams-blue/10 to-briams-orange/15 border border-briams-cyan/30 text-xs font-mono uppercase tracking-wider text-briams-blue mb-8 font-bold shadow-xs hover:scale-105 transition-transform cursor-default">
              Based in Karachi. <span className="text-briams-orange font-extrabold">Building for the world.</span>
            </span>
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight leading-[1.05] text-text-primary">
            We don't just build <span className="text-gradient-tech font-extrabold">software</span>. We build{" "}
            <span className="text-gradient-cta relative inline-block font-extrabold">
              businesses.
              <motion.span 
                className="absolute -bottom-2 left-0 w-full h-[3px] bg-gradient-to-r from-briams-orange via-briams-gold to-briams-orange rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
                style={{ transformOrigin: "left" }}
              />
            </span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="mt-10 text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed font-medium">
            From <span className="text-briams-blue font-semibold">high-performance web applications</span> to{" "}
            <span className="text-briams-orange font-semibold">full-scale ERP platforms</span>, we are the engineering team that executes with precision.
          </motion.p>
          
          <motion.div variants={itemVariants} className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5">
            <Button to="/book-consultation" size="lg">
              Start your project
            </Button>
            <Button to="/work" variant="secondary" size="lg" icon={false}>
              Explore our work
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
