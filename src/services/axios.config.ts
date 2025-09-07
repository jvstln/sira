import { getErrorMessage } from "@/lib/utils";
import axios from "axios";
import { parseCookies } from "nookies";

const api = axios.create({
  baseURL: "https://new-sira-1.onrender.com/api/v1", 
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

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("Error: ", error.config.url, error.config.method, error);
    return Promise.reject({
      ...error,
      message: getErrorMessage(error),
    });
  }
);

export const dynamicallySetToken = async (token?: string) => {
  if (!token) return;
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export default api;
