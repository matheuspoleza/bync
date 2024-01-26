import type { ComplexStyleRule } from '@bync/style';
import { createVar, recipe, style, styleVariants } from '@bync/style';

import { Theme } from '@/styles';
import { colors } from '@/styles/theme';

import { AlertVariant } from './AlertIndicator/AlertIndicator.css';

export const decorationWrapStyles = style({
  position: 'relative',
  display: 'inline-block',
});

export const outlineVar = createVar();
export const topVar = createVar();
export const leftVar = createVar();
export const rightVar = createVar();

const decorationVariants = styleVariants({
  alert: {
    ...AlertVariant,
    vars: { [topVar]: '-1px', [rightVar]: '-1px', [leftVar]: 'unset', [outlineVar]: colors.white[100] },
    top: topVar,
    left: leftVar,
    right: rightVar,
    border: `1px solid ${outlineVar}`,
  },
  basic: {
    vars: {
      [outlineVar]: colors.white[100],
      [topVar]: '-4px',
      [leftVar]: 'unset',
      [rightVar]: 'unset',
    },
    top: topVar,
    left: leftVar,
    right: rightVar,
    color: colors.accent.accent600,
    fontWeight: 600,
    textShadow: `${outlineVar} -1px -1px 0px, ${outlineVar} 1px -1px 0px, ${outlineVar} -1px 1px 0px, ${outlineVar} 1px 1px 0px`,
  },
});

const baseStyles: ComplexStyleRule = {
  position: 'absolute',
  fontFamily: Theme.vars.font.family.default,
  fontSize: '11px',
  lineHeight: '15px',
};

export const indicatorRecipe = recipe({
  base: baseStyles,
  variants: { variant: decorationVariants },
});
