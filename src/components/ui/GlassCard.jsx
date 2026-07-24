import { useRef, useState } from "react";
import { motion } from "framer-motion";

export default function GlassCard({ children, className = "", tilt = true }) {
  const ref = useRef(null);
  const [style, setStyle] = useState({});

  function handleMove(e) {
    if (!tilt || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setStyle({
      transform: `perspective(1000px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg) scale3d(1.01, 1.01, 1.01)`,
    });
  }

  function handleLeave() {
    setStyle({ transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)" });
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={style}
      className={`glass rounded-2xl sm:rounded-3xl card-hover-glow ${className}`}
    >
      {children}
    </motion.div>
  );
}
