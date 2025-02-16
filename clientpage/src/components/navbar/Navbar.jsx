"use client";

import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { Moon, Sun, User, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const { user, logout } = useAuth();

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, []);
  if (!user) {
    return null;
  }
  return (
    <nav className="p-4 bg-lightCard dark:bg-darkCard flex justify-between items-center border-b-[.3px] border-b-lightBorder dark:border-b-darkBorder relative">
      <h1 className="text-xl font-semibold text-lightText dark:text-darkText">
        My App
      </h1>

      {/* Theme Toggle & User Profile */}
      <div className="flex items-center gap-4">
        {/* 🔥 Futuristic Toggle Switch */}
        {/* Theme Toggle Switch (Sun-Moon Animation) */}
        <label className="themeToggle  st-sunMoonThemeToggleBtn text-clip">
          <input
            type="checkbox"
            id="themeToggle"
            className="themeToggleInput bg-dark-primary dark:bg-light-primary"
            checked={theme === "light"}
            onChange={toggleTheme}
            aria-label="Toggle Theme"
          />
          <svg
            width="18"
            height="18"
            viewBox="0 0 20 20"
            fill="currentColor"
            stroke="none"
          >
            <mask id="moon-mask">
              <rect x="0" y="0" width="20" height="20" fill="white"></rect>
              <circle cx="11" cy="3" r="8" fill="black"></circle>
            </mask>
            <circle
              className="sunMoon"
              cx="10"
              cy="10"
              r="8"
              mask="url(#moon-mask)"
            ></circle>
            <g>
              <circle
                className="sunRay sunRay1"
                cx="18"
                cy="10"
                r="1.5"
              ></circle>
              <circle
                className="sunRay sunRay2"
                cx="14"
                cy="16.928"
                r="1.5"
              ></circle>
              <circle
                className="sunRay sunRay3"
                cx="6"
                cy="16.928"
                r="1.5"
              ></circle>
              <circle
                className="sunRay sunRay4"
                cx="2"
                cy="10"
                r="1.5"
              ></circle>
              <circle
                className="sunRay sunRay5"
                cx="6"
                cy="3.1718"
                r="1.5"
              ></circle>
              <circle
                className="sunRay sunRay6"
                cx="14"
                cy="3.1718"
                r="1.5"
              ></circle>
            </g>
          </svg>
        </label>

        {/* User Profile Icon */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Profile"
            className="p-2 rounded-full  bg-lightPrimary dark:bg-darkPrimary bg-dark-primary dark:bg-light-primary text-white"
          >
            <User size={20} />
          </button>

          {/* Dropdown Menu */}
          {menuOpen && (
            <div className="absolute z-10 right-0 mt-2 w-40 bg-lightCard dark:bg-darkCard shadow-lg rounded-lg py-2">
              <button
                className="flex items-center gap-2 px-4 py-2 text-lightText dark:text-darkText hover:bg-gray-200 dark:hover:bg-gray-700 w-full"
                onClick={() => logout()}
              >
                <LogOut size={18} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
