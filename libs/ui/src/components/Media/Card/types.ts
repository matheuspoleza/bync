import type { IconName } from '@bync/icons';

export interface ICard {
  title: string;
  imageSrc?: string;
  iconName?: IconName;
  description: string;
  learnMoreLink: string;
  primaryButtonLabel?: string;
  secondaryButtonLabel?: string;
  onPrimaryButtonClick?: React.MouseEventHandler<HTMLButtonElement>;
  onSecondaryButtonClick?: React.MouseEventHandler<HTMLButtonElement>;
  onClose?: React.MouseEventHandler<HTMLButtonElement>;
  hasVerticalButtons?: boolean;
}
