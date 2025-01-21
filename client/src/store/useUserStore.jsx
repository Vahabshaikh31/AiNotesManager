import create from "zustand";
import Cookies from "js-cookie";

const useUserStore = create((set) => ({
  userInfo: JSON.parse(Cookies.get("user-info") || "null"), // Initialize from cookies if present
  setUserInfo: (userData) => {
    set({ userInfo: userData });
    Cookies.set("user-info", JSON.stringify(userData), { expires: 7 });
  },
  logout: () => {
    set({ userInfo: null });
    Cookies.remove("user-info");
  },
}));

export default useUserStore;
