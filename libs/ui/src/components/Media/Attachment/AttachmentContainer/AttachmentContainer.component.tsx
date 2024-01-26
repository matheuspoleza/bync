import { clsx } from '@bync/style';

import { attachmentContainerStyles } from './AttachmentContainer.css';
import type { IAttachmentContainer } from './types';

export const AttachmentContainer: React.FC<IAttachmentContainer> = ({
  testID,
  disabled = false,
  isActive = false,
  children,
  className,
  ...props
}) => {
  return (
    <button
      {...props}
      disabled={disabled}
      className={clsx(attachmentContainerStyles({ disabled, active: isActive }), className)}
      data-testid={testID}
    >
      {children}
    </button>
  );
};
