
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";
type AccentColor = "purple" | "red" | "green" | "blue" | "gold";

interface ThemeProviderProps {
  children: React.ReactNode;
}

interface ThemeContextType {
  theme: Theme;
  accentColor: AccentColor;
  setTheme: (theme: Theme) => void;
  setAccentColor: (color: AccentColor) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(
    () => (localStorage.getItem("theme") as Theme) || "system"
  );
  
  const [accentColor, setAccentColorState] = useState<AccentColor>(
    () => (localStorage.getItem("accentColor") as AccentColor) || "purple"
  );

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Apply theme
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
        
      root.classList.toggle("dark", systemTheme === "dark");
      root.style.colorScheme = systemTheme;
    } else {
      root.classList.toggle("dark", theme === "dark");
      root.style.colorScheme = theme;
    }
    
    localStorage.setItem("theme", theme);
  }, [theme]);
  
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove existing accent classes
    root.classList.remove(
      "accent-purple",
      "accent-red",
      "accent-green",
      "accent-blue",
      "accent-gold"
    );
    
    // Add new accent class
    root.classList.add(`accent-${accentColor}`);
    
    localStorage.setItem("accentColor", accentColor);
  }, [accentColor]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };
  
  const setAccentColor = (newColor: AccentColor) => {
    setAccentColorState(newColor);
  };

  return (
    <ThemeContext.Provider value={{ theme, accentColor, setTheme, setAccentColor }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  
  return context;
};
