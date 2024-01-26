import { parseToRgb, rgbToColorString } from 'polished';

import type { RGBAColor } from '@/types';

export { opacify } from 'polished';

const RGBA_REGEX = /^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i;
const HEX_REGEX = /^#(?:(?:[\da-f]{3}){1,2}|(?:[\da-f]{4}){1,2})$/i;

export const colorStringToRGBA = (colorString: string): RGBAColor => {
  const polishedRGB = parseToRgb(colorString);

  return {
    r: polishedRGB.red,
    g: polishedRGB.green,
    b: polishedRGB.blue,
    a: 'alpha' in polishedRGB ? polishedRGB.alpha : 1,
  };
};

export const rgbaToColorString = (color: RGBAColor): string =>
  rgbToColorString({ red: color.r, green: color.g, blue: color.b, alpha: color.a });

export const isEqualRGBA = (colorA: RGBAColor, colorB: RGBAColor) =>
  colorA.r === colorB.r && colorA.g === colorB.g && colorA.b === colorB.b && colorA.a === colorB.a;

export const isHexColor = (color: string): boolean => RegExp(HEX_REGEX).test(color);
export const isRGBColor = (color: string): boolean => RegExp(RGBA_REGEX).test(color);

export const removeHashFromHex = (hex: string) => (hex.startsWith('#') ? hex.substr(1) : hex);
