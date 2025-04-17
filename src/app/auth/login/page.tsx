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
import { getErrorMessage } from "@/lib/utils";
import { userLoginSchema } from "@/schemas/user.schema";
import { loginUser } from "@/services/api/user.api";
import { useCurrentUser } from "@/services/hooks/use-user";
import { UserLogin } from "@/types/user.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { toast } from "sonner";

const Login = () => {
  const { user, isLoading } = useCurrentUser();
  const form = useForm<UserLogin>({
    resolver: zodResolver(userLoginSchema),
  });
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="absolute inset-0 bg-primary/10 flex justify-center items-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (user) {
    toast.success("Login successful", {
      description: "Redirecting to dashboard...",
      id: "login-success",
    });
    router.push("/dashboard");
    return null;
  }

  const onSubmit: SubmitHandler<UserLogin> = async (values) => {
    try {
      const response = await loginUser(values);
      console.log(response);
      toast.success(response.message, {
        description: "Redirecting to dashboard...",
      });
      router.push("/dashboard");
    } catch (error) {
      console.log("Error logging in", error);
      toast.error("Login failed", {
        description: getErrorMessage(error),
      });
    }
  };

  return (
    <div className="p-4">
      <Form {...form}>
        <Card className="max-w-150 mx-auto border-neutral-300 animate-in fade-in duration-500">
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
              Continue with <img src="/images/google.svg" alt="Google" />
            </Button>
          </CardFooter>
        </Card>
      </Form>
    </div>
  );
};

export default Login;
