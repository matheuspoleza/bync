import type { ICodeEditor } from '@/components/Inputs/CodeEditor/CodeEditorInput/types';

export interface ICodeSuggestionsPopover {
  languageKeywords: string[];
  currentWord: string | null;
  doesWordStartWithBracket: boolean | null;
  variableEntities: ICodeEditor['variableEntities'];
  target: DOMRect | null;
  targetElement: HTMLElement | null;
  onSuggestionClick: (value: string) => void;
  close: () => void;
}

export interface IAutosuggestion {
  label: string;
  value: string;
}
