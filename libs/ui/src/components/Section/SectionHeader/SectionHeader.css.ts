import { recipe, style, styleVariants } from '@bync/style';

import { Theme } from '@/styles';

import * as SectionHeaderTheme from './SectionHeaderTheme.css';

export const headerVariants = styleVariants({
  active: {
    color: SectionHeaderTheme.contract.color.header.active,
  },
  basic: {},
  disabled: {
    color: SectionHeaderTheme.contract.color.header.disabled,
    cursor: 'not-allowed',
  },
});

export const titleStyles = style({
  marginRight: '16px',
  userSelect: 'none',
  fontWeight: Theme.vars.font.weight.bold,
  color: SectionHeaderTheme.contract.color.title.default,

  selectors: {
    [`${headerVariants.basic}:hover &`]: {
      color: SectionHeaderTheme.contract.color.title.hover,
    },
    [`${headerVariants.active}  &`]: {
      color: SectionHeaderTheme.contract.color.title.active,
    },
    [`${headerVariants.disabled}  &`]: {
      cursor: 'not-allowed',
      color: SectionHeaderTheme.contract.color.title.disabled,
    },
  },
});

export const headerRecipe = recipe({
  base: {
    height: '36px',
    width: '100%',
    backgroundColor: SectionHeaderTheme.contract.color.background.default,
    padding: '8px 16px 8px 24px',
  },
  variants: {
    variant: headerVariants,
    canClick: {
      true: {
        cursor: 'pointer',
      },
    },
  },
});
