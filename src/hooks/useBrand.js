import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export function useBrand() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useBrand must be used within ThemeProvider");
  return ctx;
}
