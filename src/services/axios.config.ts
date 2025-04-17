import { env } from "@/lib/env.config";
import axios from "axios";
import { parseCookies } from "nookies";

const api = axios.create({
  baseURL: env.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const cookies = parseCookies();

  const isLocalhost =
    typeof window !== "undefined" && window.location.hostname === "localhost";

  const token = cookies.token || (isLocalhost ? env.TOKEN : undefined);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
