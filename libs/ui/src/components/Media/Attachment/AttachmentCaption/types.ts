export interface IAttachmentCaption extends React.PropsWithChildren {
  className?: string;
  onClick?: () => void;
  testID?: string;
  style?: React.CSSProperties;
  overflow?: boolean;
}
