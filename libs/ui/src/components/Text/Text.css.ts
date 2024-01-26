import type { VariantStyleRules } from '@bync/style';
import { recipe } from '@bync/style';

import { Theme } from '@/styles';

const baseTextStyles = {
  fontFamily: Theme.vars.font.family.default,
  margin: '0',
};

export const textVariants = {
  variant: {
    h1: {
      fontSize: Theme.vars.font.size.h1,
      lineHeight: Theme.vars.font.lineHeight.h1,
      marginBottom: Theme.vars.spacing.lg,
    },
    h2: {
      fontSize: Theme.vars.font.size.h2,
      lineHeight: Theme.vars.font.lineHeight.h2,
      fontWeight: Theme.vars.font.weight.extraBold,
    },
    h3: {
      fontSize: Theme.vars.font.size.h3,
      lineHeight: Theme.vars.font.lineHeight.h3,
      fontWeight: Theme.vars.font.weight.extraBold,
    },
    h4: {
      fontSize: Theme.vars.font.size.h4,
      lineHeight: Theme.vars.font.lineHeight.h4,
      fontWeight: Theme.vars.font.weight.extraBold,
    },
    basic: {
      fontSize: Theme.vars.font.size.default,
      lineHeight: Theme.vars.font.lineHeight.basic,
    },
    p: {
      fontSize: Theme.vars.font.size.default,
      lineHeight: Theme.vars.font.lineHeight.paragraph,
    },
    caption: {
      fontSize: Theme.vars.font.size.caption,
      lineHeight: Theme.vars.font.lineHeight.caption,
    },
    subcaption: {
      fontSize: Theme.vars.font.size.subcaption,
      lineHeight: Theme.vars.font.lineHeight.subcaption,
    },
    fieldCaption: {
      fontSize: Theme.vars.font.size.field,
      lineHeight: Theme.vars.font.lineHeight.field,
    },
    fieldLabel: {
      fontSize: Theme.vars.font.size.field,
      fontWeight: Theme.vars.font.weight.bold,
      lineHeight: Theme.vars.font.lineHeight.field,
    },
    code: {
      fontSize: Theme.vars.font.size.code,
      lineHeight: Theme.vars.font.lineHeight.code,
      fontFamily: Theme.vars.font.family.code,
    },
    codeLarge: {
      fontSize: Theme.vars.font.size.codeLarge,
      lineHeight: Theme.vars.font.lineHeight.codeLarge,
      fontFamily: Theme.vars.font.family.code,
    },
    tableHeader: {
      fontSize: Theme.vars.font.size.tableHeader,
      lineHeight: Theme.vars.font.lineHeight.tableHeader,
      fontWeight: Theme.vars.font.weight.bold,
    },
  },
  underlined: {
    true: {
      textDecoration: 'underline',
    },
  },
  overflow: {
    true: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
  },
  weight: {
    regular: { fontWeight: Theme.vars.font.weight.regular },
    semiBold: { fontWeight: Theme.vars.font.weight.bold },
    bold: { fontWeight: Theme.vars.font.weight.extraBold },
    code: { fontWeight: Theme.vars.font.weight.code },
    inherit: { fontWeight: 'inherit' },
  },
  breakWord: {
    true: {
      overflowWrap: 'anywhere',
    },
  },
  align: {
    left: {
      textAlign: 'left',
    },
    center: {
      textAlign: 'center',
    },
    right: {
      textAlign: 'right',
    },
  },
} satisfies VariantStyleRules;

export const textStyles = recipe({
  base: baseTextStyles,
  variants: textVariants,
});
