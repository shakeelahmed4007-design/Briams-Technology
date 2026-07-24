import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function Button({
  children,
  to,
  href,
  onClick,
  variant = "primary",
  size = "md",
  icon = true,
  className = "",
  type = "button",
}) {

  const baseStyles =
    "relative inline-flex items-center justify-center font-semibold transition-all duration-300 ease-out outline-none rounded-xl overflow-hidden group cursor-pointer";

  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-[15px]",
    lg: "px-8 py-4 text-base",
  };

  const variants = {
    primary:
      "text-white bg-cta-gradient shadow-[0_4px_14px_0_rgba(242,113,31,0.3)] hover:shadow-[0_6px_20px_rgba(242,113,31,0.4)] hover:-translate-y-1 hover:scale-[1.02]",
    secondary:
      "text-briams-blue bg-white border border-briams-blue/20 hover:border-briams-blue hover:text-white hover:bg-briams-blue hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(23,95,196,0.2)]",
    glass:
      "text-white bg-white/10 border border-white/20 hover:bg-white/20 hover:-translate-y-1 backdrop-blur-md",
  };

  const handleSmoothScroll = (e, targetPath) => {
    if (onClick) onClick(e);
    if (!targetPath || !targetPath.includes("#")) return;

    const hash = targetPath.split("#")[1];
    if (hash) {
      const el = document.getElementById(hash);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const content = (
    <>
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {icon && (
          <ArrowRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        )}
      </span>
      {variant === "primary" && (
        <span className="absolute inset-0 z-0 bg-gradient-to-r from-briams-gold to-briams-orange opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}
    </>
  );

  if (to) {
    if (to.includes("#")) {
      return (
        <a
          href={to}
          onClick={(e) => handleSmoothScroll(e, to)}
          className={`${baseStyles} ${sizeStyles[size]} ${variants[variant]} ${className}`}
        >
          {content}
        </a>
      );
    }
    return (
      <Link
        to={to}
        onClick={onClick}
        className={`${baseStyles} ${sizeStyles[size]} ${variants[variant]} ${className}`}
      >
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        onClick={(e) => handleSmoothScroll(e, href)}
        className={`${baseStyles} ${sizeStyles[size]} ${variants[variant]} ${className}`}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size]} ${variants[variant]} ${className}`}
    >
      {content}
    </button>
  );
}
