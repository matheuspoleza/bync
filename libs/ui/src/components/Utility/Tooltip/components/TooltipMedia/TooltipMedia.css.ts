import { recipe, styleVariants } from '@bync/style';

import { border } from '@/styles/theme';

import { leftOffsetVar, rightOffsetVar } from '../../Tooltip.css';

export const variants = styleVariants({
  top: {
    borderTopLeftRadius: border.radius[7],
    borderTopRightRadius: border.radius[7],
  },
  bottom: {
    borderBottomLeftRadius: border.radius[7],
    borderBottomRightRadius: border.radius[7],
  },
});

export const mediaRecipe = recipe({
  base: {
    width: `calc(100% + ${leftOffsetVar} + ${rightOffsetVar})`,
    marginLeft: `calc(${leftOffsetVar} * -1)`,
    marginRight: `calc(${rightOffsetVar} * -1)`,
  },
  variants: { variant: variants },
});
