export type Nullable<T> = T | null;

export type Nullish<T = unknown> = Nullable<T> | undefined;

export interface BaseProps {
  testID?: string;
}

export interface FormControlProps<T> {
  value: T;
  onValueChange?: (value: T) => void;
}

export interface RGBAColor {
  r: number;
  g: number;
  b: number;
  a: number;
}
