import { forwardRef } from '@/hocs';
import type { BaseProps } from '@/types';

import { handleStyles } from './ColorPickerThumb.css';

export interface IColorPickerThumb extends BaseProps {
  style?: React.CSSProperties;
  color?: string;
  className?: string;
}

export const ColorPickerThumb = forwardRef<HTMLDivElement, IColorPickerThumb>('ColorPickerThumb')(
  ({ testID, color, style, ...props }, ref) => {
    const inlineStlyes = { backgroundColor: color ?? 'rgba(0,0,0,0)' };
    return (
      <div
        className={handleStyles}
        style={{ ...style, ...inlineStlyes }}
        ref={ref}
        data-testid={`${testID}--thumb`}
        {...props}
      />
    );
  }
);
