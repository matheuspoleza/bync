import { style } from '@bync/style';

export const pageStyles = style({
  position: 'relative',
});

export const fabStyles = style({
  position: 'absolute',
  bottom: 20,
  right: 20,
});

export const pageContent = style({
  overflowY: 'scroll',
  height: 'calc(100vh - 56px - 56px - 1px)',
});
