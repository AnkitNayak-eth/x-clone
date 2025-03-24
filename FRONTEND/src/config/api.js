import axios from "axios";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔥 Store token in memory (reducing `localStorage` calls)
let token = null;

// Fetch token once from `localStorage`
if (typeof window !== "undefined") {
  token = localStorage.getItem("jwt") || null;
}

// Interceptor to attach token dynamically
api.interceptors.request.use(
  async (config) => {
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Update token manually when user logs in or updates auth state
export const setAuthToken = (newToken) => {
  token = newToken;
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", newToken);
  }
};

// 🔥 Handle API response errors (e.g., expired token)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized! Token might be expired.");
      // Handle token refresh or redirect to login
    }
    return Promise.reject(error);
  }
);

export default api;
