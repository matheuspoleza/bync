import { recipe } from '@bync/style';

import { Tokens } from '@/styles';

export const iconStyles = recipe({
  variants: {
    stylesApplied: {
      true: {
        color: Tokens.colors.accent.accent500,
      },
    },
  },
});
