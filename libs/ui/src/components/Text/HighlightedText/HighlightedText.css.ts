import { recipe } from '@bync/style';

export const highlightedTextStyles = recipe({
  variants: {
    overflow: {
      true: {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
      },
    },
  },
});
