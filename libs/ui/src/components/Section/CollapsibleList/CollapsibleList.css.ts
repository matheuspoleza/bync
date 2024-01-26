import { recipe, style } from '@bync/style';

import { Tokens } from '@/styles';

export const contentStyle = style({
  overflow: 'clip',
});

export const footerStyle = recipe({
  base: {
    padding: '7px 0',
  },

  variants: {
    sticky: {
      true: {
        bottom: 0,
        position: 'sticky',
        background: Tokens.colors.white['100'],
      },
    },
  },
});
