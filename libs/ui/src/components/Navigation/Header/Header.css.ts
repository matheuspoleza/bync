import type { ComplexStyleRule } from '@bync/style';
import { recipe, styleVariants } from '@bync/style';

import { Tokens } from '@/styles';
import { colors } from '@/styles/theme';

export const baseHeaderStyles: ComplexStyleRule = {
  display: 'flex',
  alignItems: 'center',
  paddingTop: '8px',
  paddingRight: '8px',
  paddingBottom: '8px',
  gap: '10px',
  width: '100%',
  height: '56px',
};

export const kindVariants = styleVariants({
  default: {
    backgroundColor: colors.neutralDark.neutralsDark800,
  },
  primaryNavigation: {
    boxShadow: '0px -1px 0px 0px #191D22 inset',
    backgroundColor: Tokens.colors.neutralDark.neutralsDark800,
  },
  secondaryNavigation: {
    boxShadow: '0px -1px 0px 0px #1F2429 inset',
    backgroundColor: Tokens.colors.neutralDark.neutralsDark700,
  },
});

export const headerVariants = styleVariants({
  default: {
    paddingLeft: '8px',
  },
  search: {
    paddingLeft: '20px',
  },
  buttons: {
    paddingLeft: '12px',
  },
});

export const headerStyles = recipe({
  base: baseHeaderStyles,
  variants: {
    kind: kindVariants,
    variant: headerVariants,
  },
});
