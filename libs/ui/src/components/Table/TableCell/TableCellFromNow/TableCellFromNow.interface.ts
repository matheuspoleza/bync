export interface ITableCellFromNow {
  date: string;
  label: (props: { label: string }) => React.ReactNode;
}
