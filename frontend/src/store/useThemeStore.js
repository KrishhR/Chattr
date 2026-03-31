import { create } from "zustand";

const getDefaultTheme = () => {
    const stored = localStorage.getItem("chat-theme");
    if (stored) return stored;

    // Check system preference
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark";
    }
    return "winter";
};

export const useThemeStore = create((set) => ({
    theme: getDefaultTheme(),
    setTheme: (theme) => {
        localStorage.setItem("chat-theme", theme);
        set({ theme });
    }
}));