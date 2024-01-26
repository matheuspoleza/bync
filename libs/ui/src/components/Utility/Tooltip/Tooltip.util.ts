import type { Placement } from '@popperjs/core';

import type { IPaddingUtility } from './Tooltip.interface';

export const getArrowOrientation = (placement: Placement) => {
  if (placement.includes('left')) return 'left';
  if (placement.includes('bottom')) return 'bottom';
  if (placement.includes('right')) return 'right';

  return 'top';
};

// these shifts are eyeballed but they work
const SHIFT_X = -10;
const SHIFT_Y = 24;

export const getArrowOffset = (placement: Placement, offset: [number, number]) => {
  if (placement.includes('left')) return [SHIFT_X, offset[1]];
  if (placement.includes('right')) return [SHIFT_X, offset[1]];

  return [SHIFT_Y, offset[1]];
};

export const getPaddings = (size: string, { pt, pb, pl, pr, px, py }: IPaddingUtility) => {
  if (size === 'default') {
    return { pt: pt ?? py ?? 8, pb: pb ?? py ?? 7, pl: pl ?? px ?? 12, pr: pr ?? px ?? 12 };
  }

  if (size === 'large') {
    return { pt: pt ?? py ?? 13, pb: pb ?? py ?? 12, pl: pl ?? px ?? 20, pr: pr ?? px ?? 20 };
  }

  return { pt: 8, pb: 7, pl: 12, pr: 12 };
};
