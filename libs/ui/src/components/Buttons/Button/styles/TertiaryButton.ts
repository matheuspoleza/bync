import type { StyleRule } from '@bync/style';

import { colors } from '@/styles/theme';

export const tertiaryHoveringStyle: StyleRule = {
  border: `1px solid ${colors.accent.accent50}`,
};

export const tertiaryActiveStyle: StyleRule = {
  border: `1px solid ${colors.accent.accent500}`,
};

export const tertiaryButtonStyles: StyleRule = {
  border: `1px solid ${colors.neutralLight.neutralsLight100}`,

  selectors: {
    '&:enabled:hover': tertiaryHoveringStyle,
    '&:enabled:active': tertiaryActiveStyle,
  },
};
