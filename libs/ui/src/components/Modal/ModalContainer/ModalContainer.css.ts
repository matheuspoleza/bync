import { createVar, style } from '@bync/style';

import { border, colors, shadows } from '@/styles/theme';

export const widthVar = createVar();

export const containerStyles = style({
  boxShadow: shadows.surfaceShadows.z64Light,
  borderRadius: border.radius[12],
  backgroundColor: colors.white[100],
  overflow: 'hidden',
  position: 'relative',
  width: widthVar,
});
