import type { VariantProps } from '@bync/style';
import { assignInlineVars } from '@bync/style';

import { forwardRef } from '@/hocs';
import type { BaseProps } from '@/types';

import { colorVar, previewBorderRecipe, previewRecipe } from './ColorPreview.css';

export interface IColorPreview
  extends BaseProps,
    React.ComponentPropsWithoutRef<'div'>,
    VariantProps<typeof previewRecipe> {
  isActive?: boolean;
  isDisabled?: boolean;
  color?: string;
}

export const ColorPreview = forwardRef<HTMLDivElement, IColorPreview>('ColorPreview')(
  ({ variant, color, style, isActive = false, size = 'small', testID, onClick, isDisabled = false, ...props }, ref) => {
    const borderStyles = previewBorderRecipe({ size, isActive, variant, isDisabled });
    const centerStyles = previewRecipe({ variant, size, isDisabled });

    const inlineStyles = color ? assignInlineVars({ [colorVar]: color }) : {};
    const clickProp = isDisabled ? null : { onClick };
    return (
      <div
        {...props}
        {...clickProp}
        ref={ref}
        className={borderStyles}
        style={{ ...style, ...inlineStyles }}
        data-testid={`${testID}--color-preview`}
      >
        <div className={centerStyles} />
      </div>
    );
  }
);
