import { style } from '@bync/style';

import { Theme, Tokens } from '@/styles';

export const containerStyle = style({
  width: '256px',
  height: '100%',
  backgroundColor: Tokens.colors.neutralDark.neutralsDark600,
  overflow: 'auto',
});

export const agentNameStyle = style({
  color: Tokens.colors.neutralLight.neutralsLight50,
  fontWeight: Theme.vars.font.weight.bold,
});

export const headerStyle = style({
  paddingLeft: '22px',
  paddingRight: '24px',
});
