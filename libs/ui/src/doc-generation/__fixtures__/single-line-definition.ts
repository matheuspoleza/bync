interface IInput {
  type?: Exclude<React.HTMLInputTypeAttribute, 'button' | 'checkbox' | 'number' | 'radio' | 'range' | 'submit'>;
  error?: boolean;
  fullWidth?: boolean;
  containerRef?: React.Ref<HTMLDivElement>;
  iconClassName?: string;
  prefixIconOnClick?: React.MouseEventHandler<SVGSVGElement>;
  suffixIconOnClick?: React.MouseEventHandler<SVGSVGElement>;
  containerClassName?: string;
}

export interface ITextField extends IInput {}
