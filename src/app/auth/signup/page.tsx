"use client";
import { useState } from "react";
import { FormFieldWrapper } from "@/components/form-elements";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import {
  userRegisterSchemaOne,
  userRegisterSchemaTwo,
} from "@/schemas/user.schema";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import {
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser } from "@/services/api/user.api";
import { UserRegister } from "@/types/user.type";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/utils";

const Signup = () => {
  const [step, setStep] = useState(1);
  const form = useForm<UserRegister>({
    resolver: zodResolver(
      step === 1 ? userRegisterSchemaOne : userRegisterSchemaTwo
    ),
  });
  const [successMessage, setSuccessMessage] = useState("");

  const onSubmit: SubmitHandler<UserRegister> = async () => {
    if (step === 1) {
      setStep(2);
      return;
    }

    const toastId = toast.loading("Registering...");
    try {
      const response = await registerUser(form.getValues());

      console.log(response);
      setSuccessMessage(response.message || "Registration successful");
      toast.success("Registration successful", { id: toastId });
    } catch (error) {
      toast.error("Registration failed", {
        id: toastId,
        description: getErrorMessage(error),
      });
    }
  };

  return (
    <div className="p-4">
      <Form {...form}>
        <Card
          className="max-w-150 mx-auto border-neutral-300 animate-in fade-in duration-500"
          key={step}
        >
          <CardHeader>
            <CardTitle>
              {step === 1 ? "Create an account" : "Tell us about you"}
            </CardTitle>
            <CardDescription>
              Fill in your details to be able to submit a report{" "}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {step === 1 ? (
                <>
                  <FormFieldWrapper
                    form={form as unknown as UseFormReturn<FieldValues>}
                    input={{
                      name: "email",
                      label: "Email",
                      placeholder: "example@gmail.com",
                    }}
                  />
                  <FormFieldWrapper
                    form={form as unknown as UseFormReturn<FieldValues>}
                    input={{
                      name: "password",
                      label: "Password",
                      type: "password",
                    }}
                  />
                  <FormFieldWrapper
                    form={form as unknown as UseFormReturn<FieldValues>}
                    input={{
                      name: "confirmPassword",
                      label: "Confirm Password",
                      type: "password",
                    }}
                  />
                </>
              ) : (
                <>
                  <FormFieldWrapper
                    form={form as unknown as UseFormReturn<FieldValues>}
                    input={{
                      name: "name",
                      label: "Name",
                      placeholder: "John Doe",
                    }}
                  />
                  <FormFieldWrapper
                    form={form as unknown as UseFormReturn<FieldValues>}
                    input={{
                      name: "level",
                      label: "Level",
                      placeholder: "100L",
                    }}
                  />
                </>
              )}
              <Button
                className="w-full mt-6"
                type="submit"
                disabled={form.formState.isSubmitting}
              >
                {step === 1 ? "Proceed" : "Sign Up"}
                {form.formState.isSubmitting && (
                  <Loader2 className="animate-spin" />
                )}
              </Button>
              {step !== 1 && (
                <Button
                  variant="ghost"
                  className="self-start mt-2 text-primary"
                  onClick={() => setStep(step - 1)}
                >
                  Go back
                </Button>
              )}
            </form>
          </CardContent>
          <CardFooter className="font-medium flex-col gap-4 text-center">
            {step === 1 && (
              <>
                <div>
                  Already have an account?{" "}
                  <Link
                    href="/auth/login"
                    className="hover:underline text-primary"
                  >
                    Login
                  </Link>
                </div>
                <div className="flex self-stretch items-center gap-4">
                  <hr className="grow border-neutral-300" />
                  Or
                  <hr className="grow border-neutral-300" />
                </div>
                <Button variant="outline">
                  Continue with <img src="/images/google.svg" alt="Google" />
                </Button>
              </>
            )}
          </CardFooter>
        </Card>
      </Form>

      <Dialog
        open={!!successMessage}
        onOpenChange={(value) => {
          if (!value) setSuccessMessage("");
        }}
      >
        <DialogContent className="text-center">
          <DialogTitle>Verify your email</DialogTitle>
          <DialogDescription>{successMessage}</DialogDescription>
          <DialogFooter className="sm:flex-col text-center gap-2">
            <Button asChild>
              <Link href={`/auth/verify-user?email=${form.getValues("email")}`}>
                Enter OTP
              </Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Signup;
