export interface ITableHeaderCell {
  type: string;
  name: React.ReactNode;
  render?: () => React.ReactNode;
  sortable?: boolean;
}
