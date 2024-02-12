export interface IOption {
  value: string;
  label: string;
}

export interface ISelectProps {
  value?: string;
  placeholder?: string;
  onChange: (val: string) => void;
  options: IOption[];
}
