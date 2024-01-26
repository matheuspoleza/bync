import type { BaseProps } from '@/types';

export interface IImage extends BaseProps, React.ComponentProps<'img'> {
  src: string;
}
