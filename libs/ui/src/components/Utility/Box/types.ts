import type { VariantProps } from '@bync/style';

import type { BaseProps } from '@/types';

import type { boxRecipe } from './Box.css';

export interface IBoxPaddingProps {
  pt?: React.CSSProperties['padding'];
  pl?: React.CSSProperties['padding'];
  pr?: React.CSSProperties['padding'];
  pb?: React.CSSProperties['padding'];
  px?: React.CSSProperties['padding'];
  py?: React.CSSProperties['padding'];
}
export interface IBoxMarginProps {
  mt?: React.CSSProperties['margin'];
  ml?: React.CSSProperties['margin'];
  mr?: React.CSSProperties['margin'];
  mb?: React.CSSProperties['margin'];
  mx?: React.CSSProperties['margin'];
  my?: React.CSSProperties['margin'];
}

export interface IBoxBase extends BaseProps, IBoxPaddingProps, IBoxMarginProps, React.ComponentPropsWithoutRef<'div'> {
  as?: React.ElementType;
  gap?: React.CSSProperties['gap'];
  grow?: React.CSSProperties['flexGrow'];
  width?: React.CSSProperties['width'];
  shrink?: React.CSSProperties['flexShrink'];
  height?: React.CSSProperties['height'];
  minWidth?: React.CSSProperties['minWidth'];
  maxWidth?: React.CSSProperties['maxWidth'];
  minHeight?: React.CSSProperties['minHeight'];
  maxHeight?: React.CSSProperties['maxHeight'];
}

export interface IBox extends IBoxBase, VariantProps<typeof boxRecipe> {}
