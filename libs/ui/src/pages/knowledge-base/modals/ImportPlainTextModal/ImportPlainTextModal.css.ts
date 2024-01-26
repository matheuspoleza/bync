import { style } from '@bync/style';

export const textStyles = style({
  minHeight: 104,
  // the last 32 needs testing
  overflowY: 'auto',
  overflowX: 'hidden',
  maxHeight: 'calc(100vh - (32px * 2) - 56px - 81px - 60px - 16px - 24px - 20px - 24px - 32px)',
});

export const submitButtonStyles = style({ width: 85 });
