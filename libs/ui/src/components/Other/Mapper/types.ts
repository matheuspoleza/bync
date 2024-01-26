import type { BaseProps } from '@/types';

export interface IMapper extends BaseProps {
  equalityIcon?: 'equal' | 'arrow';
  className?: string;
  leftHandSide: React.ReactNode;
  rightHandSide: React.ReactNode;
}
