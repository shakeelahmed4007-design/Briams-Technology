import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { PRODUCTS } from "../data/products";
import { fadeUp } from "../animations/variants";
import ProductCard from "../components/ui/ProductCard";
import CTASection from "../components/home/CTASection";

export default function Products() {
  return (
    <>
      <Helmet>
        <title>Products — Briams Technologies</title>
        <meta
          name="description"
          content="Explore our flagship platforms, including CureVirtual for telehealth and our custom ERP solutions."
        />
      </Helmet>

      <section className="pt-40 pb-16 relative overflow-hidden bg-bg text-center flex flex-col items-center">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-briams-blue/5 rounded-full blur-[150px] pointer-events-none" />
        
        <div className="container-section max-w-3xl relative z-10">
          <motion.span
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="inline-block font-mono text-xs uppercase tracking-[0.2em] text-briams-cyan mb-6 font-semibold bg-briams-cyan/10 border border-briams-cyan/20 px-3 py-1.5 rounded-full"
          >
            Products
          </motion.span>
          <motion.h1
            variants={fadeUp}
            custom={0.08}
            initial="hidden"
            animate="show"
            className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold tracking-tight leading-[1.05] text-text-primary"
          >
            Software that becomes <span className="text-gradient-cta font-extrabold">infrastructure.</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            custom={0.16}
            initial="hidden"
            animate="show"
            className="mt-8 text-lg text-text-secondary font-medium leading-relaxed max-w-2xl mx-auto"
          >
            We don't build throwaway MVPs. We build platforms designed to support
            core business operations for years. Explore our flagship products.
          </motion.p>
        </div>
      </section>

      <section className="pb-28 bg-bg relative">
        <div className="container-section relative z-10">
          <div className="grid md:grid-cols-2 gap-8">
            {PRODUCTS.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
