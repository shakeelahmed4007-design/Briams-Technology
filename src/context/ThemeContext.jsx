import { createContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);

const BRANDS = {
  briams: {
    name: "Briams Technologies",
    primary: "#175FC4",
    secondary: "#FFB627",
    accent: "#2FC6EA",
    orange: "#F2711F",
    surface: "#0E1B33",
    gradient: "from-briams-orange via-briams-gold to-briams-blue",
    ring: "ring-briams-blue/30",
    glow: "shadow-glow-blue",
  },
  cure: {
    name: "CureVirtual",
    primary: "#123F63",
    secondary: "#2E9E5B",
    accent: "#2E9E5B",
    orange: "#F2711F",
    surface: "#123F63",
    gradient: "from-cure-green via-cure-orange to-cure-navy",
    ring: "ring-cure-green/30",
    glow: "shadow-glow-green",
  },
};

export { ThemeContext };

export function ThemeProvider({ children }) {
  const [brand, setBrand] = useState("briams");

  useEffect(() => {
    document.documentElement.setAttribute("data-brand", brand);
  }, [brand]);

  const tokens = BRANDS[brand];

  return (
    <ThemeContext.Provider value={{ brand, setBrand, tokens }}>
      {children}
    </ThemeContext.Provider>
  );
}
