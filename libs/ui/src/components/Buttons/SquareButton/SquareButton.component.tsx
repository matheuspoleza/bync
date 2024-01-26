import * as Icons from '@bync/icons';
import { clsx } from '@bync/style';

import { LoadingSpinner } from '@/components/Other/LoadingSpinner';
import { forwardRef } from '@/hocs';

import { loadingSpinnerStyles, squareButtonStyles } from './styles/SquareButton.css';
import * as SquareButtonTheme from './styles/SquareButtonTheme.css';
import type { ISquareButton } from './types';

export const SquareButton = forwardRef<HTMLButtonElement, ISquareButton>('SquareButton')(
  (
    {
      size = 'xlarge',
      isActive,
      testID,
      variant = 'light',
      isHovering,
      iconName,
      isLoading,
      className,
      iconClassName,
      ...props
    },
    ref
  ) => {
    const IconToDisplay = iconName && Icons[iconName];

    return (
      <button
        {...props}
        ref={ref}
        className={clsx(squareButtonStyles({ size, isActive, isHovering }), SquareButtonTheme[variant], className)}
        data-testid={testID}
      >
        {isLoading ? (
          <LoadingSpinner className={loadingSpinnerStyles} testID={`${testID}--loading-spinner`} />
        ) : (
          <IconToDisplay className={iconClassName} height={24} width={24} data-testid={`${testID}--icon`} />
        )}
      </button>
    );
  }
);
