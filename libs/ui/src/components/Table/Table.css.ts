import { style } from '@bync/style';

export const tableStyles = style({
  flex: 1,
  display: 'flex',
  overflowX: 'hidden',
  flexDirection: 'column',
});

export const tableScrollStyles = style({
  width: '100%',
  height: '100%',
  overflowX: ['hidden', 'clip'],
  overflowY: 'auto',
});
