import type { ISquareButton } from '@/components/Buttons/SquareButton';
import { SquareButton } from '@/components/Buttons/SquareButton/SquareButton.component';
import { forwardRef } from '@/hocs/forwardRef.hoc';

import { sectionButtonStyles } from './SectionHeaderButton.css';

export const SectionHeaderButton = forwardRef<HTMLButtonElement, ISquareButton>('SectionHeaderButton')(
  ({ iconName, disabled, variant, testID, ...props }, ref) => {
    // This conditional is a result of a lack of spec for the a "dark" SectionHeader
    if (variant === 'dark') {
      return (
        <SquareButton
          {...props}
          ref={ref}
          iconName={iconName}
          size="medium"
          variant="dark"
          disabled={disabled}
          testID={`${testID}--section-header-button`}
        />
      );
    }

    return (
      <SquareButton
        {...props}
        ref={ref}
        iconName={iconName}
        size="medium"
        variant="light"
        disabled={disabled}
        className={sectionButtonStyles}
        testID={`${testID}--section-header-button`}
      />
    );
  }
);
