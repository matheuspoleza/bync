import type { IconName } from '@bync/icons';

export interface IAttachmentPreview {
  testID?: string;
  className?: string;
  icon: IconName;
  hoverIcon?: IconName;
  onClick?: () => void;
}
