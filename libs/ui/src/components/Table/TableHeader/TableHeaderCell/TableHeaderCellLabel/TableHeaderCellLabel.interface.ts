export interface ITableHeaderCellLabel extends React.PropsWithChildren, React.ComponentPropsWithoutRef<'div'> {
  active: boolean;
  sortable: boolean;
  descending: boolean;
  onIconClick?: React.MouseEventHandler<SVGSVGElement>;
}
