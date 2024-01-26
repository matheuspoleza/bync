import type { BaseProps } from '@/types';

export interface IVirtualizedContent extends BaseProps, React.ComponentPropsWithoutRef<'div'> {
  start: number;
  totalSize: number;
  contentStyle?: React.CSSProperties;
  contentClassName?: string;
}
