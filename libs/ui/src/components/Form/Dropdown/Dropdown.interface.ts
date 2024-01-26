import type { IconName } from '@bync/icons';
import type { VariantProps } from '@bync/style';

import type { IInputFormControl } from '@/components/Form/InputFormControl/types';
import type { IPopper } from '@/components/Utility/Popper/Popper.interface';
import type { BaseProps } from '@/types';

import type { inputStyleRecipe } from './styles/Dropdown.css';

export interface IDropdown
  extends BaseProps,
    VariantProps<typeof inputStyleRecipe>,
    Pick<IPopper<any>, 'inline' | 'children' | 'placement'>,
    Omit<IInputFormControl, 'children'>,
    Omit<React.ComponentPropsWithRef<'button'>, 'value' | 'type' | 'children'> {
  value: string | null;
  error?: boolean;
  width?: string;
  bordered?: boolean;
  prefixIconName?: IconName;
  onPrefixIconClick?: () => void;
}
