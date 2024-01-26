import type { VariantProps } from '@bync/style';
import { clsx } from '@bync/style';
import type { SVGProps } from 'react';

import { forwardRef } from '@/hocs/forwardRef.hoc';

import { arrowRecipe, pathRecipe } from './TooltipArrow.css';

interface ITooltipArrow
  extends Omit<SVGProps<SVGElement>, 'orientation' | 'ref'>,
    VariantProps<typeof pathRecipe>,
    VariantProps<typeof arrowRecipe> {}

export const TooltipArrow = forwardRef<SVGSVGElement, ITooltipArrow>('TooltipArrow')(
  ({ className, orientation = 'top', style, variant = 'basic' }, ref) => {
    const pathStyles = pathRecipe({ variant });
    const svgStyles = arrowRecipe({ orientation });

    return (
      <svg
        ref={ref}
        style={style}
        className={clsx(svgStyles, className)}
        width="3"
        height="9"
        viewBox="0 0 3 9"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.00073 0V9C3.00073 8.11692 2.61166 7.17195 1.93719 6.60193L0.354531 5.26439C-0.118176 4.86489 -0.118153 4.13627 0.35458 3.7368L1.93704 2.3996C2.6116 1.82958 3.00073 0.883148 3.00073 0Z"
          className={pathStyles}
        />
      </svg>
    );
  }
);
