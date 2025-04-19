import { UserLogin, UserRegister, UserVerifyOTP } from "@/types/user.type";
import api from "../axios.config";

export const registerUser = async (data: UserRegister) => {
  const response = await api.post("/auth/user", data);
  return response.data;
};

export const verifyUser = async (data: UserVerifyOTP) => {
  const response = await api.post("/auth/user/verify", data);
  return response.data;
};

export const loginUser = async (data: UserLogin) => {
  const response = await api.post("/auth/user/login", data);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get("/auth/user/me");
  return response.data;
};

export const logoutUser = async () => {
  const response = await api.post("/auth/user/logout");
  return response.data;
};
