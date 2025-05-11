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
  resolvedTheme: "light" | "dark"; // Current actual theme after resolving 'system'
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(
    () => (localStorage.getItem("theme") as Theme) || "system"
  );
  
  const [accentColor, setAccentColorState] = useState<AccentColor>(
    () => (localStorage.getItem("accentColor") as AccentColor) || "purple"
  );

  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");

  // Function to determine and set the actual theme based on system preference or user choice
  const updateTheme = () => {
    const root = window.document.documentElement;
    let effectiveTheme: "light" | "dark";
    
    // Determine the effective theme
    if (theme === "system") {
      effectiveTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    } else {
      effectiveTheme = theme as "light" | "dark";
    }
    
    // Update state with the resolved theme
    setResolvedTheme(effectiveTheme);
    
    // Apply theme
    root.classList.remove("light", "dark");
    root.classList.add(effectiveTheme);
    root.style.colorScheme = effectiveTheme;
    
    localStorage.setItem("theme", theme);
  };

  // Apply theme whenever it changes
  useEffect(() => {
    updateTheme();
    
    // Listen for system preference changes if using 'system' theme
    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = () => updateTheme();
      
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [theme]);
  
  // Apply accent color whenever it changes
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Set CSS variable to apply accent color throughout the app
    root.style.setProperty("--accent-color", `var(--dnd-${accentColor})`);

    // Update data attribute for accent color - useful for conditional styling
    root.setAttribute("data-accent", accentColor);
    
    localStorage.setItem("accentColor", accentColor);
  }, [accentColor]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };
  
  const setAccentColor = (newColor: AccentColor) => {
    setAccentColorState(newColor);
  };

  return (
    <ThemeContext.Provider 
      value={{ 
        theme, 
        accentColor, 
        setTheme, 
        setAccentColor,
        resolvedTheme
      }}
    >
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
