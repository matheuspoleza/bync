import type { IconName } from '@bync/icons';

import type { IButton } from '@/components/Buttons';

export interface IHeaderIconButton extends IButton {
  iconName: IconName;
}

export interface INotificationButton {
  count: number;
}
