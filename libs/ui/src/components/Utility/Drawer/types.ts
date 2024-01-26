import type { BaseProps } from '@/types';

export interface IDrawer extends BaseProps {
  children: React.ReactNode;
  isOpen: boolean;
  className?: string;
  width?: number;
}
