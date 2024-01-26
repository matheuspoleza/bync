import type { IconName } from '@bync/icons';

import type { BaseProps } from '@/types';

export interface ICircleButton extends BaseProps {
  iconName: IconName;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  isLoading?: boolean;
}
