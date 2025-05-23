import { z } from "zod";

export const userRegisterSchemaOne = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export const userRegisterSchemaTwo = z.object({
  name: z.string().min(3),
  level: z
    .string()
    .regex(/^\d{3}$/i, "Level must contain a 3 digit value eg. 100")
    .transform((value) => value + "L"),
});

export const userVerifyOTPSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 characters"),
  email: z.string().email(),
});

export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
