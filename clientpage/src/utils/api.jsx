import axios from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

const createApiInstance = (path = "") => {
  const instance = axios.create({
    baseURL: `${BASE_URL}${path}`,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });

  // Add Request Interceptor for Authorization Header
  instance.interceptors.request.use(
    (config) => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        if (token) config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  return instance;
};

// Export API instances
export const api = createApiInstance(); // Default API
export const authApi = createApiInstance("/auth");
export const otpApi = createApiInstance("/api/otp");
export const userApi = createApiInstance("/api/user");
export const aiApi = createApiInstance("/api/ai");
export const chatApi = createApiInstance("/api/chat");
export const pdfApi = createApiInstance("/api/pdf");
