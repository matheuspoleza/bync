import type { ComplexStyleRule } from '@bync/style';
import { recipe, styleVariants } from '@bync/style';

import { animation, colors, transition } from '@/styles/theme';
import { shadesGlows } from '@/styles/theme/tokens/shadows';

export const statusVariants = styleVariants({
  done: { backgroundColor: colors.success.success500 },
  todo: { backgroundColor: colors.alert.alert600 },
  'in-progress': { backgroundColor: colors.havelock.havelock500 },
  default: { backgroundColor: colors.neutralLight.neutralsLight400 },
});

const statusBulletStyles: ComplexStyleRule = {
  content: ' ',
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  boxShadow: shadesGlows['0100Outer'][12],
  backgroundColor: colors.white[100],
};

export const statusIndicatorRecipe = recipe({
  base: {
    display: 'inline-block',
    position: 'relative',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    transition: `background-color ${animation.timingFunction.default} ${transition}`,
    selectors: {
      '&::after': statusBulletStyles,
    },
  },
  variants: { status: statusVariants },
});
