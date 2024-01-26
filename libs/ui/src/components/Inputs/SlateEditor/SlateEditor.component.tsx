import { clsx } from '@bync/style';
import React, { useEffect } from 'react';
import { Editable, Slate } from 'slate-react';

import { forwardRef } from '@/hocs';
import { usePersistFunction } from '@/hooks';

import { PluginsOptionsContextProvider } from './contexts/PluginsOptions.context';
import { StaticEditor } from './editor/staticEditor';
import { useEditorDecorate } from './hooks/decorate.hook';
import { useInitEditorHotkeys } from './hooks/hotkeys.hook';
import { useEditorForceNormalize } from './hooks/normalize.hook';
import { defaultRenderElement } from './renderers/element.renderer';
import { defaultRenderLeaf } from './renderers/leaf.renderer';
import { defaultRenderPlaceholder } from './renderers/placeholder.renderer';
import { PluginType } from './SlateEditor.constant';
import { editorStyle } from './SlateEditor.css';
import type { ISlateEditor, SlateEditorRef } from './SlateEditor.interface';

export const SlateEditor = forwardRef<SlateEditorRef, ISlateEditor>('SlateEditor')(
  (
    {
      value,
      onBlur: onBlurProp,
      header,
      footer,
      editor,
      disabled,
      ellipsis = false,
      readOnly = disabled,
      autoFocus = false,
      onKeyDown,
      className,
      spellCheck = false,
      renderLeaf = defaultRenderLeaf,
      renderElement = defaultRenderElement,
      onValueChange,
      pluginsOptions: pluginsOptionsProp,
      renderPlaceholder = defaultRenderPlaceholder,
      editableContainer,
      ...editableProps
    },
    ref
  ) => {
    const decorate = useEditorDecorate(editor);
    const initEditorHotkeys = useInitEditorHotkeys(editor, onKeyDown);

    const pluginsOptions = React.useMemo(
      () => editor.setPluginsOptions(pluginsOptionsProp),
      [editor, pluginsOptionsProp]
    );

    const onBlur = usePersistFunction((event: React.FocusEvent<HTMLDivElement>) => {
      if (editor.blurPrevented) return;

      onBlurProp?.(event);

      if (!pluginsOptions[PluginType.SINGLE_LINE]?.nowrap) return;

      StaticEditor.toDOMNode(editor, editor).scrollTo({ left: 0 });
    });

    useEditorForceNormalize(editor, [pluginsOptions[PluginType.VARIABLE]?.variablesMap]);

    React.useImperativeHandle(
      ref,
      () => ({
        focus: () => StaticEditor.focusAtTheEnd(editor),
        getEditor: () => editor,
        getContent: () => editor.children,
      }),
      [editor]
    );

    useEffect(() => {
      if (!autoFocus || readOnly) return;

      StaticEditor.focusAtTheEnd(editor);
    }, []);

    const editable = (
      <Editable
        onBlur={onBlur}
        readOnly={readOnly}
        disabled={disabled}
        decorate={decorate ?? undefined}
        className={clsx(editorStyle({ nowrap: pluginsOptions[PluginType.SINGLE_LINE]?.nowrap, ellipsis }), className)}
        onKeyDown={initEditorHotkeys}
        renderLeaf={renderLeaf}
        spellCheck={spellCheck}
        renderElement={renderElement}
        renderPlaceholder={renderPlaceholder}
        {...editableProps}
      />
    );

    return (
      <PluginsOptionsContextProvider value={pluginsOptions}>
        <Slate editor={editor} onChange={onValueChange} initialValue={value}>
          {header}

          {editableContainer ? editableContainer({ editable }) : editable}

          {footer}
        </Slate>
      </PluginsOptionsContextProvider>
    );
  }
);
