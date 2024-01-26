import type { EditorState } from '@uiw/react-codemirror';

export const getReadOnlyRanges = (
  targetState: EditorState
): Array<{ from: number | undefined; to: number | undefined }> => {
  try {
    return [
      {
        from: 0,
        to: targetState.doc.line(1).to,
      },
      {
        from: targetState.doc.line(targetState.doc.lines).from,
        to: targetState.doc.line(targetState.doc.lines).to,
      },
    ];
  } catch (err) {
    return [];
  }
};
