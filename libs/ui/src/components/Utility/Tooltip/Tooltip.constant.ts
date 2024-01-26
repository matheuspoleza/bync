import { DEFAULT_MODIFIERS } from '../Popper/Popper.constant';
import type { PopperModifiers } from '../Popper/Popper.interface';

export const TOOLTIP_DEFAULT_MODIFIERS: PopperModifiers<'preventOverflow' | 'flip' | 'offset' | 'arrow'> = [
  ...DEFAULT_MODIFIERS,
  {
    name: 'flip',
    options: {
      flipVariations: false,
      allowedAutoPlacements: [],
      fallbackPlacements: [],
    },
  },
  {
    name: 'offset',
    options: {
      offset: [0, 3],
    },
  },
  // on scroll this sticks the nub to the edge of the tooltip border
  // instead of it flying to the top of rounded border and breaking the ui
  {
    name: 'arrow',
    options: {
      padding: 10,
    },
  },
];
