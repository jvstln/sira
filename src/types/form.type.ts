export interface InputProps {
  name: string;
  type?: string;
  label?: string;
  description?: string;
  placeholder?: string;
  items?: InputProps[]; // For flex items
  options?: string[] | { label: string; value: string }[]; // For select input
  icon?: React.ReactElement;
  classes?: {
    main?: string;
    input?: string;
    label?: string;
    description?: string;
    message?: string;
  };
  inputProps?: { [key: string]: string | number | boolean | undefined | null };
  required?: boolean;
  multiple?: boolean; // For files
}
