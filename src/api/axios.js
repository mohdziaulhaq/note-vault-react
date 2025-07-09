import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach token if present
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("JWT_TOKEN");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
