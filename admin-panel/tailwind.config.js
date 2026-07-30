/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        /* CSS Variable Mappings */
        bg: "var(--color-bg)",
        surface: "var(--color-surface)",
        "card-bg": "var(--color-card-bg)",
        "card-border": "var(--color-card-border)",
        "text-primary": "var(--color-text-primary)",
        "text-secondary": "var(--color-text-secondary)",
        "text-muted": "var(--color-text-muted)",
        accent: "var(--color-accent)",
        success: "var(--color-success)",

        /* 1.1 Briams Technologies Palette */
        briams: {
          orange: "#F2711F",
          gold: "#FFB627",
          blue: "#175FC4",
          cyan: "#2FC6EA",
          navy: "#0E1B33",
          white: "#FFFFFF",
        },
        /* 1.2 CureVirtual Palette */
        cure: {
          orange: "#F2711F",
          navy: "#123F63",
          green: "#2E9E5B",
          white: "#FFFFFF",
        },
      },
      fontFamily: {
        display: ["'Outfit'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
      backgroundImage: {
        "cta-gradient": "var(--gradient-cta)",
        "tech-gradient": "var(--gradient-tech)",
        grain:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.02'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(14, 27, 51, 0.05)",
        "glass-lg": "0 20px 60px rgba(14, 27, 51, 0.08)",
        "glow-orange": "0 0 40px rgba(242, 113, 31, 0.2)",
        "glow-blue": "0 0 40px rgba(23, 95, 196, 0.2)",
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 10s ease-in-out infinite",
        "float-delay": "float 8s ease-in-out infinite 1s",
        "spin-slow": "spin 18s linear infinite",
        "gradient-shift": "gradientShift 8s ease infinite",
        blob: "blob 12s ease-in-out infinite",
        marquee: "marquee 30s linear infinite",
        "marquee-reverse": "marqueeReverse 30s linear infinite",
        shimmer: "shimmer 2.5s linear infinite",
        ripple: "ripple 0.6s ease-out",
        "aurora-1": "aurora1 24s ease-in-out infinite",
        "aurora-2": "aurora2 28s ease-in-out infinite",
        "aurora-3": "aurora3 26s ease-in-out infinite",
        "aurora-4": "aurora4 32s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) translateX(0px)" },
          "50%": { transform: "translateY(-20px) translateX(10px)" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        blob: {
          "0%, 100%": { borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" },
          "50%": { borderRadius: "30% 60% 70% 40% / 50% 60% 30% 60%" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        marqueeReverse: {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        ripple: {
          "0%": { transform: "scale(0)", opacity: "0.6" },
          "100%": { transform: "scale(4)", opacity: "0" },
        },
        aurora1: {
          "0%, 100%": { transform: "translateY(0) translateX(0) scale(1)" },
          "33%": { transform: "translateY(-50px) translateX(50px) scale(1.1)" },
          "66%": { transform: "translateY(20px) translateX(-30px) scale(0.9)" },
        },
        aurora2: {
          "0%, 100%": { transform: "translateY(0) translateX(0) scale(1)" },
          "33%": { transform: "translateY(40px) translateX(-40px) scale(0.9)" },
          "66%": { transform: "translateY(-30px) translateX(60px) scale(1.1)" },
        },
        aurora3: {
          "0%, 100%": { transform: "translateY(0) translateX(0) scale(1)" },
          "33%": { transform: "translateY(-40px) translateX(-50px) scale(1.1)" },
          "66%": { transform: "translateY(50px) translateX(30px) scale(0.9)" },
        },
        aurora4: {
          "0%, 100%": { transform: "translateY(0) translateX(0) scale(1)" },
          "33%": { transform: "translateY(30px) translateX(50px) scale(0.9)" },
          "66%": { transform: "translateY(-50px) translateX(-40px) scale(1.1)" },
        },
      },
    },
  },
  plugins: [],
}
