export interface IMenu extends React.PropsWithChildren {
  width?: React.CSSProperties['width'];
  listRef?: React.Ref<HTMLDivElement>;
  maxWidth?: React.CSSProperties['maxWidth'];
  minWidth?: React.CSSProperties['minWidth'];
  maxHeight?: React.CSSProperties['maxHeight'];
  className?: string;
  searchSection?: React.ReactNode;
  actionButtons?: React.ReactNode;
  numberOfItemsToShow?: number;
}
