import type { BaseProps } from '@/types';

export interface IActionButtons extends BaseProps {
  className?: string;
  firstButton: JSX.Element;
  secondButton?: JSX.Element;
}
