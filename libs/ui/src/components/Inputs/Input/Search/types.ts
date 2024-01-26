import type { VariantProps } from '@bync/style';

import type { FormControlProps } from '@/types';

import type { inputStyleRecipe } from './styles/SearchInput.css';

export interface ISearchInput
  extends Omit<React.ComponentPropsWithoutRef<'input'>, 'value' | 'type'>,
    NonNullable<VariantProps<typeof inputStyleRecipe>>,
    FormControlProps<string> {
  type?: Exclude<React.HTMLInputTypeAttribute, 'button' | 'checkbox' | 'number' | 'radio' | 'range' | 'submit'>;
  testID?: string;
  fullWidth?: boolean;
  autoFocus?: boolean;
  /**
   * @param {React.ChangeEvent<HTMLInputElement>} event
   * Note: this does not fire when the input is cleared via the icon or via ESC key
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClear?: () => void;
  containerRef?: React.Ref<HTMLDivElement>;
  containerClassName?: string;
  /**
   * @default false
   * @description Whether to animate icon on first render. Disables 'flickering' of icon on tab change.
   */

  withIconAnimation?: boolean;
}
