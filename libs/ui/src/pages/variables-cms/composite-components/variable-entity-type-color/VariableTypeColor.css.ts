import { recipe } from '@bync/style';

export const variableStyles = recipe({
  base: { alignSelf: 'end' },
  variants: {
    isVisible: {
      false: { visibility: 'hidden' },
    },
  },
});
