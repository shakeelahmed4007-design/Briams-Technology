import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className={`glass rounded-2xl overflow-hidden transition-all duration-300 ${
              isOpen ? "border-briams-blue/30 shadow-sm" : "border-card-border"
            }`}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              className="w-full px-6 py-5 flex items-center justify-between text-left group"
            >
              <span className={`font-semibold text-[15px] sm:text-base transition-colors ${isOpen ? "text-briams-blue" : "text-text-primary group-hover:text-briams-blue"}`}>
                {item.q}
              </span>
              <ChevronDown
                size={20}
                className={`shrink-0 transition-transform duration-300 ${
                  isOpen ? "rotate-180 text-briams-blue" : "text-text-muted group-hover:text-briams-blue"
                }`}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="px-6 pb-6 pt-0 text-[15px] text-text-secondary leading-relaxed font-medium">
                    {item.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
