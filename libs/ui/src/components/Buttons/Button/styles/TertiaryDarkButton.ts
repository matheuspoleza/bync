import type { StyleRule } from '@bync/style';

import { colors } from '@/styles/theme';

export const tertiaryDarkHoveringStyle: StyleRule = {
  border: `1px solid ${colors.neutralDark.neutralsDark400}`,
};

export const tertiaryDarkActiveStyle: StyleRule = {
  border: `1px solid ${colors.neutralDark.neutralsDark200}`,
};

export const tertiaryDarkButtonStyles: StyleRule = {
  border: `1px solid ${colors.neutralDark.neutralsDark300}`,

  selectors: {
    '&:enabled:hover': tertiaryDarkHoveringStyle,
    '&:enabled:active': tertiaryDarkActiveStyle,
  },
};
