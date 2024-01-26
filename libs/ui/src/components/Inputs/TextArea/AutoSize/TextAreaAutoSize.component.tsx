import { clsx } from '@bync/style';
import { useEffect, useRef } from 'react';

import { Icon } from '@/components/Media/Icon';
import { Text } from '@/components/Text';
import { Box } from '@/components/Utility/Box/Box.component';
import { forwardRef } from '@/hocs';
import { composeRefs } from '@/utils/ref.util';

import { captionRecipe, container, iconStyles, textAreaStyleRecipe } from '../TextArea.css';
import { useAutosizeTextArea } from '../useTextAreaAutosize';
import { textAreaAutoSizeModifiers, textAreaContainerRecipe } from './TextAreaAutoSize.css';
import type { ITextAreaAutoSize } from './types';

export const TextAreaAutoSize = forwardRef<HTMLTextAreaElement, ITextAreaAutoSize>('TextAreaAutoSize')(
  (
    {
      value,
      variant = 'default',
      onChange,
      onValueChange,
      error = false,
      iconName,
      className,
      placeholder,
      onIconClick,
      onFocus,
      disabled,
      caption,
      captionClassName,
      isFocused,
      testID,
      onKeyDown,
      ellipsis = false,
      horizontalScroll = false,
      ...props
    },
    ref
  ) => {
    const inputStyle = textAreaStyleRecipe({ error, variant, horizontalScroll });
    const containerStyle = textAreaContainerRecipe({ horizontalScroll, error });
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useAutosizeTextArea(textAreaRef, value);

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange?.(event);
      onValueChange?.(event.target.value);
    };

    const handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (event) => {
      onKeyDown?.(event);

      if (event.code === 'Escape') {
        event.stopPropagation();
        event.currentTarget.blur();
      }
    };

    const onOuterContainerClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
      textAreaRef.current?.focus();
      event.stopPropagation();
    };

    useEffect(() => {
      if (isFocused && !error) {
        textAreaRef.current?.focus();
      }
    }, [isFocused, error]);

    return (
      <span className={container({ ellipsis })}>
        {iconName && <Icon name={iconName} onClick={onIconClick} className={iconStyles} testID={`${testID}--icon`} />}
        <Box
          className={containerStyle}
          onMouseDown={(event) => event.stopPropagation()}
          onMouseUp={onOuterContainerClick}
        >
          <textarea
            {...props}
            className={clsx(inputStyle, textAreaAutoSizeModifiers({ horizontalScroll, error }), className)}
            disabled={disabled}
            onFocus={onFocus}
            placeholder={placeholder}
            ref={composeRefs(textAreaRef, ref)}
            onChange={handleChange}
            value={value}
            data-testid={testID}
            onKeyDown={handleKeyDown}
          />
        </Box>

        {caption && (
          <Text variant="fieldCaption" className={clsx(captionRecipe({ error, default: !error }), captionClassName)}>
            {caption}
          </Text>
        )}
      </span>
    );
  }
);
