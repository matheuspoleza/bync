import { recipe } from '@bync/style';

export const tableCellLinkRecipe = recipe({
  base: {
    userSelect: 'none',
  },
  variants: {
    isSelectable: {
      true: {
        userSelect: 'text',
      },
    },
  },
});
