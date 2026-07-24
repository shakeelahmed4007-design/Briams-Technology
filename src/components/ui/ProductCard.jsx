import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { fadeUp, viewportOnce } from "../../animations/variants";
import GlassCard from "./GlassCard";

export default function ProductCard({ product, index = 0 }) {
  return (
    <motion.div
      variants={fadeUp}
      custom={index * 0.08}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className="h-full"
    >
      <Link to={product.path} className="block h-full">
        <GlassCard
          className={`p-8 h-full group relative overflow-hidden flex flex-col justify-between ${
            product.featured ? "ring-2 ring-briams-orange/20 shadow-glow-orange" : ""
          }`}
        >
          {product.featured && (
            <span className="absolute top-6 right-6 text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-briams-orange/10 border border-briams-orange/20 text-briams-orange font-bold">
              Flagship
            </span>
          )}
          
          <div>
            <div className="flex flex-wrap gap-2 mb-6">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-surface border border-card-border text-text-muted transition-colors duration-300 group-hover:bg-briams-blue/5 group-hover:border-briams-blue/20 group-hover:text-briams-blue font-semibold"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <h3 className="text-2xl font-semibold text-text-primary tracking-tight">
              {product.name}
            </h3>
            
            <p className="mt-2 text-briams-blue font-semibold text-sm">
              {product.tagline}
            </p>
            
            <p className="mt-4 text-[15px] text-text-muted leading-relaxed font-medium">
              {product.description}
            </p>
          </div>
          
          <div className="mt-8 flex items-center gap-1.5 text-sm font-semibold text-text-secondary group-hover:text-briams-orange group-hover:gap-2.5 transition-all duration-300 pt-6 border-t border-card-border">
            Explore Details
            <ArrowUpRight
              size={16}
              className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
            />
          </div>
        </GlassCard>
      </Link>
    </motion.div>
  );
}
