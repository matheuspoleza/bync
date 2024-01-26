import type { ViewUpdate } from '@uiw/react-codemirror';

export const getWordUnderCaret = (editor: ViewUpdate['state']) => {
  const range = getCurrentWordRange(editor);
  if (range) {
    const { from, to } = range;
    return editor?.sliceDoc(from, to);
  }
  return undefined;
};
export const isWordBeginningWithBracket = (editor: ViewUpdate['state']) => {
  const range = getCurrentWordRange(editor);
  if (range) {
    const { from, to } = range;
    return editor?.sliceDoc(from - 1, to).startsWith('{');
  }
  return false;
};

export const getCurrentWordRange = (editorState: ViewUpdate['state']): { from: number; to: number } | null => {
  const caretPosition = editorState?.selection.main.head;
  if (!caretPosition) {
    return null;
  }
  return editorState?.wordAt(caretPosition);
};
