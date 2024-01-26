import * as Icons from '@bync/icons';
import { clsx } from '@bync/style';
import { useRef } from 'react';

import { Box } from '@/components/Utility/Box';
import { forwardRef } from '@/hocs';
import { composeRefs } from '@/utils/ref.util';

import { iconStyleRecipe, inputContainer, inputStyleRecipe } from './styles/Input.css';
import * as InputTheme from './styles/InputTheme.css';
import type { IInput } from './types';

export const Input = forwardRef<HTMLInputElement, IInput>('Input')(
  (
    {
      value,
      onChange,
      onValueChange,
      placeholder,
      id,
      type,
      prefixIconName,
      suffixIconName,
      error = false,
      className,
      disabled = false,
      testID,
      ellipsis = true,
      prefixIconOnClick,
      suffixIconOnClick,
      variant = 'primary',
      iconClassName,
      containerClassName,
      fullWidth,
      containerRef,
      onKeyDown,
      ...props
    },
    ref
  ) => {
    const PrefixIcon = prefixIconName && Icons[prefixIconName];
    const SuffixIcon = variant === 'primary' && suffixIconName && Icons[suffixIconName];

    const inputStyle = inputStyleRecipe({
      error,
      prefixIcon: !!PrefixIcon,
      suffixIcon: !!SuffixIcon,
      variant,
      ellipsis,
    });
    const prefixIconStyles = iconStyleRecipe({ alignment: 'left', clickable: !!prefixIconOnClick });
    const suffixIconStyles = iconStyleRecipe({ alignment: 'right', clickable: !!suffixIconOnClick });

    const inputRef = useRef<HTMLInputElement>(null);

    const handlePrefixIconClick = (event: React.MouseEvent<SVGSVGElement>) => {
      prefixIconOnClick?.(event);
      inputRef.current?.focus();
    };
    const handleSuffixIconClick = (event: React.MouseEvent<SVGSVGElement>) => {
      suffixIconOnClick?.(event);
      inputRef.current?.focus();
    };

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
      onChange?.(event);
      onValueChange?.(event.target.value);
    };

    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
      onKeyDown?.(event);

      if (!event.isDefaultPrevented() && event.code === 'Escape') {
        event.stopPropagation();
        event.currentTarget.blur();
      }
    };

    return (
      <Box
        ref={containerRef}
        width={fullWidth ? '100%' : 'auto'}
        className={clsx(inputContainer, InputTheme[variant], containerClassName)}
      >
        <input
          {...props}
          className={clsx(inputStyle, className)}
          placeholder={placeholder}
          value={value}
          type={type}
          ref={composeRefs(ref, inputRef)}
          onChange={handleChange}
          disabled={disabled}
          id={id}
          onKeyDown={handleKeyDown}
          data-testid={testID}
        />
        {PrefixIcon && (
          <PrefixIcon
            onClick={handlePrefixIconClick}
            className={clsx(iconClassName, prefixIconStyles)}
            data-testid={`${testID}--prefix-icon`}
          />
        )}
        {SuffixIcon && (
          <SuffixIcon
            onClick={handleSuffixIconClick}
            className={clsx(iconClassName, suffixIconStyles)}
            data-testid={`${testID}--suffix-icon`}
          />
        )}
      </Box>
    );
  }
);
