import { userLoginSchema, userVerifyOTPSchema } from "@/schemas/user.schema";
import { z } from "zod";

export interface UserRegister {
  name: string;
  email: string;
  password: string;
  level: string;
  confirmPassword: string;
}

export type UserVerifyOTP = z.infer<typeof userVerifyOTPSchema>;

export type UserLogin = z.infer<typeof userLoginSchema>;

export interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  status: boolean;
}
