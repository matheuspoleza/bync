import * as Icons from '@bync/icons';
import { clsx } from '@bync/style';

import { LoadingSpinner } from '@/components/Other/LoadingSpinner';
import { forwardRef } from '@/hocs';

import { buttonRecipe, labelLoadingModifier } from './styles/Button.css';
import { buttonIconStyle, spinnerStyle } from './styles/ButtonIcon.css';
import * as ButtonTheme from './styles/ButtonTheme.css';
import type { IButton } from './types';

export const Button = forwardRef<HTMLButtonElement, IButton>('Button')(
  (
    {
      size = 'large',
      label,
      testID,
      isActive,
      variant = 'primary',
      isHovering,
      iconName,
      children,
      isLoading,
      className,
      fullWidth,
      ...props
    },
    ref
  ) => {
    if (!label && !iconName) {
      // eslint-disable-next-line no-console
      console.error('⚠️ You must provide either a label or an icon name to the button component');
    }

    const IconToDisplay = iconName && Icons[iconName];
    const stylesForButton = buttonRecipe({ size, isActive, variant, noLabel: !label, isHovering, fullWidth });

    return (
      <button
        {...props}
        ref={ref}
        className={clsx(stylesForButton, ButtonTheme[variant], className)}
        data-testid={testID}
      >
        {isLoading && (
          <LoadingSpinner
            size="medium"
            className={clsx(buttonIconStyle, spinnerStyle)}
            testID={`${testID}--loading-spinner`}
          />
        )}
        {IconToDisplay && !isLoading && (
          <IconToDisplay className={buttonIconStyle} width="24px" height="24px" data-testid={`${testID}--icon`} />
        )}
        {label && <span className={labelLoadingModifier({ isLoading })}>{label}</span>}
        {children}
      </button>
    );
  }
);
