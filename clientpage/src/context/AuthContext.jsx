"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("vahabshaikh");
  const [username, setUsername] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");

      if (token) {
        const cleanedToken = token.replace(/^"|"$/g, ""); // Clean token
        try {
          const payload = JSON.parse(atob(cleanedToken.split(".")[1])); // Decode JWT payload
          // setUser(payload._id); // Store decoded payload
          setUsername(payload.username); // Store decoded payload
        } catch (error) {
          console.log("Error decoding token:", error);
        }
      }
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("token", JSON.stringify(token));
    // setUser(token);
    router.replace("/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("token");
    // setUser(null);
    router.replace("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, username }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
