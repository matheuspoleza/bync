import { clsx } from '@bync/style';

import { Icon } from '@/components/Media/Icon';
import { Text } from '@/components/Text';
import { Box } from '@/components/Utility/Box';
import { forwardRef } from '@/hocs';

import {
  captionStyles,
  checkboxContainer,
  containerStyle,
  hotKeyStyles,
  labelStyles,
  leftSectionStyles,
  prefixIconRecipe,
  suffixIconStyles,
  textContent,
} from './MenuItem.css';
import type { IMenuItem } from './types';

export const MenuItem = forwardRef<HTMLDivElement, IMenuItem>('MenuItem')(
  (
    {
      label,
      caption,
      checkbox,
      prefixIconName,
      disabled = false,
      isHovering,
      suffixIconName,
      className,
      hotKeys,
      searchValue,
      testID,
      children,
      maxWidth,
      ...props
    },
    ref
  ) => {
    const containerClassName = containerStyle({ disabled, isHovering });
    const prefixIconStyles = prefixIconRecipe({ disabled });

    return (
      <Box
        ref={ref}
        justify="space-between"
        className={clsx(containerClassName, className)}
        style={{ maxWidth }}
        testID={testID}
        {...props}
      >
        <Box className={leftSectionStyles}>
          {prefixIconName && <Icon name={prefixIconName} className={prefixIconStyles} viewBox="4 4 16 16" />}
          {checkbox && <div className={checkboxContainer}>{checkbox}</div>}
          <div className={textContent}>
            <Text.Highlighted
              text={label}
              highlight={searchValue}
              className={labelStyles}
              testID={`${testID}--label`}
            />

            <Text variant="caption" className={captionStyles} testID={`${testID}--caption`}>
              {caption}
            </Text>
          </div>
        </Box>
        {hotKeys && <span className={hotKeyStyles}>{hotKeys}</span>}
        {suffixIconName && !disabled && (
          <Icon name={suffixIconName} className={suffixIconStyles} height={24} width={24} />
        )}
        {children}
      </Box>
    );
  }
);
