import axios from "axios";

const createAPI = (baseURL) => {
  const instance = axios.create({
    baseURL,
    withCredentials: true,
  });

  return {
    get: (url, config) => instance.get(url, config),
    post: (url, data, config) => instance.post(url, data, config),
    put: (url, data, config) => instance.put(url, data, config),
    delete: (url, config) => instance.delete(url, config),
  };
};

// Auth API
export const authAPI = createAPI("http://localhost:3000/auth/");

// User API
export const userAPI = createAPI("http://localhost:3000/api/user/");

// Example of using these APIs
export const googleAuth = (code) => authAPI.get(`/google?code=${code}`);
export const getUserDetails = (id) => userAPI.get(`/${id}`);
export const updateUserDetails = (id, data) => userAPI.put(`/${id}`, data);
export const deleteUser = (id) => userAPI.delete(`/${id}`);
