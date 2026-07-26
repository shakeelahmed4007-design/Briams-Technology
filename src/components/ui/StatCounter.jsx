import { useCountUp } from "../../hooks/useCountUp";

export default function StatCounter({ value, suffix = "", label, gradientClass = "text-gradient-cta" }) {
  const { ref, value: animated } = useCountUp(value);
  return (
    <div ref={ref} className="flex flex-col items-center text-center group">
      <span className={`text-4xl sm:text-5xl lg:text-6xl font-display font-bold ${gradientClass} transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-110 drop-shadow-sm`}>
        {animated}
        {suffix}
      </span>
      {label && (
        <span className="mt-3 text-sm font-semibold text-text-muted uppercase tracking-wider group-hover:text-briams-blue transition-colors duration-300">
          {label}
        </span>
      )}
    </div>
  );
}
