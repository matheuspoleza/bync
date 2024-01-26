import type { VariantProps } from '@bync/style';

import type { BaseProps } from '@/types';

import type { IPopper } from '../Popper/Popper.interface';
import type { tooltipRecipe } from './Tooltip.css';

export interface ITooltipBase extends BaseProps, IPopper<any> {
  // it makes sense to have it in this interface bc it's not a VE prop
  size?: 'default' | 'large';
  width?: number;
  height?: number;
  hasArrow?: boolean;
  className?: string;
  hasArrowShift?: boolean;
  tooltipClassName?: string;
}

export interface IPaddingUtility {
  pt?: number;
  pb?: number;
  pl?: number;
  pr?: number;
  px?: number;
  py?: number;
}

export interface ITooltip extends ITooltipBase, IPaddingUtility, VariantProps<typeof tooltipRecipe> {}
