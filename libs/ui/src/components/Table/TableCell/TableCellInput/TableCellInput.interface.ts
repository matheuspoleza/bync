export interface ITableCellInput extends React.HTMLProps<HTMLInputElement> {
  value: string;
  onSave: (newValue: string) => void;
  transform?: (value: string) => string;
}
