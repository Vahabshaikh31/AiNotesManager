"use client";
import { useState } from "react";
import {
  Menu,
  X,
  Home,
  User,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import ChatPage from "../chatting/ChatPage";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="relative flex">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-[91vh] ${
          isOpen ? "w-64" : "w-16"
        } bg-lightCard dark:bg-darkCard border-r border-lightBorder dark:border-darkBorder p-5 transition-all duration-300 lg:relative`}
      >
        {/* Sidebar Toggle Button */}
        <button
          className="absolute top-4 right-[-14px] bg-lightPrimary dark:bg-darkPrimary text-lightText dark:text-darkText p-1 rounded-full shadow-md"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>

        {/* Sidebar Content */}
        <h2
          className={`text-lg font-semibold text-lightText dark:text-darkText mb-6 transition-opacity ${
            isOpen ? "opacity-100" : "opacity-0 hidden"
          }`}
        >
          Sidebar Menu
        </h2>

        <nav className="space-y-4">
          <a
            href="#"
            className="flex items-center gap-3 p-3 rounded-lg bg-lightBg dark:bg-darkBg text-lightText dark:text-darkText hover:bg-lightPrimary dark:hover:bg-darkPrimary transition"
          >
            <Home size={20} />
            <span className={`${isOpen ? "opacity-100" : "opacity-0 hidden"}`}>
              Home
            </span>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 p-3 rounded-lg bg-lightBg dark:bg-darkBg text-lightText dark:text-darkText hover:bg-lightPrimary dark:hover:bg-darkPrimary transition"
          >
            <User size={20} />
            <span className={`${isOpen ? "opacity-100" : "opacity-0 hidden"}`}>
              Profile
            </span>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 p-3 rounded-lg bg-lightBg dark:bg-darkBg text-lightText dark:text-darkText hover:bg-lightPrimary dark:hover:bg-darkPrimary transition"
          >
            <Settings size={20} />
            <span className={`${isOpen ? "opacity-100" : "opacity-0 hidden"}`}>
              Settings
            </span>
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <ChatPage />
      </div>
    </div>
  );
};

export default Sidebar;
