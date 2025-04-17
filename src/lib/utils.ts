import { isAxiosError } from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getErrorMessage(error: unknown) {
  return isAxiosError(error)
    ? error.response?.data.message ?? error.message
    : error instanceof Error
    ? error.message
    : String(error);
}
