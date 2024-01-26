import type { ISquareButton } from '@/components/Buttons';
import { SquareButton } from '@/components/Buttons';

export interface IModalHeaderSecondaryButton extends ISquareButton {}

export const ModalHeaderSecondaryButton: React.FC<IModalHeaderSecondaryButton> = (props) => {
  return (
    <SquareButton {...props} iconName={props.iconName ?? 'More'} testID={`${props.testID}--modal-header-button`} />
  );
};
