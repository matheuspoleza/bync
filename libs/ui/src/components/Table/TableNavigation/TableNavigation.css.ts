import { style } from '@bync/style';

import { colors } from '@/styles/theme';

export const containerStyles = style({
  width: '100%',
  height: '56px',
  backgroundColor: colors.white[100],
});

export const leftContainerStyles = style({
  overflowX: 'scroll',
  scrollbarWidth: 'none',
  '::-webkit-scrollbar': {
    display: 'none',
  },
});

export const importTooltip = style({
  transform: 'translateX(-50%)',
});
