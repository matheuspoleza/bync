import React, { forwardRef, useState } from 'react';
import type { Descendant } from 'slate';

import { Box, FocusIndicator, SlateEditor, SquareButton, Text } from '@/components';
import { useCreateConst, usePersistFunction, useVirtualItemResizeObserver } from '@/hooks';
import { colors } from '@/styles/theme';

import { intentInputStyles } from './IntentInput.css';

const utteranceError = 'Intent requires at least 1 sample phrase.';

export interface IIntentUtteranceInput {
  value: Descendant[];
  onChange: (value: Descendant[]) => void;
  error: boolean;
  remove: () => void;
  index: number;
  pluginOptions: SlateEditor.PluginsOptions;
  onEnter: () => void;
  measureRef: React.Ref<HTMLDivElement>;
}

export const IntentUtteranceInput = forwardRef<SlateEditor.SlateEditorRef, IIntentUtteranceInput>(
  ({ value, index, onChange, error, remove, pluginOptions, onEnter, measureRef }, ref) => {
    const editor = useCreateConst(() =>
      SlateEditor.createEditor([SlateEditor.PluginType.VARIABLE, SlateEditor.PluginType.SINGLE_LINE])
    );
    const [localValue, setLocalValue] = useState<Descendant[]>(value);

    const handleOnChange = usePersistFunction((newValue: Descendant[]) => {
      setLocalValue(newValue);
      onChange(newValue);
    });

    const handleOnKeyUp = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Enter') {
        onEnter();
      }
    };

    const { onRef } = useVirtualItemResizeObserver(measureRef);

    return (
      <SlateEditor.Component
        ref={ref}
        value={localValue}
        ellipsis={true}
        onKeyUp={handleOnKeyUp}
        editor={editor}
        placeholder="Enter sample phrase or {entity}"
        onValueChange={handleOnChange}
        pluginsOptions={pluginOptions}
        className={intentInputStyles}
        editableContainer={({ editable }) => (
          <Box ref={onRef} pr={16} height={error ? '44px' : '36px'} align="center" data-index={index}>
            <FocusIndicator.Container error={error} pl={24} overflow="hidden">
              <Box width="100%" direction="column" align="center" pr={8}>
                {editable}
              </Box>
              {error && <ErrorMessage />}
            </FocusIndicator.Container>
            <SquareButton iconName="Minus" size="medium" onClick={remove} />
          </Box>
        )}
      />
    );
  }
);

const ErrorMessage = () => {
  return (
    <Text style={{ color: colors.alert.alert700, paddingTop: '3px' }} variant="fieldCaption">
      {utteranceError}
    </Text>
  );
};
