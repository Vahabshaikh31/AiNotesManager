"use client";

import { useNotFound, NotFoundProvider } from "@/context/NotFoundContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { LoadingProvider } from "@/context/LoadingContext";
import Navbar from "@/components/Navbar";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@100..1000&display=swap" rel="stylesheet" />
      </head>
      <body
        className="bg-lightBg dark:bg-darkBg text-lightText dark:text-darkText"
        suppressHydrationWarning
      >
        <ThemeProvider>
          <LoadingProvider>
            <NotFoundProvider>
              <NavbarWrapper />
              <main className="container mx-auto">{children}</main>
            </NotFoundProvider>
          </LoadingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
import { usePathname } from "next/navigation";

function NavbarWrapper() {
  const { isNotFound } = useNotFound();
  const pathname = usePathname();
  const navbarPrevent = pathname !== '/login';
  const navbarPrevent2 = pathname !== '/signin';
  return isNotFound ? null : navbarPrevent && navbarPrevent2 &&  <Navbar />;
}
