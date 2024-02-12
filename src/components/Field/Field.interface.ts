export interface IFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder: string;
  inputType?: 'number' | 'text';
}
