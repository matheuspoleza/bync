import { style } from '@bync/style';

import { Tokens } from '@/styles';

export const emptyStyle = style({
  fontSize: Tokens.typography.size[14],
  lineHeight: Tokens.typography.lineHeight[20],
  color: Tokens.colors.neutralDark.neutralsDark50,
  userSelect: 'none',
});
