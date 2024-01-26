import type { IconName } from '@bync/icons';

import type { ISquareButton } from '@/components/Buttons/SquareButton';

export interface IMenuItemWithButton extends Omit<React.ComponentPropsWithoutRef<'div'>, 'ref'> {
  label: React.ReactNode;
  prefixIconName?: IconName;
  className?: string;
  searchValue?: string;
  testID?: string;
  isHovering?: boolean;
  disabled?: boolean;
  suffixButton?: ISquareButton;
}
