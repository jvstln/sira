"use client";
import { useEffect, useState } from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "./ui/form";
import {
  useForm,
  ControllerRenderProps,
  FieldValues,
  UseFormReturn,
} from "react-hook-form";
import { cn } from "@/lib/utils";
import {
  Eye,
  EyeOff,
  File,
  Image as ImageIcon,
  Trash2,
  UploadCloud,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import Image from "next/image";
import { InputProps } from "@/types/form.type";

interface FieldControl {
  form: ReturnType<typeof useForm>;
  field: ControllerRenderProps<FieldValues, string>;
  input: InputProps;
}

export const FileFieldControl: React.FC<FieldControl> = ({
  form,
  field,
  input,
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const selectedFile = form.watch(input.name);

  useEffect(() => {
    // Code responsible for previewing image files
    if (!selectedFile?.type?.startsWith("image") || input.multiple) {
      setImagePreview(null);
      return;
    }

    const imagePreviewURL = window.URL.createObjectURL(selectedFile);
    setImagePreview(imagePreviewURL);

    return () => window.URL.revokeObjectURL(imagePreviewURL);
  }, [selectedFile, input.multiple]);

  return (
    <div
      className={cn(
        "form-control-wrapper flex flex-col justify-center items-center relative cursor-pointer rounded-xl w-80 bg-zinc-700 p-2",
        input.multiple ? "min-h-60" : "h-60"
      )}
    >
      <input
        type="file"
        placeholder={input.placeholder}
        onBlur={field.onBlur}
        name={field.name}
        ref={field.ref}
        onChange={(e) => {
          const files = e.target.files;
          field.onChange(e);
          form.setValue(input.name, input.multiple ? files : files?.[0]);
        }}
        className={cn(
          "cursor-pointer absolute inset-0 h-auto opacity-0",
          input.classes?.input
        )}
        {...input.inputProps}
        multiple={input.multiple}
      />
      {!selectedFile ? (
        <div className="label text-white flex flex-col justify-center items-center gap-2 h-full ">
          {input.icon ?? <UploadCloud className="size-1/5" />}
          {input.placeholder ?? "Click to upload file"}
        </div>
      ) : imagePreview === null ? (
        <FilePreview
          files={
            selectedFile instanceof FileList
              ? Array.from(selectedFile)
              : [selectedFile]
          }
        />
      ) : (
        <Image
          src={imagePreview}
          alt="File Preview"
          className="image-preview w-full h-full object-cover rounded-xl"
          fill
        />
      )}

      {selectedFile && (
        <Button
          variant="destructive"
          size="icon"
          className="clear-input absolute right-1 bottom-1"
          aria-label="Clear file input"
          onClick={() => form.setValue(input.name, null)}
        >
          <Trash2 />
        </Button>
      )}
    </div>
  );
};

const FilePreview: React.FC<{ files: File[] }> = ({ files }) => (
  <div className="file-preview text-white flex flex-col justify-center items-center gap-2 h-full overflow-y-auto">
    {files.map((file) => (
      <div key={file.name + file.size} className="flex gap-2 border-b py-1">
        <div>{file.type.startsWith("image") ? <ImageIcon /> : <File />}</div>
        {file.name}
      </div>
    ))}
  </div>
);

export const SelectFieldControl: React.FC<FieldControl> = ({
  // form,
  field,
  input,
}) => {
  return (
    <Select
      onValueChange={field.onChange}
      defaultValue={field.value}
      {...input.inputProps}
    >
      <SelectTrigger className={cn(input.classes?.input)}>
        <SelectValue placeholder={input.placeholder} />
      </SelectTrigger>
      <SelectContent>
        {input.options?.map((option) => {
          const resolvedOption =
            typeof option == "string"
              ? {
                  label: option,
                  value: option,
                }
              : option;

          return (
            <SelectItem
              className="capitalize"
              key={resolvedOption.value}
              value={resolvedOption.value}
            >
              {resolvedOption.label}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export const TextareaFieldControl: React.FC<FieldControl> = ({
  // form,
  field,
  input,
}) => {
  return (
    <Textarea
      placeholder={input.placeholder}
      {...field}
      value={field.value ?? ""}
      className={cn(input.classes?.input)}
      {...input.inputProps}
    />
  );
};

export const PasswordFieldControl: React.FC<FieldControl> = ({
  // form,
  field,
  input,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        placeholder={input.placeholder}
        {...field}
        value={field.value ?? ""}
        className={cn(input.classes?.input)}
        {...input.inputProps}
      />

      <Button
        variant="ghost"
        size="icon"
        className="absolute top-1/2 right-0 -translate-y-1/2 [&_svg]:size-5"
        onClick={() => setShowPassword((prev) => !prev)}
        type="button"
      >
        {showPassword ? <EyeOff /> : <Eye />}
      </Button>
    </div>
  );
};
export const DefaultFieldControl: React.FC<FieldControl> = ({
  // form,
  field,
  input,
}) => {
  return (
    <Input
      type={input.type ?? "text"}
      placeholder={input.placeholder}
      {...field}
      value={field.value ?? ""}
      className={cn(input.classes?.input)}
      {...input.inputProps}
    />
  );
};

const controlMapping: Record<string, React.FC<FieldControl>> = {
  file: FileFieldControl,
  select: SelectFieldControl,
  textarea: TextareaFieldControl,
  password: PasswordFieldControl,
  text: DefaultFieldControl,
};

export const FormFieldWrapper: React.FC<{
  form: UseFormReturn<FieldValues>;
  input: InputProps;
  Control?: React.FC<FieldControl>;
}> = ({ form, input, Control }) => {
  const FieldControl =
    Control ?? controlMapping[input.type ?? "text"] ?? DefaultFieldControl;

  return (
    <FormField
      control={form.control}
      name={input.name}
      render={({ field }) => (
        <>
          <FormItem className={cn(input.classes?.main)}>
            <FormLabel
              className={cn(
                "form-label capitalize font-semibold",
                input.classes?.label
              )}
            >
              {input.label}
            </FormLabel>
            <FormControl>
              <FieldControl form={form} field={field} input={input} />
            </FormControl>
            <FormDescription className={input.classes?.description}>
              {input.description}
            </FormDescription>
            <FormMessage />
          </FormItem>
        </>
      )}
    />
  );
};
