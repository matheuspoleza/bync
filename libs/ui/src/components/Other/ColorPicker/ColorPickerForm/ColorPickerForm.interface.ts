import type { IBoxMarginProps } from '@/components/Utility/Box';
import type { BaseProps } from '@/types';

export type Colors = Array<string>;

export interface ICustomTheme {
  label: string;
  color: string;
}

export type CustomThemes = Array<ICustomTheme>;

export interface IRenderEntity {
  color: string;
}

export interface IColorPickerForm extends IBoxMarginProps, BaseProps {
  onChange: (color: string) => void;
  renderItem?: (props: IRenderEntity) => React.ReactElement;
  isDisabled?: boolean;
  debounceTime?: number;
  customThemes: CustomThemes;
  selectedColor?: string;
  onAddCustomTheme: (customTheme: ICustomTheme) => void;
  onUpdateCustomTheme: (customTheme: ICustomTheme) => void;
  onDeleteCustomTheme: (customTheme: ICustomTheme) => void;
}
