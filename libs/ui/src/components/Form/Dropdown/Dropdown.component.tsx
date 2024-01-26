import { clsx } from '@bync/style';
import React from 'react';

import { InputFormControl } from '@/components/Form/InputFormControl';
import { Icon } from '@/components/Media/Icon';
import { MenuProvider } from '@/components/Navigation/Menu/Menu.context';
import { Box } from '@/components/Utility/Box';
import { Popper } from '@/components/Utility/Popper';
import { usePopperModifiers } from '@/hooks';

import type { IDropdown } from './Dropdown.interface';
import { inputContainer, inputStyleRecipe } from './styles/Dropdown.css';
import { iconStyleRecipe } from './styles/DropdownIcon.css';
import * as DropdownTheme from './styles/DropdownTheme.css';

export const Dropdown: React.FC<IDropdown> = ({
  error = false,
  value,
  label,
  width,
  weight,
  inline,
  testID,
  variant = 'primary',
  isSmall,
  caption,
  children,
  fontSize,
  disabled = false,
  bordered = true,
  className,
  placement = 'bottom-start',
  placeholder,
  errorMessage,
  prefixIconName,
  onPrefixIconClick,
  ...props
}) => {
  const containerStyles = inputContainer({ fullWidth: !isSmall });

  const modifiers = usePopperModifiers([{ name: 'offset', options: { offset: [0, 2] } }]);

  const handlePrefixIconClick = (e: React.MouseEvent<SVGElement>) => {
    e.stopPropagation();
    onPrefixIconClick?.();
  };

  return (
    <InputFormControl label={label} caption={caption} errorMessage={errorMessage}>
      <Popper
        inline={inline}
        modifiers={modifiers}
        placement={placement}
        referenceElement={({ ref, popper, isOpen, onToggle }) => (
          <Box
            ref={ref}
            width={width}
            onClick={onToggle}
            className={clsx(containerStyles, DropdownTheme[variant], className)}
          >
            <button
              {...props}
              disabled={disabled}
              className={clsx(
                inputStyleRecipe({
                  error,
                  weight,
                  isOpen,
                  isEmpty: !value,
                  variant,
                  isSmall,
                  fontSize,
                  bordered,
                  isDisabled: disabled,
                  prefixIcon: !!prefixIconName,
                }),
                className
              )}
            >
              {value || placeholder || 'Select Value'}
            </button>

            {prefixIconName && (
              <Icon
                name={prefixIconName}
                onClick={handlePrefixIconClick}
                className={iconStyleRecipe({
                  alignment: 'left',
                  isSmall,
                  isError: error,
                  isDisabled: disabled,
                  variant,
                  bordered,
                  isOpen,
                  clickable: !!onPrefixIconClick,
                })}
                data-testid={`${testID}--prefix-icon`}
              />
            )}

            <Icon
              name="ArrowDownS"
              viewBox="0 0 20 24"
              width={20}
              height={24}
              className={iconStyleRecipe({
                isOpen,
                isSmall,
                variant,
                bordered,
                alignment: 'right',
                isDisabled: disabled,
              })}
              data-testid={`${testID}--chevron-icon`}
            />

            {popper}
          </Box>
        )}
      >
        {(props) => (
          <MenuProvider
            minWidth={props.referenceRef.current?.clientWidth}
            maxWidth={props.referenceRef.current?.clientWidth}
          >
            {children(props)}
          </MenuProvider>
        )}
      </Popper>
    </InputFormControl>
  );
};
