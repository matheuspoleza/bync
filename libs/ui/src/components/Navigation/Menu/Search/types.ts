import type { IconName } from '@bync/icons';

import type { FormControlProps } from '@/types';

export interface ISearch extends FormControlProps<string>, Omit<React.ComponentPropsWithoutRef<'input'>, 'value'> {
  placeholder?: string;
  onSuffixIconClick?: React.MouseEventHandler<HTMLButtonElement>;
  suffixIconName?: IconName;
}
