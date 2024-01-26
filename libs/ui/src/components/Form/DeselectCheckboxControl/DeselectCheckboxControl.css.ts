import { style } from '@bync/style';

import { animation, border, colors, createTransition } from '@/styles/theme';

const fastTransition = createTransition({
  duration: animation.duration.fast,
  timingFunction: animation.timingFunction.easeOut,
});

export const deselectIconStyles = style({
  selectors: {
    '&::before': {
      content: ' ',
      boxSizing: 'content-box',
      width: '6px',
      height: '1.5px',
      borderRadius: border.radius[5],
      backgroundColor: colors.neutralLight.neutralsLight50,
      opacity: 1,
      zIndex: 1,
      border: `2px solid ${colors.accent.accent600}`,
      transition: fastTransition(['opacity']),
    },
  },
});
