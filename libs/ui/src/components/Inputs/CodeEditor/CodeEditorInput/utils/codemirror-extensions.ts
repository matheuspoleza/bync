import { autocompletion } from '@codemirror/autocomplete';
import { indentWithTab } from '@codemirror/commands';
import { javascriptLanguage } from '@codemirror/lang-javascript';
import { json } from '@codemirror/lang-json';
import { keymap } from '@uiw/react-codemirror';
import readOnlyRangesExtension from 'codemirror-readonly-ranges';

import type { ICodeEditor } from '@/components/Inputs/CodeEditor/CodeEditorInput/types';
import { highlightActiveLine } from '@/components/Inputs/CodeEditor/CodeEditorInput/utils/active-line-highlight';
import {
  highlightActiveLineGutter,
  lineNumbers,
} from '@/components/Inputs/CodeEditor/CodeEditorInput/utils/gutter-highlight';
import { variableDecorationPlugin } from '@/components/Inputs/CodeEditor/CodeEditorInput/utils/variableInsertionPlugin';

import { getReadOnlyRanges } from './read-only-plugin';

export const codeMirrorExtensions = (
  language: ICodeEditor['language'],
  isFunctionsEditor: ICodeEditor['isFunctionEditor']
) => {
  if (language === 'javascript') {
    const jsExtensions = [
      highlightActiveLineGutter(),
      lineNumbers(),
      highlightActiveLine(),
      variableDecorationPlugin(),
      javascriptLanguage,
      autocompletion({ override: [] }),
      keymap.of([indentWithTab]),
    ];

    if (isFunctionsEditor) {
      jsExtensions.push(readOnlyRangesExtension(getReadOnlyRanges));
    }
    return jsExtensions;
  }
  if (language === 'json') {
    return [
      variableDecorationPlugin(),
      highlightActiveLineGutter(),
      lineNumbers(),
      highlightActiveLine(),
      json(),
      keymap.of([indentWithTab]),
    ];
  }
  return [];
};
