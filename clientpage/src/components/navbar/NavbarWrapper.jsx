"use client";

import { usePathname } from "next/navigation";
import { useNotFound } from "@/context/NotFoundContext";
import Navbar from "./Navbar";

const NavbarWrapper = () => {
  const { isNotFound } = useNotFound();
  const pathname = usePathname();

  // Hide navbar on login and signin pages
  if (isNotFound || pathname === "/login" || pathname === "/signin") {
    return null;
  }

  return <Navbar />;
};

export default NavbarWrapper;
