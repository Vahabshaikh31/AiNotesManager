import { Navigate } from "react-router-dom";
import { create } from "zustand";

const useUserStore = create((set) => ({
  userInfo: JSON.parse(localStorage.getItem("user-info") || "null"), // Initialize from cookies if present
  setUserInfo: (userData) => {
    set({ userInfo: userData });
  },
  logout: () => {
    set({ userInfo: null });
    localStorage.removeItem("user-info");
    Navigate("/login");
  },
}));

export default useUserStore;
