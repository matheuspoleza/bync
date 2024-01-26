import type { IconName } from '@bync/icons';
import type { VariantProps } from '@bync/style';

import type { BaseProps, FormControlProps } from '@/types';

import type { inputStyleRecipe } from './styles/Input.css';

export interface IInput
  extends BaseProps,
    Omit<React.ComponentPropsWithoutRef<'input'>, 'value' | 'type'>,
    NonNullable<VariantProps<typeof inputStyleRecipe>>,
    FormControlProps<string> {
  type?: Exclude<React.HTMLInputTypeAttribute, 'button' | 'checkbox' | 'number' | 'radio' | 'range' | 'submit'>;
  error?: boolean;
  fullWidth?: boolean;
  containerRef?: React.Ref<HTMLDivElement>;
  iconClassName?: string;
  prefixIconName?: IconName;
  suffixIconName?: IconName;
  ellipsis?: boolean;
  prefixIconOnClick?: React.MouseEventHandler<SVGSVGElement>;
  suffixIconOnClick?: React.MouseEventHandler<SVGSVGElement>;
  containerClassName?: string;
}
