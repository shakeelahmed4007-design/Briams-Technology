import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { fadeUp } from "../animations/variants";
import Button from "../components/ui/Button";

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>404 — Page Not Found</title>
      </Helmet>
      
      <section className="min-h-screen flex items-center justify-center bg-bg relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-briams-blue/5 rounded-full blur-[150px] pointer-events-none" />
        
        <div className="container-section text-center relative z-10">
          <motion.div variants={fadeUp} initial="hidden" animate="show">
            <h1 className="text-[150px] md:text-[200px] font-display font-bold leading-none text-text-primary/10 tracking-tighter select-none">
              404
            </h1>
            <div className="-mt-16 md:-mt-24 relative z-20">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-text-primary tracking-tight">
                Page not found
              </h2>
              <p className="mt-4 text-text-secondary font-medium text-lg max-w-md mx-auto">
                The page you're looking for doesn't exist or has been moved to a new architecture.
              </p>
              <div className="mt-10 flex justify-center">
                <Button to="/" size="lg">
                  Return Home
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
