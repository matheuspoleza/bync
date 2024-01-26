import type { ComplexStyleRule } from '@bync/style';
import { createVar, recipe, styleVariants } from '@bync/style';

import { border, colors } from '@/styles/theme';

export const leftOffsetVar = createVar();
export const rightOffsetVar = createVar();
export const bottomOffsetVar = createVar();

const toooltipBase: ComplexStyleRule = {
  vars: {
    [leftOffsetVar]: '12px',
    [rightOffsetVar]: '12px',
    [bottomOffsetVar]: '7px',
  },
  borderRadius: border.radius[7],
  color: colors.neutralLight.neutralsLight50,
  position: 'relative',
  overflow: 'hidden',
};

export const arrowContainerOrientation = styleVariants({
  left: { left: '100%' },
  top: { top: '100%' },
  bottom: {},
  right: {},
});

export const arrowContainerRecipe = recipe({
  variants: { orientation: arrowContainerOrientation },
});

const tooltipVariants = styleVariants({
  basic: {
    backgroundColor: colors.neutralDark.neutralsDark500,
  },
  alert: { backgroundColor: colors.alert.alert700 },
  success: { backgroundColor: colors.success.success600 },
});

export const tooltipRecipe = recipe({
  base: toooltipBase,
  variants: {
    variant: tooltipVariants,
  },
});
