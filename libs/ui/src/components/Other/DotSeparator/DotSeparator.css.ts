import { recipe, style } from '@bync/style';

import { colors } from '@/styles/theme';

export const baseSeparator = style({
  display: 'block',
  width: '2px',
  height: '2px',
  borderRadius: '50%',
  backgroundColor: colors.neutralDark.neutralsDark100,
});

export const separatorStyle = recipe({
  base: baseSeparator,
  variants: {
    light: {
      true: {
        backgroundColor: colors.neutralLight.neutralsLight500,
      },
    },
    thick: {
      true: {
        width: '4px',
        height: '4px',
      },
    },
  },
});
