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

api.interceptors.request.use(async (config) => {
  const cookies = parseCookies();

  const token = cookies.token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const dynamicallySetToken = async (token?: string) => {
  if (!token) return;
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export default api;
