import type { FormControlProps } from '@/types';

export interface ISearchInput
  extends Omit<React.ComponentPropsWithoutRef<'input'>, 'value' | 'type'>,
    FormControlProps<string> {
  type?: Exclude<React.HTMLInputTypeAttribute, 'button' | 'checkbox' | 'number' | 'radio' | 'range' | 'submit'>;
  testID?: string;
  fullWidth?: boolean;
  /**
   * @param {React.ChangeEvent<HTMLInputElement>} event
   * Note: this does not fire when the input is cleared via the icon or via ESC key
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClear?: () => void;
  containerRef?: React.Ref<HTMLDivElement>;
  containerClassName?: string;
}
