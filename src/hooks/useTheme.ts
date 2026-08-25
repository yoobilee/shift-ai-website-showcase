import { useLayoutEffect, useState } from "react";
import type { ThemeMode } from "../types";
import { getInitialTheme, saveTheme } from "../utils/themeStorage";

export function useTheme() {
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  const selectTheme = (nextTheme: ThemeMode) => {
    const root = document.documentElement;
    root.dataset.themeChanging = "true";
    setTheme(nextTheme);
    saveTheme(nextTheme);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => delete root.dataset.themeChanging);
    });
  };

  return { theme, selectTheme };
}
