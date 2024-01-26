import Prism from 'prismjs';
import React, { useCallback } from 'react';
import type { Editor, NodeEntry } from 'slate';
import { Range, Text } from 'slate';

import type { Nullable } from '@/types';

import type { PrismLanguage } from '../prism';

const getTokenLength = (token: string | Prism.Token): number => {
  if (typeof token === 'string') {
    return token.length;
  }

  if (typeof token.content === 'string') {
    return token.content.length;
  }

  if (Array.isArray(token.content)) {
    return token.content.reduce((l, t) => l + getTokenLength(t), 0);
  }

  return getTokenLength(token.content);
};

export const useEditorDecorate = (editor: Editor): Nullable<(entry: NodeEntry) => Range[]> => {
  const language = React.useMemo<null | PrismLanguage>(() => {
    const languages = editor.prismLanguages();

    if (languages.length === 1) return languages[0];

    return null;
  }, [editor]);

  const decorate = useCallback(
    ([node, path]: NodeEntry) => {
      const ranges: Range[] = [];

      if (!language || !Text.isText(node)) {
        return ranges;
      }

      const tokens = Prism.tokenize(node.text, Prism.languages[language]);
      let start = 0;

      for (const token of tokens) {
        const length = getTokenLength(token);
        const end = start + length;

        if (typeof token !== 'string') {
          const range: Range = {
            focus: { path, offset: end },
            anchor: { path, offset: start },
          };

          ranges.push({
            ...range,
            range,
            isSelected:
              !!editor.selection && Range.isCollapsed(editor.selection) && Range.includes(range, editor.selection),
            [token.type]: true,
          });
        }

        start = end;
      }

      return ranges;
    },
    [editor]
  );

  return language ? decorate : null;
};
