import type { ReactNode } from 'react';

import type { BaseProps } from '@/types';

export interface IInputFormControl extends BaseProps {
  children: ReactNode;
  id?: string;
  label?: string;
  caption?: JSX.Element | string;
  errorMessage?: string;
}
