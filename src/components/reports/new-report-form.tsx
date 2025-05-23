"use client";
import { FieldValues, useForm, UseFormReturn } from "react-hook-form";
import { getErrorMap, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, UploadCloud } from "lucide-react";
import {
  newReportFormSchema,
  type NewReportFormValues,
} from "@/schemas/report.schema";
import { FormFieldWrapper } from "../form-elements";
import { createReport } from "@/services/api/report.api";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/utils";

const NewReportForm = () => {
  const form = useForm<NewReportFormValues>({
    resolver: zodResolver(newReportFormSchema),
    defaultValues: {
      description: "",
      issueType: "",
      location: "",
    },
  });

  const onSubmit = async (data: NewReportFormValues) => {
    try {
      const response = await createReport(data);
      console.log(response);
      toast.success("Report created successfully");
      form.reset();
    } catch (error) {
      console.error("Error creating report", error);
      toast.error("Failed to create report", {
        description: getErrorMessage(error),
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 w-full max-w-2xl mx-auto p-4"
      >
        <FormField
          control={form.control}
          name="issueType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Issue type</FormLabel>
              <div className="space-y-2">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an issue type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="security">Security</SelectItem>
                    <SelectItem value="cleanliness">Cleanliness</SelectItem>
                    <SelectItem value="noise">Noise</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>

                {!["maintenance", "security", "cleanliness", "noise"].includes(
                  field.value
                ) && (
                  <FormControl>
                    <Input
                      placeholder="Please specify the issue type"
                      onChange={(e) =>
                        field.onChange(e.target.value.toLowerCase())
                      }
                    />
                  </FormControl>
                )}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="Enter location" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="files"
          render={({ field: { value, onChange, ...field } }) => (
            <FormItem>
              <FormLabel>Evidence</FormLabel>
              <FormControl>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="evidence-upload"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:hover:bg-gray-800 dark:bg-gray-700 border-gray-600 hover:border-gray-500"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <UploadCloud className="w-8 h-8 mb-3 text-gray-400" />
                      {value && value.length > 0 ? (
                        <div className="space-y-1">
                          {Array.from(value).map((file, index) => (
                            <p
                              key={index}
                              className="text-sm text-gray-500 dark:text-gray-400"
                            >
                              {file.name}
                            </p>
                          ))}
                        </div>
                      ) : (
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          Click to upload
                        </p>
                      )}
                    </div>
                    <input
                      id="evidence-upload"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      multiple
                      onChange={(e) => onChange(e.target.files)}
                      {...field}
                    />
                  </label>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the issue..."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <>
              <Loader2 className="animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default NewReportForm;
