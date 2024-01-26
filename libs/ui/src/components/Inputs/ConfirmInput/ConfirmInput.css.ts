import { style } from '@bync/style';

import { border } from '@/styles/theme';
import { inputTokens } from '@/styles/theme/components';

export const inputFieldStyle = style({
  borderRadius: `${border.radius[8]} ${border.radius[8]} 0 0`,
  border: inputTokens.borders.default.border,
  minHeight: '20px',
  padding: '8px 15px 6px',
  selectors: {
    '&:focus': {
      boxShadow: `inset ${inputTokens.shadows.focus}`,
      border: inputTokens.borders.active.border,
    },
  },
});
