import type { PopperReferenceProps } from '@/main';

import type { ITooltip } from '../../Tooltip.interface';

export interface ITooltipOverflow extends Omit<ITooltip, 'width' | 'isOpen' | 'referenceElement'> {
  getWidth?: (node: HTMLElement) => number;
  isOverflow?: (node: HTMLElement) => boolean;
  referenceElement: (props: Omit<PopperReferenceProps, 'onToggle'>) => React.ReactNode;
}
