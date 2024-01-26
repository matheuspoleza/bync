import { style } from '@bync/style';

import { Theme } from '@/styles';
import { colors } from '@/styles/theme';

export const boxStyles = style({
  width: '100%',
  height: '56px',
  backgroundColor: colors.neutralLight.neutralsLight50,
  boxSizing: 'border-box',
});

export const regularStyles = style({
  fontWeight: Theme.vars.font.weight.bold,
  color: Theme.theme.color.font.dark,
});
