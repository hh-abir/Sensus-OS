"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Theme = "daylight" | "candlelight";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("daylight");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Read saved theme from localStorage
    try {
      const saved = localStorage.getItem("sensus-theme") as Theme | null;
      if (saved === "candlelight" || saved === "daylight") {
        setThemeState(saved);
        if (saved === "candlelight") {
          document.documentElement.classList.add("dark");
          document.documentElement.setAttribute("data-theme", "candlelight");
        } else {
          document.documentElement.classList.remove("dark");
          document.documentElement.setAttribute("data-theme", "daylight");
        }
      }
    } catch {
      // LocalStorage unavailable
    }
    setMounted(true);
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem("sensus-theme", newTheme);
    } catch {
      // Ignore
    }
    if (newTheme === "candlelight") {
      document.documentElement.classList.add("dark");
      document.documentElement.setAttribute("data-theme", "candlelight");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.setAttribute("data-theme", "daylight");
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "daylight" ? "candlelight" : "daylight");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
