import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 40 });
  const springY = useSpring(y, { stiffness: 500, damping: 40 });

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    function move(e) {
      setVisible(true);
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target;
      setIsPointer(
        !!target.closest(
          "a, button, [role='button'], input, textarea, select"
        )
      );
    }
    function leave() {
      setVisible(false);
    }

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
    };
  }, [x, y]);

  if (window.matchMedia("(pointer: coarse)").matches) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference hidden lg:block"
      style={{
        x: springX,
        y: springY,
        opacity: visible ? 1 : 0,
      }}
    >
      <motion.div
        animate={{
          width: isPointer ? 44 : 16,
          height: isPointer ? 44 : 16,
        }}
        transition={{ duration: 0.2 }}
        className="rounded-full bg-white -translate-x-1/2 -translate-y-1/2"
      />
    </motion.div>
  );
}
