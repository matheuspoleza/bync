import { style } from '@bync/style';

import { border } from '@/styles/theme';

export const surface = style({
  width: 'fit-content',
});

export const listStyles = style({
  borderRadius: border.radius[10],
  paddingTop: '4px',
  paddingBottom: '4px',
  overflowY: 'auto',
});
