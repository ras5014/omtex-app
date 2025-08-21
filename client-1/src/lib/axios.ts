import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";

// Create axios instance with base configuration
export const api = axios.create({
  baseURL: import.meta.env.VITE_STRAPI_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout
});

// Request Interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add authentication token if available
    // const token = localStorage.getItem("authToken");
    // if (token && config.headers) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }

    // Add timestamp for logging
    if (config.headers) {
      config.headers["X-Timestamp"] = new Date().toISOString();
    }

    if (import.meta.env.DEV) {
      console.log("Request: ", config.method?.toLocaleUpperCase(), config.url);
    }

    return config;
  },
  (error: AxiosError) => {
    console.error("Request error", error);
    return Promise.reject(error);
  }
);
