import { create } from "zustand";

const useThemeStore = create((set) => ({
  darkMode: localStorage.getItem("darkMode") === "true",
  toggleTheme: () =>
    set((state) => {
      const newDarkMode = !state.darkMode;
      localStorage.setItem("darkMode", newDarkMode); // Save the new theme in localStorage
      return { darkMode: newDarkMode };
    }),
}));

export default useThemeStore;
