export interface FormField {
  name: string;
  type: string;
  label: string;
  required: boolean;
  options?: string[];
}

export interface FormConfig {
  fields: FormField[];
}

export interface FormData {
  id: string;
  type: FormType;
  [key: string]: string | number;
}

export type FormType = 'userInfo' | 'address' | 'payment';

export interface Toast {
  message: string;
  type: 'success' | 'error' | 'info';
}