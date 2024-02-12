export interface ISearchProps {
  value: string;
  onChange: (val: string) => void;
  options: { label: string; value: string }[];
}

export interface ISearchState {
  search: string;
  hideOptions: boolean;
}
