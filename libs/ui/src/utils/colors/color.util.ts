import { parseToRgb, rgbToColorString } from 'polished';

import { colors } from '@/styles/theme/tokens';
import type { RGBAColor } from '@/types';

import type { HSLShades } from './hsl.util';
import { COLOR_GRADES, createShadesFromHue } from './hsl.util';
import { hexToHsluv } from './hsluv.util';

export { opacify } from 'polished';

const RGBA_REGEX = /^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i;
const HEX_REGEX = /^#(?:(?:[\da-f]{3}){1,2}|(?:[\da-f]{4}){1,2})$/i;

export const defaultColors = {
  havelock: '#5B9FD7',
  fern: '#56B365',
  copper: '#DC8879',
  hibiscus: '#CB627B',
  neutral: '#515A63',
};

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

export const RGBAToHex = (rgba: string): string => {
  const parsedRGBA = rgba.match(RGBA_REGEX);
  const parseSubcolor = (subcolor: string) => `0${parseInt(subcolor, 10).toString(16)}`.slice(-2);

  if (parsedRGBA && parsedRGBA.length === 4) {
    return `#${parseSubcolor(parsedRGBA[1])}${parseSubcolor(parsedRGBA[2])}${parseSubcolor(parsedRGBA[3])}`;
  }

  return '';
};

export const removeHashFromHex = (hex: string) => (hex.startsWith('#') ? hex.substr(1) : hex);

export const normalizeColor = (color: string): string => {
  if (isRGBColor(color)) return RGBAToHex(color);

  if (isHexColor(color)) return color;

  const ctx = document.createElement('canvas').getContext('2d') as CanvasRenderingContext2D;

  ctx.fillStyle = color;

  return ctx.fillStyle;
};

export const createCustomPalette = (colors: string[]) =>
  COLOR_GRADES.reduce((acc, grade, i) => {
    acc[grade] = colors[i];

    return acc;
  }, {} as HSLShades);

export const createColorPalette = (color: string | undefined): HSLShades => {
  const normalizedColor = normalizeColor(color ?? colors.neutralDark.neutralsDark200);

  return createShadesFromHue(String(hexToHsluv(normalizedColor)[0]));
};
