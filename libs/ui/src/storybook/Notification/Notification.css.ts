import { style } from '@bync/style';

import { Tokens } from '@/styles';

export const notificationStyles = style({
  position: 'fixed',
  top: 0,
  right: 0,
  margin: '1rem 1rem auto auto',
  borderRadius: Tokens.border.radius[8],
  border: `2px solid ${Tokens.colors.accent.accent600}`,
  zIndex: 100,
});
