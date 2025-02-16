"use client";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useLabelStore from "@/store/labelStore";
import { useAuth } from "@/context/AuthContext";
import { useLoading } from "@/context/LoadingContext"; // ✅ Import loading context
import Loader from "@/components/loader/loader";
import { Logger } from "@/utils/Logger";

const HorizontalScrollNav = () => {
  const scrollRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);
  const {
    setSelectedMainLabel,
    mainLabels,
    fetchMainLabels,
    setSelectedSubSubLabel,
  } = useLabelStore();
  const { user } = useAuth();
  const { loading, setLoading } = useLoading(); // ✅ Use loading state

  useEffect(() => {
    setLoading(true);
    fetchMainLabels(user).finally(() => setLoading(false)); // ✅ Stop loading

    if (mainLabels.length === 0) {
      Logger.info("Main Labels are empty, fetching again", { user });
      setLoading(true);
      fetchMainLabels(user).finally(() => setLoading(false)); // ✅ Stop loading
    }
  }, [user]);

  const updateScrollButtons = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;
    setShowLeft(scrollLeft > 0);
    setShowRight(scrollLeft + clientWidth < scrollWidth);
  };

  const scroll = (direction) => {
    if (!scrollRef.current) return;

    const { clientWidth } = scrollRef.current;
    const scrollAmount = clientWidth * 0.6; // Scroll by 60% of container width

    Logger.debug(`Scrolling ${direction}`, { scrollAmount });

    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });

    setTimeout(updateScrollButtons, 300);
  };

  useEffect(() => {
    updateScrollButtons();
    window.addEventListener("resize", updateScrollButtons);

    return () => {
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, []);
  const setSelectedMainLabelFn = (label) => {
    setSelectedMainLabel(label);
    setSelectedSubSubLabel(null);
  };
  return (
    <div className="relative w-full px-4 mx-auto overflow-hidden bg-lightCard dark:bg-darkCard">
      {/* Left Scroll Button */}
      {showLeft && (
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-darkBg text-lightText p-2 rounded-full shadow-md hover:bg-darkPrimary transition-all duration-300 z-10"
          onClick={() => scroll("left")}
        >
          <ChevronLeft size={24} />
        </button>
      )}

      {/* Scrollable Links Container */}
      <div
        ref={scrollRef}
        onScroll={updateScrollButtons}
        className="flex gap-3 overflow-x-auto whitespace-nowrap scroll-smooth scrollbar-hide px-2 py-3 text-lightText dark:text-lightText rounded-lg shadow-md"
        style={{ scrollbarWidth: "none" }}
      >
        {/* ✅ Show loader if fetching labels */}
        {loading ? (
          <div className="flex justify-center items-center w-full">
            <Loader />
          </div>
        ) : (
          mainLabels.length > 0 &&
          mainLabels.map((label, index) => (
            <button
              key={index}
              className="px-4 py-2 bg-lightBg text-darkText dark:bg-darkBg dark:text-lightText rounded-md border border-lightBorder dark:border-darkBorder hover:bg-lightSecondary dark:hover:bg-darkSecondary transition-all duration-300 text-sm sm:text-base"
              onClick={() => setSelectedMainLabelFn(label.mainLabelName)}
            >
              {label.mainLabelName}
            </button>
          ))
        )}
      </div>

      {/* Right Scroll Button */}
      {showRight && (
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-darkBg text-lightText p-2 rounded-full shadow-md hover:bg-darkPrimary transition-all duration-300 z-10"
          onClick={() => scroll("right")}
        >
          <ChevronRight size={24} />
        </button>
      )}
    </div>
  );
};

export default HorizontalScrollNav;
