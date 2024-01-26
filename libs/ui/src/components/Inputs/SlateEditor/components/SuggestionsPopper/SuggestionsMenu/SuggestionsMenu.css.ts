import { recipe } from '@bync/style';

import { Tokens } from '@/styles';

export const addActionButtonContainer = recipe({
  variants: {
    searched: {
      true: {
        height: 'auto',
        padding: `${Tokens.spacing.spacing[4]} 0`,
      },
    },

    empty: {
      true: {
        borderTop: 'none',
      },
    },
  },
});
