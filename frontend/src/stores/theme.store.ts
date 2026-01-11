import { create } from "zustand";

type Theme = "light" | "dark";

type ThemeState = {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
};

const THEME_KEY = "app:theme";

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
}

export const useThemeStore = create<ThemeState>((set) => {
  const saved = (localStorage.getItem(THEME_KEY) as Theme) || "light";
  applyTheme(saved);

  return {
    theme: saved,

    toggleTheme() {
      set((state) => {
        const next = state.theme === "dark" ? "light" : "dark";
        localStorage.setItem(THEME_KEY, next);
        applyTheme(next);
        return { theme: next };
      });
    },

    setTheme(theme) {
      localStorage.setItem(THEME_KEY, theme);
      applyTheme(theme);
      set({ theme });
    },
  };
});
