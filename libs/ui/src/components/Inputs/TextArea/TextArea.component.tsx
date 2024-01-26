import { clsx } from '@bync/style';
import TextareaAutosize from 'react-textarea-autosize';

import { Icon } from '@/components/Media/Icon';
import { Text } from '@/components/Text';
import { forwardRef } from '@/hocs';

import { captionRecipe, container, iconStyles, textAreaStyleRecipe } from './TextArea.css';
import type { ITextArea } from './types';

export const TextArea = forwardRef<HTMLTextAreaElement, ITextArea>('TextArea')(
  (
    {
      value,
      variant = 'default',
      onChange,
      minHeight = 20,
      maxHeight,
      error,
      iconName,
      className,
      placeholder,
      onValueChange,
      iconOnClick,
      disabled,
      testID,
      onKeyDown,
      onBlur,
      ellipsis,
      caption,
      ...props
    },

    ref
  ) => {
    const inputStyle = textAreaStyleRecipe({ error, variant, ellipsis });
    const lineHeight = 16;

    const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => {
      onChange?.(event);
      onValueChange?.(event.target.value);
    };

    const handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (
      event: React.KeyboardEvent<HTMLTextAreaElement>
    ) => {
      onKeyDown?.(event);

      if (event.code === 'Escape') {
        event.stopPropagation();
        event.currentTarget.blur();
      }
    };

    const handleBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
      onBlur?.(event);

      event.currentTarget.scrollTo({ top: 0 });
    };

    return (
      <span className={container({ ellipsis })}>
        {iconName && <Icon name={iconName} onClick={iconOnClick} className={iconStyles} testID={`${testID}--icon`} />}
        <TextareaAutosize
          ref={(ref as any) ?? undefined}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          className={clsx(inputStyle, className)}
          maxRows={maxHeight ? maxHeight / lineHeight : undefined}
          minRows={minHeight / lineHeight}
          disabled={disabled || variant === 'chunk'}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          {...props}
        />
        {caption && (
          <Text variant="fieldCaption" className={captionRecipe({ error, default: !error })}>
            {caption}
          </Text>
        )}
      </span>
    );
  }
);
