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
    setTheme(nextTheme);
    saveTheme(nextTheme);
  };

  return { theme, selectTheme };
}
