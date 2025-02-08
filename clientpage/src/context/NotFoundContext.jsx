"use client";
import { createContext, useContext, useState } from "react";

const NotFoundContext = createContext();

export const NotFoundProvider = ({ children }) => {
  const [isNotFound, setIsNotFound] = useState(false);

  return (
    <NotFoundContext.Provider value={{ isNotFound, setIsNotFound }}>
      {children}
    </NotFoundContext.Provider>
  );
};

export const useNotFound = () => useContext(NotFoundContext);
