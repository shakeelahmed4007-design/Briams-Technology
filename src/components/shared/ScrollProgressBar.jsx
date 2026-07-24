import { useScrollProgress } from "../../hooks/useScrollProgress";
import { useBrand } from "../../hooks/useBrand";

export default function ScrollProgressBar() {
  const progress = useScrollProgress();
  const { tokens } = useBrand();

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] z-[100] bg-transparent">
      <div
        className={`h-full bg-gradient-to-r ${tokens.gradient} transition-[width] duration-150 ease-out`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
