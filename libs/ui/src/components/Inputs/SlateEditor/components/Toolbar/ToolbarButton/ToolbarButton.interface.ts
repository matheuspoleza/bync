import type { ISquareButton } from '@/components/Buttons';

export interface IToolbarButton extends Omit<ISquareButton, 'size'> {
  isHovering?: boolean;
  canRemove?: boolean;
  stylesApplied?: boolean;
}
