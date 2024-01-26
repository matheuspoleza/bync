import type { CustomThemes, ICustomTheme } from '../ColorPickerForm.interface';

export interface IColorList {
  gap?: number;
  size?: 'large' | 'small';
  themes: CustomThemes;
  isDisabled?: boolean;
  selectedColor: string;
  onColorSelect: (color: string) => void;
  onUpdateCustomTheme?: (customTheme: ICustomTheme) => void;
  onDeleteCustomTheme?: (customTheme: ICustomTheme) => void;
}
