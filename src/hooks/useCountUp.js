import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

export function useCountUp(target, { duration = 1800, start = 0 } = {}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [value, setValue] = useState(start);

  useEffect(() => {
    if (!isInView) return;
    let raf;
    const startTime = performance.now();

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(start + (target - start) * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isInView, target, duration, start]);

  return { ref, value };
}
