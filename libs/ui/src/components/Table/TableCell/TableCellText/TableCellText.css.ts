import { recipe } from '@bync/style';

import { Tokens } from '@/styles';
import { colors } from '@/styles/theme';

export const tableCellTextStyle = recipe({
  base: {
    color: colors.neutralDark.neutralsDark900,
    userSelect: 'none',
  },

  variants: {
    disabled: {
      true: {
        opacity: Tokens.opacity.opacity['0.65'],
      },
    },
  },
});
