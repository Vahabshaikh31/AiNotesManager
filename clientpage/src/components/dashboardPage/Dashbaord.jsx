"use client";
import dynamic from "next/dynamic";
import HorizontalScrollNav from "@/components/horizontascroll/HorizontalScrollNav ";
import { Logger } from "@/utils/Logger";

// Lazy loading Sidebar to improve initial load time
const Sidebar = dynamic(() => import("@/components/sidebar/Sidebar"), {
  ssr: false,
});

// SEO Metadata

const Dashboard = () => {
  Logger.info("Dashboard Component Rendered");

  return (
    <div className="flex flex-col">
      <HorizontalScrollNav />
      <Sidebar />
    </div>
  );
};

export default Dashboard;
