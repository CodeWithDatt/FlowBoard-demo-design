"use client";

import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "flowboard-theme";

/**
 * Reads the theme the blocking inline script (see layout.tsx) already
 * applied to <html> before hydration.
 */
function getInitialTheme(): Theme {
  return document.documentElement.classList.contains("dark")
    ? "dark"
    : "light";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Always start at "light" so the very first client render matches the
  // server-rendered HTML exactly (the server has no access to the
  // inline script's DOM mutation, so it can only ever assume "light").
  // useLayoutEffect then corrects this synchronously, before the browser
  // paints, so there is neither a hydration mismatch nor a visible flash.
  const [theme, setThemeState] = useState<Theme>("light");

  useLayoutEffect(() => {
    setThemeState(getInitialTheme());

    const handleStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY) return;

      const nextTheme = event.newValue === "dark" ? "dark" : "light";
      document.documentElement.classList.toggle("dark", nextTheme === "dark");
      setThemeState(nextTheme);
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const applyTheme = useCallback((next: Theme) => {
    document.documentElement.classList.toggle("dark", next === "dark");
    window.localStorage.setItem(STORAGE_KEY, next);
    setThemeState(next);
  }, []);

  const setTheme = useCallback(
    (next: Theme) => applyTheme(next),
    [applyTheme],
  );

  const toggleTheme = useCallback(() => {
    applyTheme(theme === "dark" ? "light" : "dark");
  }, [applyTheme, theme]);

  const value = useMemo(
    () => ({ theme, toggleTheme, setTheme }),
    [theme, toggleTheme, setTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}
