import { style, styleVariants } from '@bync/style';

import { inputTokens } from '@/styles/theme/components';

export const labelStyle = style({
  color: inputTokens.colors.label.default,
  marginTop: '0',
  paddingBottom: '6px',
});

export const labelContainer = style({
  width: 'fit-content',
  display: 'flex',
});

export const labelStyles = styleVariants({
  base: [
    labelStyle,
    {
      width: 'fit-content',
    },
  ],
  error: [
    labelStyle,
    {
      color: inputTokens.colors.label.error,
      marginTop: '6px',
      paddingBottom: '0',
    },
  ],
  caption: [
    labelStyle,
    {
      color: inputTokens.colors.label.caption,
      marginTop: '6px',
      paddingBottom: '0',
    },
  ],
});
