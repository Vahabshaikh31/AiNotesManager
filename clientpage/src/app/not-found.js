"use client";

import { useEffect } from "react";
import { useNotFound } from "@/context/NotFoundContext";
import Link from "next/link";

const NotFoundPage = () => {
  const { setIsNotFound } = useNotFound();

  useEffect(() => {
    setIsNotFound(true);
    return () => setIsNotFound(false);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-lightBg dark:bg-darkBg text-lightText dark:text-darkText">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-xl mt-4">
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <Link
        href="/"
        className="mt-6 px-6 py-2 bg-primary dark:bg-primaryDark text-white rounded-lg hover:bg-opacity-80 transition"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
