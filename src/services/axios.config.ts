import axios from "axios";
import { parseCookies } from "nookies";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  formSerializer: {
    indexes: null,
  },
});

api.interceptors.request.use((config) => {
  const cookies = parseCookies();

  const isLocalhost =
    typeof window !== "undefined" && window.location.hostname === "localhost";

  const token = cookies.token || (isLocalhost ? process.env.TOKEN : undefined);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
