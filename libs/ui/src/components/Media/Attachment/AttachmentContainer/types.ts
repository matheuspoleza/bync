export interface IAttachmentContainer extends React.ComponentPropsWithRef<'button'> {
  testID?: string;
  isActive?: boolean;
  disabled?: boolean;
}
