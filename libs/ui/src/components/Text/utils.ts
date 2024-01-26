import type { IText } from './types';

const TEXT_VARIANTS = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  basic: 'p',
  p: 'p',
  caption: 'p',
  subcaption: 'p',
  fieldCaption: 'p',
  fieldLabel: 'p',
  code: 'code',
  codeLarge: 'code',
  tableHeader: 'span',
} satisfies Record<NonNullable<IText['variant']>, keyof JSX.IntrinsicElements>;

export const getHTMLElementByVariant = (variant: IText['variant']) => TEXT_VARIANTS[variant || 'basic'];
