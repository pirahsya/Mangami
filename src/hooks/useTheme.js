import { useEffect, useState } from "react";

const THEME_KEY = "mangami-theme";

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem(THEME_KEY) || "system";
  });

  useEffect(() => {
    const root = document.documentElement;

    const applyTheme = () => {
      root.classList.remove("light", "dark");

      if (theme === "system") {
        const isDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        root.classList.add(isDark ? "dark" : "light");
      } else {
        root.classList.add(theme);
      }
    };

    applyTheme();
    localStorage.setItem(THEME_KEY, theme);

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addEventListener("change", applyTheme);

    return () => media.removeEventListener("change", applyTheme);
  }, [theme]);

  return { theme, setTheme };
}
