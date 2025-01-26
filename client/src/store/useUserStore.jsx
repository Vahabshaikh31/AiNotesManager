import { create } from "zustand";

const useUserStore = create((set) => ({
  userInfo: JSON.parse(localStorage.getItem("user-info") || "null"), // Initialize from cookies if present
  setUserInfo: (userData) => {
    set({ userInfo: userData });
  },
  logout: () => {
    set({ userInfo: null });
    localStorage.removeItem("user-info");
  },
}));

export default useUserStore;
