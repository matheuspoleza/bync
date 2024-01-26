import { useState } from 'react';
import { useSlateSelector, useSlateStatic } from 'slate-react';

import { Button } from '@/components/Buttons';
import { Input } from '@/components/Inputs/Input/Input.component';
import { TextArea } from '@/components/Inputs/TextArea/TextArea.component';
import { Box, Popper, Surface } from '@/components/Utility';

import { usePluginOptions } from '../../../contexts/PluginsOptions.context';
import { StaticEditor } from '../../../editor/staticEditor';
import { useEditorHotkey } from '../../../hooks/hotkeys.hook';
import { PluginType } from '../../../SlateEditor.constant';
import { ToolbarButton } from '../ToolbarButton/ToolbarButton.component';
import { insertButtonStyles } from './HyperlinkButton.css';
import type { IHyperlinkButton } from './HyperlinkButton.interface';

export const HyperlinkButton: React.FC<IHyperlinkButton> = ({ iconName = 'Link' }) => {
  const editor = useSlateStatic();
  const linkEntry = useSlateSelector(StaticEditor.linkEntry);
  const { isURL } = usePluginOptions(PluginType.LINK);

  const [url, setURL] = useState('');
  const [text, setText] = useState('');
  const [entry, setEntry] = useState(linkEntry);
  const [isOpen, setIsOpen] = useState(false);
  const [initialText, setInitialText] = useState('');

  const disabled = entry ? !text : !text || !url || !isURL(url);

  const handleClose = () => {
    StaticEditor.removeFakeSelectionAndFocus(editor);
    setIsOpen(false);
  };

  const handleSave = () => {
    if (entry && !url) {
      StaticEditor.unwrapLink(editor);
    } else if (url) {
      StaticEditor.wrapLink(editor, { url, text: text !== initialText ? text : undefined });
    }

    handleClose();
  };

  const getSelectionText = () => {
    const range = editor.selection;

    if (!range) return '';

    return StaticEditor.serialize(editor.fragment(range));
  };

  const handleOpen = () => {
    if (!StaticEditor.isFocused(editor)) {
      StaticEditor.focusAtTheEnd(editor);
    }

    if (linkEntry) {
      const [node, path] = linkEntry;

      StaticEditor.setSelection(editor, {
        focus: {
          path: [...path, 0],
          offset: StaticEditor.serialize(node.children).length,
        },
        anchor: { path: [...path, 0], offset: 0 },
      });
    }

    const text = linkEntry ? StaticEditor.serialize(linkEntry[0].children) : getSelectionText();

    setURL(linkEntry?.[0]?.url ?? '');
    setText(text);
    setEntry(linkEntry);
    setInitialText(text);
    setIsOpen(true);
  };

  const handleFocus = () => {
    if (editor.isFakeSelectionApplied()) return;

    editor.applyFakeSelection();
  };

  const handleMouseDown = (event: React.MouseEvent) => {
    event.preventDefault();

    if (isOpen) {
      handleClose();
    } else {
      handleOpen();
    }
  };

  const handleSaveClick = (event: React.MouseEvent) => {
    event.preventDefault();

    if (disabled) return;

    handleSave();
  };

  useEditorHotkey('k', handleOpen);

  const autoFocusText = !entry && !text;

  return (
    <Popper
      isOpen={isOpen}
      onClose={handleClose}
      placement="bottom"
      dismissEvent="mousedown"
      referenceElement={({ ref }) => (
        <ToolbarButton
          ref={ref}
          isActive={isOpen}
          iconName={iconName}
          onMouseDown={handleMouseDown}
          stylesApplied={!!linkEntry?.[0]?.url}
        />
      )}
    >
      {() => (
        <Surface width="256px" pt={20} px={4} pb={4} gap={16}>
          <Box px={16} gap={16} direction="column">
            <Input
              value={text}
              onFocus={handleFocus}
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus={autoFocusText}
              placeholder="Enter label"
              onValueChange={setText}
            />

            <TextArea
              value={url}
              minHeight={16}
              maxRows={3}
              onFocus={handleFocus}
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus={!autoFocusText}
              placeholder="Enter URL"
              onValueChange={setURL}
            />
          </Box>

          <Button
            label={!linkEntry ? 'Insert' : 'Update'}
            onClick={handleSaveClick}
            disabled={disabled}
            className={insertButtonStyles}
            fullWidth
          />
        </Surface>
      )}
    </Popper>
  );
};
