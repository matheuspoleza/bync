import { style } from '@bync/style';

import { Theme } from '@/styles';
import { inputTokens } from '@/styles/theme/components';

export const placeholderStyle = style({
  fontFamily: Theme.vars.font.family.default,
  fontSize: Theme.vars.font.size.default,
  fontWeight: Theme.vars.font.weight.regular,
  color: inputTokens.colors.text.default.placeholder,
  fontStyle: 'normal',
  textDecoration: 'none',
  whiteSpace: 'nowrap',
  opacity: '1 !important',
});
