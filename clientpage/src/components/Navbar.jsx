"use client";

import { useTheme } from "@/context/ThemeContext";
import { Moon, Sun } from "lucide-react";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="p-4  bg-lightCard dark:bg-darkCard flex justify-between items-center">
      <h1 className="text-xl font-semibold text-lightText dark:text-darkText">
        My App
      </h1>
      <button
        onClick={toggleTheme}
        className="p-2 rounded bg-lightPrimary dark:bg-darkPrimary text-white transition"
      >
        {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
      </button>
    </nav>
  );
}
