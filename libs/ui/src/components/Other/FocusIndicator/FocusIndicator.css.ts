import { recipe } from '@bync/style';

import { inputTokens } from '@/styles/theme/components';

export const focusIndicator = recipe({
  base: {
    width: 2,
    height: '100%',
    borderRadius: '0 10px 10px 0',
    backgroundColor: inputTokens.colors.focusIndicator.default,
  },

  variants: {
    error: {
      true: {
        backgroundColor: inputTokens.colors.focusIndicator.error,
      },
    },
  },
});
