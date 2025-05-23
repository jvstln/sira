import { isAxiosError } from "axios";
import { clsx, type ClassValue } from "clsx";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
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

export function handleServerValidationError<T extends FieldValues>(
  error: unknown,
  form: UseFormReturn<T>
): void {
  if (
    isAxiosError(error) &&
    getErrorMessage(error)
      .toLowerCase()
      .replace(/ |-|_/g, "")
      .includes("validationerror")
  ) {
    (
      error.response?.data as {
        errors: { field: Path<T>; message: string }[];
      }
    ).errors.map((err) => {
      form.setError(err.field, { message: err.message }, { shouldFocus: true });
    });
  }
}
