import Dashboard from "@/components/dashboardPage/Dashbaord";
import seoConfig from "@/config/seoConfig";
import { Logger } from "@/utils/Logger";
import { Metadata } from "next";

export const metadata = seoConfig.home;

const Page = () => {
  Logger.info("Dashboard Component Rendered");

  return <Dashboard />;
};

export default Page;
