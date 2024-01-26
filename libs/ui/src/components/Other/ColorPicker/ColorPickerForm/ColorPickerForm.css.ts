import { style } from '@bync/style';

import { Theme } from '@/styles';
import { colors } from '@/styles/theme';

export const colorThemeTextStyle = style({
  fontWeight: Theme.vars.font.weight.bold,
  fontSize: Theme.vars.font.size.field,
  lineHeight: Theme.vars.font.lineHeight.field,
  color: colors.neutralDark.neutralsDark100,
});
