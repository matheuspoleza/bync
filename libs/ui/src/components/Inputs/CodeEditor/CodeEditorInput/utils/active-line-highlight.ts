import type { DecorationSet, EditorView, Extension, ViewUpdate } from '@uiw/react-codemirror';
import { Decoration, ViewPlugin } from '@uiw/react-codemirror';

export const highlightActiveLine = (): Extension => activeLineHighlighter;
const lineDeco = Decoration.line({ class: 'cm-activeLine' });
const activeLineHighlighter = ViewPlugin.fromClass(
  class {
    decorations: DecorationSet;

    constructor(view: EditorView) {
      this.decorations = this.getDeco(view);
    }

    update(update: ViewUpdate) {
      if (update.docChanged || update.selectionSet) this.decorations = this.getDeco(update.view);
    }

    getDeco(view: EditorView) {
      let lastLineStart = -1;
      const deco = [];
      for (const r of view.state.selection.ranges) {
        if (!r.empty) return Decoration.none;
        const line = view.lineBlockAt(r.head);
        if (line.from > lastLineStart) {
          deco.push(lineDeco.range(line.from));
          lastLineStart = line.from + 4;
        }
      }
      return Decoration.set(deco);
    }
  },
  {
    decorations: (v) => v.decorations,
  }
);
