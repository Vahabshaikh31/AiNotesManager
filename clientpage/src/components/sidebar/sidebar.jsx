"use client";
import { useEffect, useState, useCallback } from "react";
import {
  ChevronDown,
  ChevronUp,
  Menu,
  X,
  PanelRightClose,
  PanelRightOpen,
} from "lucide-react";
import useLabelStore from "@/store/labelStore";
import Loader from "@/components/loader/loader";
import dynamic from "next/dynamic";
const ChatPage = dynamic(() => import("@/components/chatting/ChatPage"), {
  ssr: false,
});

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const [loadingSubLabels, setLoadingSubLabels] = useState(false);
  const [loadingSubSubLabels, setLoadingSubSubLabels] = useState(false);

  const {
    selectedMainLabel,
    fetchSubLabels,
    subLabels,
    selectedSubLabel,
    fetchSubSubLabels,
    setSelectedSubLabel,
    subSubLabels,
    setSelectedSubSubLabel,
  } = useLabelStore();

  // Fetch sub-labels when the main label changes
  useEffect(() => {
    if (selectedMainLabel) {
      setLoadingSubLabels(true);
      fetchSubLabels(selectedMainLabel).finally(() =>
        setLoadingSubLabels(false)
      );
    }
  }, [selectedMainLabel, fetchSubLabels]);

  // Fetch sub-sub-labels when a sub-label is selected
  useEffect(() => {
    if (selectedSubLabel) {
      setLoadingSubSubLabels(true);
      fetchSubSubLabels(selectedSubLabel).finally(() =>
        setLoadingSubSubLabels(false)
      );
    }
  }, [selectedSubLabel, fetchSubSubLabels]);

  // Toggle sidebar visibility
  const toggleSidebar = useCallback(() => {
    setIsOpen((prev) => !prev);
    if (!isOpen) setIsMobileOpen(false);
  }, [isOpen]);

  // Toggle sub-menu dropdown
  const toggleSubMenu = useCallback((index) => {
    setOpenSubMenu((prev) => (prev === index ? null : index));
  }, []);

  return (
    <div className="flex h-full">
      {/* Mobile Sidebar Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 bg-lightPrimary dark:bg-darkPrimary text-lightText dark:text-darkText p-2 rounded-md z-50"
        onClick={() => setIsMobileOpen((prev) => !prev)}
      >
        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed h-screen top-0 left-0 z-40 transition-all duration-300 md:relative bg-lightCard dark:bg-darkCard border-r border-lightBorder dark:border-darkBorder p-4
          ${isMobileOpen ? "w-64" : isOpen ? "w-64" : "w-0"} 
          ${isMobileOpen ? "block" : "hidden md:block"}`}
      >
        {/* Sidebar Toggle Button */}
        <button
          className="absolute top-4 right-[-12px] text-lightText dark:text-darkText p-2 rounded-full md:right-[-9px] z-10"
          onClick={toggleSidebar}
        >
          {isOpen ? (
            <PanelRightClose size={25} aria-label="close" />
          ) : (
            <PanelRightOpen size={25} aria-label="open" />
          )}
        </button>

        {/* Sidebar Content */}
        <div className="relative">
          {/* Sidebar Title */}
          {isOpen && (
            <h2 className="text-lg font-semibold text-lightText dark:text-darkText mb-6">
              Sidebar Menu
            </h2>
          )}

          {/* Sub-labels Loader */}
          {loadingSubLabels ? (
            <div className="flex justify-center my-4">
              <Loader />
            </div>
          ) : (
            <nav
              className={`space-y-4 transition-opacity duration-300 ${
                isOpen ? "opacity-100" : "opacity-0"
              }`}
            >
              {subLabels.map((item, index) => (
                <div key={index}>
                  {/* SubLabel List Item */}
                  <div
                    className="flex items-center justify-between p-1 rounded-lg text-lightText dark:text-darkText hover:bg-lightPrimary dark:hover:bg-darkPrimary transition cursor-pointer"
                    onClick={() => setSelectedSubLabel(item.subLabelName)}
                  >
                    <span>{item.subLabelName}</span>

                    {/* Sub-menu Toggle */}
                    <span onClick={() => toggleSubMenu(index)}>
                      {openSubMenu === index ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                    </span>
                  </div>

                  {/* Sub-sub-labels Loader */}
                  {openSubMenu === index && loadingSubSubLabels && (
                    <div className="flex justify-center my-2">
                      <Loader />
                    </div>
                  )}

                  {/* SubMenu Rendering */}
                  {openSubMenu === index &&
                    !loadingSubSubLabels &&
                    subSubLabels.length > 0 && (
                      <div className="ml-8 space-y-2">
                        {subSubLabels.map((subItem, subIndex) => (
                          <button
                            key={subIndex}
                            className="block p-2 rounded-lg text-lightText dark:text-darkText hover:bg-lightPrimary dark:hover:bg-darkPrimary transition"
                            onClick={() =>
                              setSelectedSubSubLabel(subItem.subSubLabelName)
                            }
                          >
                            {subItem?.subSubLabelName ??
                              "Unnamed Sub-Sub Label"}
                          </button>
                        ))}
                      </div>
                    )}
                </div>
              ))}
            </nav>
          )}
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        ></div>
      )}
      {/* Chat Page */}
      <div className="flex-1 transition-all">
        <ChatPage />
      </div>
    </div>
  );
};

export default Sidebar;
