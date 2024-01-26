import { style } from '@bync/style';

import { inputTokens } from '@/styles/theme/components';

export const inputStyles = style({
  border: inputTokens.borders.active.border,
  borderWidth: '2px !important',
  boxShadow: 'none !important',
});

export const containerStyle = style({
  width: 'calc(100% + 24px)',
  height: 'calc(100% + 32px)',
  margin: '-16px -12px',
});
