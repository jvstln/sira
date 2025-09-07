"use client";
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
import { Form } from "@/components/ui/form";
import { getErrorMessage, handleServerValidationError } from "@/lib/utils";
import { userLoginSchema } from "@/schemas/user.schema";
import { loginUser } from "@/services/api/user.api";
import { UserLogin } from "@/types/user.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import {
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { toast } from "sonner";

const Login = () => {
  const form = useForm<UserLogin>({
    resolver: zodResolver(userLoginSchema),
  });
  const router = useRouter();

  const onSubmit: SubmitHandler<UserLogin> = async (values) => {
    try {
      const response = await loginUser(values);
      toast(response.message, {
        description: "Login Successful",
        id: "login-success",
      });
      // router.push("/dashboard");
      window.location.assign('/dashboard')
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      console.log("Error logging in", error);
      toast.error("Login failed", {
        description: errorMessage,
      });

      handleServerValidationError(error, form);
    }
  };

  return (
    <div className="p-4">
      <Form {...form}>
        <Card className="max-w-150 mx-auto border-neutral-300">
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Log in to report facility issues in your department
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)}>
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
              <Link
                href="/auth/reset-password"
                className="text-primary hover:underline block w-fit ml-auto text-sm"
              >
                Forgot password?
              </Link>
              <Button
                className="w-full mt-6"
                type="submit"
                disabled={form.formState.isSubmitting}
              >
                Log In{" "}
                {form.formState.isSubmitting && (
                  <Loader2 className="animate-spin" />
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="font-medium flex-col gap-4 text-center">
            <div>
              Don&apos; have an account?{" "}
              <Link
                href="/auth/signup"
                className="hover:underline text-primary"
              >
                Sign up
              </Link>
            </div>
            <div className="flex self-stretch items-center gap-4">
              <hr className="grow border-neutral-300" />
              Or
              <hr className="grow border-neutral-300" />
            </div>
            <Button variant="outline">
              Continue with{" "}
              <Image
                src="/images/google.svg"
                alt="Google"
                width={65}
                height={22}
              />
            </Button>
          </CardFooter>
        </Card>
      </Form>
    </div>
  );
};

export default Login;
