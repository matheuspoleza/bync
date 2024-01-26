import type { BaseProps } from '@/types';

import type { containerStyles } from './FormControlGroup.css';

export interface IFormControlGroupOption<T> {
  value: T;
  id: string;
  label: string;
  caption?: string;
  disabled?: boolean;
}

export interface IFormControlGroup extends BaseProps {
  label: string;
  className?: string;
  layout?: keyof typeof containerStyles;
  id?: string;
  children: JSX.Element | JSX.Element[];
}
