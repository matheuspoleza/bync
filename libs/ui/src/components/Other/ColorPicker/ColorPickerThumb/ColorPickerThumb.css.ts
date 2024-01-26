import { style } from '@bync/style';

import { animation, colors, createTransition, shadows } from '@/styles/theme';

const fastTransition = createTransition({
  duration: animation.duration.fast,
  timingFunction: animation.timingFunction.easeOut,
});

const shadow = `${shadows.hueSelectorHandle.default}, ${shadows.hueSelectorHandle.outer}`;
export const handleStyles = style({
  width: '20px',
  height: '20px',
  borderRadius: '50%',
  position: 'absolute',
  outline: 'none',
  boxShadow: shadow,
  border: `5px solid ${colors.white[100]}`,
  transition: fastTransition(['scale']),
  selectors: {
    '&:focus, &:visited, &:focus-visible, &:not([tabindex="-1"]):focus-visible': {
      outline: 'none',
      boxShadow: shadow,
    },

    '&:hover': {
      cursor: 'grab',
      transition: fastTransition(['scale']),
      scale: '1.1',
    },
    '&:active': { cursor: 'grabbing', scale: '1.1', outline: 'none' },
    '&::after': {
      content: '""',
      position: 'absolute',
      width: '22px',
      height: '22px',
      borderRadius: '50%',
      border: `1px solid ${colors.black[6]}`,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
  },
});
