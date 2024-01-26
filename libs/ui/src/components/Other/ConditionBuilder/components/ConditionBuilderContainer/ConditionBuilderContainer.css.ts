import { style } from '@bync/style';

import { border, colors, shadows } from '@/styles/theme';

export const surfaceContainerStyles = style({
  borderRadius: border.radius[10],
  background: colors.white[100],
  boxShadow: shadows.surfaceShadows.z32Light,
});
