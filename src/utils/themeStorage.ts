import type { ThemeMode } from "../types";

const storageKey = "shift-showcase-theme";

export function getInitialTheme(): ThemeMode {
  try {
    const storedTheme = window.localStorage.getItem(storageKey);
    if (storedTheme === "light" || storedTheme === "dark") return storedTheme;
  } catch {
    // Storage can be unavailable in privacy-restricted browsing contexts.
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function saveTheme(theme: ThemeMode) {
  try {
    window.localStorage.setItem(storageKey, theme);
  } catch {
    // The selected theme still works for the current session.
  }
}
