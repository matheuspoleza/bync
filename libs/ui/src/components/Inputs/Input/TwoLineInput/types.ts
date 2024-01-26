import type { IInput } from '@/components/Inputs/Input';
import type { BaseProps } from '@/types';

export interface ITwoLineInput extends BaseProps {
  firstLineProps: IInput & { ref?: React.Ref<HTMLInputElement> };
  secondLineProps: IInput & { ref?: React.Ref<HTMLInputElement> };
  hideSecondLineOnBlur?: boolean;
}
