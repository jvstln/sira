"use client";
import {
  CardContent,
  CardDescription,
  CardTitle,
  CardHeader,
  Card,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPSeparator,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Form } from "@/components/ui/form";
import {
  FieldValues,
  useForm,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { FormFieldWrapper } from "@/components/form-elements";
import { useSearchParams } from "next/navigation";
import { userVerifyOTPSchema } from "@/schemas/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserVerifyOTP } from "@/types/user.type";
import { verifyUser } from "@/services/api/user.api";
import { Suspense, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { getErrorMessage } from "@/lib/utils";
import { toast } from "sonner";
import Link from "next/link";

const VerifyUser = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const form = useForm<UserVerifyOTP>({
    resolver: zodResolver(userVerifyOTPSchema),
    defaultValues: {
      email: email || "",
    },
  });

  const [successMessage, setSuccessMessage] = useState("");

  const onSubmit: SubmitHandler<UserVerifyOTP> = async (values) => {
    try {
      const response = await verifyUser(values);
      setSuccessMessage(response.message);
      toast.success("OTP verified successfully", {
        description: response.message,
      });
    } catch (error) {
      console.log("Error verifying user", error);
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <div className="p-4">
      <Form {...form}>
        <Card className="max-w-150 mx-auto border-neutral-300 animate-in fade-in duration-500">
          <CardHeader>
            <CardTitle>Please check your email</CardTitle>
            <CardDescription>
              We have sent a code to your email address. Enter the code below.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormFieldWrapper
                form={form as unknown as UseFormReturn<FieldValues>}
                input={{ name: "email", label: "Email" }}
              />

              <FormFieldWrapper
                form={form as unknown as UseFormReturn<FieldValues>}
                input={{ name: "otp", label: "Enter OTP: " }}
                Control={({ field }) => (
                  <InputOTP
                    maxLength={6}
                    containerClassName="justify-center"
                    {...field}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                )}
              />

              <Button
                className="w-full mt-6"
                type="submit"
                disabled={form.formState.isSubmitting}
              >
                Verify OTP
                {form.formState.isSubmitting && (
                  <Loader2 className="animate-spin" />
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Form>

      <Dialog
        open={!!successMessage}
        onOpenChange={(value) => {
          if (!value) setSuccessMessage("");
        }}
      >
        <DialogContent>
          <DialogTitle>Success</DialogTitle>
          <DialogDescription>{successMessage}</DialogDescription>
          <DialogFooter>
            <Button asChild>
              <Link href="/auth/login">Proceed to login</Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const VerifyUserSuspenseWrapper = () => {
  return (
    <Suspense
      fallback={
        <div className="absolute inset-0 bg-primary/10 flex justify-center items-center">
          <Loader2 className="animate-spin" />
        </div>
      }
    >
      <VerifyUser />
    </Suspense>
  );
};

export default VerifyUserSuspenseWrapper;
