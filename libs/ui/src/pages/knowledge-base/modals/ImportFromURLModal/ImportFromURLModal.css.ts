import { style } from '@bync/style';

export const textareaStyles = style({
  minHeight: '60px',
  width: '100%',
  overflowY: 'auto',
  overflowX: 'hidden',
  // TODO replace by a special component
  maxHeight: 'calc(100vh - (32px * 2) - 56px - 81px - 60px - 50px - 24px - 20px - 24px - 32px)',
});

export const submitButtonStyles = style({
  width: 85,
});
