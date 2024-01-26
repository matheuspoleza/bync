import { clsx } from '@bync/style';

import { SquareButton } from '@/components/Buttons/SquareButton/SquareButton.component';
import { Icon } from '@/components/Media/Icon';
import { Text } from '@/components/Text';
import { Box } from '@/components/Utility/Box';
import { forwardRef } from '@/hocs';

import { labelStyles, prefixIconStyles } from '../MenuItem.css';
import { containerStyle, relativeContainerBox, suffixButtonModifiers, textContent } from './MenuItemWithButton.css';
import type { IMenuItemWithButton } from './types';

export const MenuItemWithButton = forwardRef<HTMLDivElement, IMenuItemWithButton>('MenuItem')(
  (
    {
      label,
      prefixIconName,
      disabled = false,
      isHovering,
      className,
      searchValue,
      testID,
      children,
      suffixButton,
      ...props
    },
    ref
  ) => {
    const containerClassName = containerStyle({ disabled, isHovering });
    return (
      <Box className={relativeContainerBox}>
        <Box
          ref={ref}
          justify="space-between"
          className={clsx(containerClassName, className)}
          testID={testID}
          {...props}
        >
          <Box>
            {prefixIconName && <Icon name={prefixIconName} className={prefixIconStyles} viewBox="4 4 16 16" />}
            <Box className={clsx(textContent({ hasSuffixButton: !!suffixButton }))}>
              <Text.Highlighted
                className={labelStyles}
                text={label}
                highlight={searchValue}
                testID={`${testID}--label`}
              />
            </Box>
          </Box>
          {children}
        </Box>
        {!!suffixButton && (
          <SquareButton
            size="large"
            disabled={disabled}
            iconName={suffixButton.iconName}
            onClick={suffixButton?.onClick}
            className={suffixButtonModifiers({ isHovering })}
            testID={`${testID}--suffix-button`}
          />
        )}
      </Box>
    );
  }
);
