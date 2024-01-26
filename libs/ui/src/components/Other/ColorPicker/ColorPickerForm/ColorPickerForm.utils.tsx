import type { Colors, CustomThemes } from './ColorPickerForm.interface';
import { ALL_COLORS } from './constants';

export const colorsToTheme = (colors: Colors): CustomThemes => colors.map((color) => ({ color, label: '' }));

export const mergeThemes = (allLocalThemes: CustomThemes, customThemes: CustomThemes): CustomThemes => {
  const colorMap = new Map([...allLocalThemes, ...customThemes].map((item) => [item.color, item.label]));

  return Array.from(colorMap, ([color, label]) => ({ color, label }));
};

export const isLocalColor = (color: string): boolean => ALL_COLORS.includes(color);
