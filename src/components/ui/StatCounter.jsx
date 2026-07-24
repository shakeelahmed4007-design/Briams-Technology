import { useCountUp } from "../../hooks/useCountUp";

export default function StatCounter({ value, suffix = "", label }) {
  const { ref, value: animated } = useCountUp(value);
  return (
    <div ref={ref} className="flex flex-col items-center text-center group">
      <span className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-gradient-accent transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-110 drop-shadow-[0_0_15px_rgba(138,99,248,0.3)]">
        {animated}
        {suffix}
      </span>
      <span className="mt-3 text-sm font-medium text-text-muted uppercase tracking-wider group-hover:text-text-secondary transition-colors duration-300">
        {label}
      </span>
    </div>
  );
}
