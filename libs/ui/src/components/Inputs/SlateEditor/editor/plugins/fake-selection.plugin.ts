import type { Editor, Selection, Text } from 'slate';
import { Range } from 'slate';

import type { RGBAColor } from '@/types';

import type { StaticEditor } from '../staticEditor';
import type { APIPlugin, Plugin } from './plugin.interface';

const FAKE_SELECTION_PROPERTY_NAME = 'fakeSelection';

export interface FakeSelectionText {
  [FAKE_SELECTION_PROPERTY_NAME]?: boolean;
}

export interface FakeSelectionPluginOptions {
  backgroundColor: RGBAColor;
}

export interface FakeSelectionEditor {
  applyFakeSelection: (selection?: Selection) => void;
  removeFakeSelection: () => void;
  getFakeSelectionRange: () => Range | null;
  setFakeSelectionRange: (fakeSelectionRange: Range) => void;
  isFakeSelectionApplied: () => boolean;
  getFakeSelectionBackground: (text: Text) => RGBAColor | null;
  isFakeSelectionAppliedAppliedToText: (text: Text) => boolean;
}

export interface FakeSelectionStaticEditor {
  FAKE_SELECTION_PROPERTY_NAME: typeof FAKE_SELECTION_PROPERTY_NAME;

  removeFakeSelectionAndFocus(editor: Editor & FakeSelectionEditor): void;
}

// eslint-disable-next-line sonarjs/cognitive-complexity
export const withFakeSelectionPlugin: Plugin = (StaticEditor: StaticEditor) => (editor: Editor) => {
  const { onChange: onOriginalChange } = editor;

  let originalSelection = editor.selection;
  let prevSelectionRange: Range | null = null;
  let fakeSelectionRange: Range | null = null;

  Object.defineProperty(editor, 'selection', {
    get: () => originalSelection ?? fakeSelectionRange,
    set: (selection) => {
      originalSelection = selection;
    },
  });

  // eslint-disable-next-line no-param-reassign
  editor.onChange = (...args) => {
    if (editor.selection && StaticEditor.isFocused(editor)) {
      if (fakeSelectionRange && editor.selection !== prevSelectionRange) {
        fakeSelectionRange = null;
        StaticEditor.removeMarkFromAll(editor, FAKE_SELECTION_PROPERTY_NAME);
      }

      prevSelectionRange = editor.selection;
    }

    onOriginalChange(...args);
  };

  const fakeSelectionEditor: FakeSelectionEditor = {
    applyFakeSelection: (selection = prevSelectionRange) => {
      StaticEditor.withoutSaving(editor, () => {
        if (fakeSelectionRange) {
          fakeSelectionRange = null;
          StaticEditor.removeMarkFromAll(editor, FAKE_SELECTION_PROPERTY_NAME);
        }

        if (selection && Range.isCollapsed(selection)) {
          fakeSelectionRange = selection;
          return;
        }

        fakeSelectionRange = selection ?? StaticEditor.fullRange(editor);

        const rangeRef = StaticEditor.rangeRef(editor, fakeSelectionRange);

        StaticEditor.setTextPropertyAtLocation(editor, fakeSelectionRange, FAKE_SELECTION_PROPERTY_NAME, true);

        fakeSelectionRange = rangeRef.unref();
      });
    },

    removeFakeSelection: () => {
      fakeSelectionRange = null;

      StaticEditor.withoutSaving(editor, () => {
        StaticEditor.removeMarkFromAll(editor, FAKE_SELECTION_PROPERTY_NAME);
      });
    },

    setFakeSelectionRange: (range) => {
      fakeSelectionRange = range;
    },

    getFakeSelectionRange: () => fakeSelectionRange,

    isFakeSelectionApplied: (): boolean => !!fakeSelectionRange,

    getFakeSelectionBackground: (text) =>
      text[FAKE_SELECTION_PROPERTY_NAME] ? editor.options.fakeSelectionColor : null,

    isFakeSelectionAppliedAppliedToText: (text) => !!text[FAKE_SELECTION_PROPERTY_NAME],
  };

  return Object.assign(editor, fakeSelectionEditor);
};

export const withFakeSelectionStaticEditor: APIPlugin = (StaticEditor: StaticEditor): StaticEditor => {
  const FakeSelectionStaticEditor: FakeSelectionStaticEditor = {
    FAKE_SELECTION_PROPERTY_NAME,

    removeFakeSelectionAndFocus(editor): void {
      StaticEditor.withoutSaving(editor, () => {
        let { selection } = editor;

        if (!selection) {
          return;
        }

        const rangeRef = StaticEditor.rangeRef(editor, selection);

        editor.removeFakeSelection();

        selection = rangeRef.unref();

        if (selection) {
          StaticEditor.focus(editor);
          StaticEditor.setSelection(editor, selection);
        }
      });
    },
  };

  return Object.assign(StaticEditor, FakeSelectionStaticEditor);
};
