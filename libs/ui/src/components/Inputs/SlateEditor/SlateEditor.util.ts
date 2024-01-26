import type { CSSProperties } from 'react';
import type { Text } from 'slate';

import { rgbaToColorString } from '@/utils/colors/color.util';

import { ElementProperty, TextProperty } from './SlateEditor.constant';
import type { AnyElement } from './SlateEditor.interface';

export const getElementCSSProperties = (element: AnyElement): CSSProperties => {
  const textAlign = element[ElementProperty.TEXT_ALIGN] as CSSProperties['textAlign'];

  const styles: CSSProperties = {};

  if (textAlign) styles.textAlign = textAlign;

  return styles;
};

export const getTextCSSProperties = (text: Text): CSSProperties => {
  const color = text[TextProperty.COLOR];
  const isItalic = text[TextProperty.ITALIC];
  const fontWeight = text[TextProperty.FONT_WEIGHT];
  const fontFamily = text[TextProperty.FONT_FAMILY];
  const isUnderline = text[TextProperty.UNDERLINE];
  const isStrikeThrough = text[TextProperty.STRIKE_THROUGH];

  const styles: CSSProperties = {};

  if (color) styles.color = rgbaToColorString(color);
  if (isItalic) styles.fontStyle = 'italic';
  if (fontWeight) styles.fontWeight = Number(fontWeight);
  if (fontFamily) styles.fontFamily = `"${fontFamily}"`;

  if (isUnderline || isStrikeThrough) {
    let decoration = '';

    if (isUnderline) decoration += 'underline';
    if (isStrikeThrough) decoration += ' line-through';

    styles.textDecoration = decoration.trim();
  }

  return styles;
};
