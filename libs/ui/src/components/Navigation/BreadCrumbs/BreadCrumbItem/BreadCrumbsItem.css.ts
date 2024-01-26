import { recipe, style } from '@bync/style';

import { Theme } from '@/styles';
import { breadCrumbTokens } from '@/styles/theme/components';

export const breadCrumbItemContainer = style({
  userSelect: 'none',
  display: 'flex',
});

export const breadCrumbTextRecipe = recipe({
  base: {
    marginRight: '6px',
    alignItems: 'flex-end',
    display: 'flex',
  },
  variants: {
    isLast: {
      true: {
        fontWeight: Theme.vars.font.weight.bold,
        color: breadCrumbTokens.colors.last,
        marginRight: '0',
        cursor: 'default',
        selectors: {
          '&:hover': {
            color: breadCrumbTokens.colors.last,
            textDecoration: 'none',
            textDecorationColor: 'transparent',
          },
        },
      },
    },
  },
});

export const dividerStyle = style({
  color: breadCrumbTokens.colors.default,
  marginRight: '6px',
});
