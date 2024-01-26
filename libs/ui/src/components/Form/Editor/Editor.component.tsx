import { clsx } from '@bync/style';
import { useImperativeHandle, useRef, useState } from 'react';
import { flushSync } from 'react-dom';

import { Input } from '@/components/Inputs/Input';
import { Text } from '@/components/Text';
import { Box } from '@/components/Utility/Box';
import { forwardRef } from '@/hocs';
import { usePersistFunction } from '@/hooks';
import { useLinkedState } from '@/hooks/linked.hook';

import {
  containerStyle,
  contentContainerStyle,
  footerContainerStyle,
  headerActionsStyle,
  headerContainerStyle,
  headerTextAreaStyle,
  headerTitleContainerStyle,
  headerTitleStyle,
} from './Editor.css';
import type { IEditor, IEditorAPI } from './Editor.interface';

export const Editor = forwardRef<IEditorAPI, IEditor>('Editor')(
  (
    {
      title: titleProp,
      footer,
      testID,
      divider = true,
      readOnly,
      children,
      className,
      contentClassName,
      onTitleChange,
      headerActions,
      titleTransform = (v) => v,
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const [title, setTitle] = useLinkedState(titleProp);
    const [isEditingTitle, setIsEditingTitle] = useState(false);

    const onStartTitle = usePersistFunction(() => {
      if (readOnly) return;

      flushSync(() => setIsEditingTitle(true));

      inputRef.current?.focus();
      inputRef.current?.select();
    });

    const onFinishEdit = () => {
      if (!title.trim()) {
        setTitle(titleProp);

        return;
      }

      onTitleChange?.(title);
      setIsEditingTitle(false);
    };

    const handleKeyboardEvent = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        onFinishEdit();
      }
    };

    useImperativeHandle(ref, () => ({ startTitleEditing: onStartTitle }));

    return (
      <Box className={clsx(containerStyle, className)} testID={testID} direction="column" align="center">
        <Box direction="row" align="center" className={headerContainerStyle({ divider })} px={24} gap={12}>
          <Box width="100%" align="center" className={headerTitleContainerStyle}>
            {isEditingTitle ? (
              <Input
                ref={inputRef}
                value={title}
                onBlur={onFinishEdit}
                testID={`${testID}--input`}
                variant="ghost"
                fullWidth
                onKeyDown={handleKeyboardEvent}
                className={headerTextAreaStyle}
                onValueChange={(value) => setTitle(titleTransform(value))}
              />
            ) : (
              <Text testID={`${testID}--title`} onClick={onStartTitle} variant="h3" className={headerTitleStyle}>
                {title}
              </Text>
            )}
          </Box>

          {headerActions && (
            <Box
              align="center"
              testID={`${testID}--header-actions`}
              className={clsx(headerActionsStyle, contentClassName)}
              mr={-8}
            >
              {headerActions}
            </Box>
          )}
        </Box>

        <Box direction="column" testID={`${testID}--content`} className={contentContainerStyle}>
          {children}
        </Box>

        {footer && (
          <Box testID={`${testID}--footer`} className={footerContainerStyle}>
            {footer}
          </Box>
        )}
      </Box>
    );
  }
);
