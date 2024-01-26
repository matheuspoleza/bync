import createTheme from '@uiw/codemirror-themes';
import type { EditorView, ReactCodeMirrorRef, ViewUpdate } from '@uiw/react-codemirror';
import ReactCodeMirror from '@uiw/react-codemirror';
import { clsx } from '@bync/style';
import React, { useMemo, useState } from 'react';

import { codeEditorRecipe } from './CodeEditor.css';
import { CodeEditorTheme } from './CodeEditorTheme.css';
import { CodeSuggestionsPopover } from './CodeSuggestionsPopover/CodeSuggestionsPopover.component';
import { codeSyntaxHighlightingTheme } from './CodeSyntaxHighlightingTheme';
import type { ICodeEditor } from './types';
import { codeMirrorExtensions } from './utils/codemirror-extensions';
import { formatDataToCodeMirrorFormat } from './utils/format-code-data-to-markup';
import { formatMarkupToCodeData } from './utils/format-markup-to-code-data';
import { getCurrentWordRange, getWordUnderCaret, isWordBeginningWithBracket } from './utils/get-word-under-caret';
import { mergeVariablesAndCodeData } from './utils/merge-variables-and-code-data';

const DEFAULT_VALUE: string[] = [];

export const CodeEditor: React.FC<ICodeEditor> = ({
  value = DEFAULT_VALUE,
  onChange,
  placeholder = 'Enter your custom javascript',
  theme = 'light',
  language = 'javascript',
  variableEntities,
  className,
  readOnly,
  disabled,
  autofocus,
  isFunctionEditor,
  autoFocusLineNumber,
}) => {
  const ref = React.useRef<ReactCodeMirrorRef>(null);
  const [caretPosition, setCaretPosition] = useState<DOMRect | null>(null);
  const [currentWord, setCurrentWord] = useState<string | null>(null);
  const [doesWordStartWithBracket, setDoesWordStartWithBracket] = useState<boolean>(false);
  const [lastUpdate, setlastUpdate] = useState<ViewUpdate | null>(null);
  const [autocompleteTargetElement, setAutocompleteTargetElement] = useState<HTMLElement | null>(null);

  const initialValue = useMemo(() => {
    const mergedMap = mergeVariablesAndCodeData(value, variableEntities);
    return formatDataToCodeMirrorFormat(mergedMap, language);
  }, [value, variableEntities, language]);

  const focusLine = (view: EditorView) => {
    if (autofocus && autoFocusLineNumber) {
      view.focus();
      const firstEmptyLineOnFunctionsEditor = view.state.doc.line(autoFocusLineNumber).to;
      view.dispatch({
        selection: {
          anchor: firstEmptyLineOnFunctionsEditor,
          head: firstEmptyLineOnFunctionsEditor,
        },
      });
    }
  };

  if (!globalThis.window) return null;
  const extensions = codeMirrorExtensions(language, isFunctionEditor);

  const cssTheme = CodeEditorTheme[language][theme];

  const handleChange = (value: string, viewUpdate: ViewUpdate) => {
    const cursorPosition = viewUpdate.view.domAtPos(viewUpdate.state.selection.ranges[0].anchor);
    const caratDOMRect = cursorPosition.node.parentElement?.getBoundingClientRect();
    setlastUpdate(viewUpdate);
    setAutocompleteTargetElement(cursorPosition.node.parentElement);
    setCaretPosition(caratDOMRect || null);
    setCurrentWord(getWordUnderCaret(viewUpdate.state) || null);
    setDoesWordStartWithBracket(isWordBeginningWithBracket(viewUpdate.state));
  };

  const handleAutocompletionClick = (insert: string) => {
    if (!lastUpdate || !value) return;
    const range = getCurrentWordRange(lastUpdate.state);

    if (!range) return;

    const from = doesWordStartWithBracket ? range.from - 1 : range.from;
    const to = doesWordStartWithBracket ? range.to + 1 : range.to;

    lastUpdate.view.dispatch({
      changes: { from, to, insert },
      selection: {
        anchor: from + insert.length,
        head: from + insert.length,
      },
    });
  };

  const handleCloseOfAutocomplete = () => {
    setCurrentWord(null);
    setDoesWordStartWithBracket(false);
  };

  const handleOnBlur = () => {
    const currentState = lastUpdate?.state;
    if (!currentState) return;
    onChange?.(formatMarkupToCodeData(currentState?.doc.toString()));
  };

  const syntaxHighlighting = createTheme(codeSyntaxHighlightingTheme);

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.code === 'Escape') {
      event.stopPropagation();
      ref.current?.view?.contentDOM.blur();
    }
  };

  return (
    <span className={cssTheme}>
      <ReactCodeMirror
        ref={ref}
        onChange={handleChange}
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus={autofocus}
        onBlur={handleOnBlur}
        readOnly={readOnly}
        onCreateEditor={focusLine}
        basicSetup={{
          highlightSelectionMatches: false,
          lineNumbers: false,
          foldGutter: false,
          indentOnInput: true,
          highlightActiveLine: false,
          highlightActiveLineGutter: !lastUpdate?.state.selection.ranges[0].anchor,
        }}
        theme={syntaxHighlighting}
        placeholder={placeholder}
        className={clsx(codeEditorRecipe({ disabled, readOnly }), className)}
        value={initialValue}
        extensions={extensions}
        onKeyDown={handleKeyDown}
      />
      <CodeSuggestionsPopover
        languageKeywords={[]}
        variableEntities={variableEntities}
        targetElement={autocompleteTargetElement}
        currentWord={currentWord}
        doesWordStartWithBracket={doesWordStartWithBracket}
        target={caretPosition}
        close={handleCloseOfAutocomplete}
        onSuggestionClick={handleAutocompletionClick}
      />
    </span>
  );
};
