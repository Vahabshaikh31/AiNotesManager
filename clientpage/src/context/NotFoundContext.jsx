"use client";
import { createContext, useContext, useState } from "react";

const NotFoundContext = createContext(null);

export function NotFoundProvider({ children }) {
  const [isNotFound, setIsNotFound] = useState(false);

  return (
    <NotFoundContext.Provider value={{ isNotFound, setIsNotFound }}>
      {children}
    </NotFoundContext.Provider>
  );
}

export function useNotFound() {
  const context = useContext(NotFoundContext);
  if (!context) {
    throw new Error("useNotFound must be used within a NotFoundProvider");
  }
  return context;
}
