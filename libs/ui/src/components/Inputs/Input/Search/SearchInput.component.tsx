import { clsx } from '@bync/style';
import { useMemo, useRef } from 'react';

import { Icon } from '@/components/Media/Icon';
import { Box } from '@/components/Utility/Box';
import { forwardRef } from '@/hocs';
import { composeRefs } from '@/utils/ref.util';

import {
  iconFadeIn,
  iconFadeOut,
  iconStyleRecipe,
  inputContainer,
  inputStyleRecipe,
  staticIconStyles,
} from './styles/SearchInput.css';
import * as SearchInputTheme from './styles/SearchInputTheme.css';
import type { ISearchInput } from './types';

export const SearchInput = forwardRef<HTMLInputElement, ISearchInput>('SearchInput')(
  (
    {
      value,
      onChange,
      onValueChange,
      placeholder,
      id,
      type,
      className,
      testID,
      variant = 'light',
      containerClassName,
      fullWidth,
      onClear,
      autoFocus,
      containerRef,
      withIconAnimation = false,
      ...props
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const inputStyle = inputStyleRecipe({ variant });

    const handleCloseIconClick = () => {
      onClear?.();
      onValueChange?.('');

      inputRef.current?.focus();
    };

    const onKeyDown = (event: React.KeyboardEvent) => {
      if (event.code !== 'Escape') return;

      onClear?.();
      onValueChange?.('');
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(event);
      onValueChange?.(event.target.value);
    };

    const searchTransition = useMemo(() => {
      if (withIconAnimation) {
        return value.length ? iconFadeOut : iconFadeIn;
      }
      return [staticIconStyles];
    }, [value?.length, withIconAnimation]);

    const closeIconTransition = useMemo(() => {
      if (withIconAnimation) {
        return !value.length ? iconFadeOut : iconFadeIn;
      }
      return [staticIconStyles, iconFadeIn];
    }, [withIconAnimation, value?.length]);

    const closeIconClassName = clsx(iconStyleRecipe({ clickable: true }), closeIconTransition);
    const searchIconClassName = clsx(iconStyleRecipe({ clickable: false }), searchTransition);

    return (
      <Box
        ref={containerRef}
        width={fullWidth ? '100%' : 'auto'}
        testID={testID}
        className={clsx(inputContainer, SearchInputTheme[variant], containerClassName)}
      >
        <input
          {...props}
          id={id}
          ref={composeRefs(ref, inputRef)}
          type={type}
          value={value}
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus={autoFocus}
          onChange={handleChange}
          className={clsx(inputStyle, className)}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          data-testid={`${testID}--input`}
        />
        {value.length ? (
          <Icon
            name="CloseM"
            testID={`${testID}--close-icon`}
            onClick={handleCloseIconClick}
            className={closeIconClassName}
          />
        ) : (
          <Icon name="Search" className={searchIconClassName} testID={`${testID}--search-icon`} />
        )}
      </Box>
    );
  }
);
