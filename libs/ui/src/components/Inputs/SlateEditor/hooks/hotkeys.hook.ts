import React from 'react';
import type { Editor } from 'slate';
import { useSlateStatic } from 'slate-react';

import { usePersistFunction } from '@/hooks';

import { StaticEditor } from '../editor/staticEditor';

export const useEditorHotkey = (key: string, callback: React.KeyboardEventHandler<HTMLDivElement>): void => {
  const editor = useSlateStatic();

  const persistedCallback = usePersistFunction(callback);

  React.useEffect(() => {
    editor.registerHotKey(key, persistedCallback);

    return () => editor.unregisterHotKey(key, persistedCallback);
  }, [key, editor]);
};

export const useInitEditorHotkeys = (
  editor: Editor,
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>
): React.KeyboardEventHandler<HTMLDivElement> =>
  React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Escape') {
        editor.removeFakeSelection();
        StaticEditor.deselect(editor);
        StaticEditor.blur(editor);
      }

      editor.fireHotKey(event);

      onKeyDown?.(event);
    },
    [editor]
  );
