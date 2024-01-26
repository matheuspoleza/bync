import type { VariantProps } from '@bync/style';
import { assignInlineVars, clsx } from '@bync/style';

import { decorationWrapStyles, indicatorRecipe, leftVar, outlineVar, rightVar, topVar } from './UpdatesIndicator.css';
import { getInlineStyles } from './utils';

interface IUpdatesIndicatorBase extends React.ComponentPropsWithoutRef<'span'> {
  label?: string;
  outline?: string;
  top?: number;
  left?: number;
  right?: number;
  testID?: string;
}

export type IUpdatesIndicator = IUpdatesIndicatorBase & VariantProps<typeof indicatorRecipe>;

export const UpdatesIndicator: React.FC<IUpdatesIndicator> = ({
  children,
  variant = 'basic',
  label,
  className,
  top,
  right,
  left,
  outline,
  style,
  testID,
  ...props
}) => {
  const variantStyles = indicatorRecipe({ variant });

  const inline = getInlineStyles({ [topVar]: top, [rightVar]: right, [leftVar]: left, [outlineVar]: outline });
  const inlineStyles = assignInlineVars(inline);

  return (
    <span className={decorationWrapStyles} data-testid={`${testID}--indicator-box`}>
      <span
        {...props}
        style={{ ...inlineStyles, ...style }}
        className={clsx(variantStyles, className)}
        data-testid={`${testID}--indicator`}
      >
        {label}
      </span>
      {children}
    </span>
  );
};
