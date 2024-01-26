import type { BaseProps, FormControlProps } from '@/types';

export interface IToggle extends BaseProps, FormControlProps<boolean> {
  variant?: 'light' | 'dark';
  disabled?: boolean;
  id?: string;
}
