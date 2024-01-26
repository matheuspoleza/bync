import type { IButton } from '@/components/Buttons';
import { Button } from '@/components/Buttons';

export const ModalFooterButton: React.FC<Omit<IButton, 'size'>> = ({ testID, ...props }) => {
  return <Button {...props} size="large" testID={`${testID}--${props.variant ?? 'primary'}-footer-button`} />;
};
