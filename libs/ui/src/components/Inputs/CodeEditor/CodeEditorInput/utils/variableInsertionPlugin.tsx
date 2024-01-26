/* eslint-disable max-classes-per-file */
import type { DecorationSet, ViewUpdate } from '@uiw/react-codemirror';
import { Decoration, EditorView, MatchDecorator, ViewPlugin, WidgetType } from '@uiw/react-codemirror';
import { createRoot } from 'react-dom/client';

import { Entity, Variable } from '@/components/Other/VariableEntity';

import { inlineVariableEntityStyles } from '../CodeEditor.css';

export const INJECTED_VARIABLE_ENTITY_REGEX = /<%([\S\s]*?)%>/g;
const CONTENT_MATCHER = /<%([\S\s]*?)%>/;
const variableInsertion = new MatchDecorator({
  regexp: INJECTED_VARIABLE_ENTITY_REGEX,
  decoration: (match) => {
    return Decoration.replace({
      widget: new PlaceholderWidget(match[0]),
    });
  },
});

export const variableDecorationPlugin = () => {
  return ViewPlugin.fromClass(
    class {
      placeholders: DecorationSet;

      constructor(view: EditorView) {
        this.placeholders = variableInsertion.createDeco(view);
      }

      update(update: ViewUpdate) {
        this.placeholders = variableInsertion.updateDeco(update, this.placeholders);
      }
    },
    {
      decorations: (instance) => instance.placeholders,
      provide: (plugin) => {
        return EditorView.atomicRanges.of((view) => {
          return view.plugin(plugin)?.placeholders || Decoration.none;
        });
      },
    }
  );
};

class PlaceholderWidget extends WidgetType {
  constructor(readonly variableEntity: string) {
    super();
  }

  toDOM() {
    const elt = document.createElement('code');
    try {
      elt.className = inlineVariableEntityStyles;
      const jsonMatch = CONTENT_MATCHER.exec(this.variableEntity);
      if (jsonMatch) {
        const jsonString = jsonMatch[1];
        const content = JSON.parse(jsonString);
        const root = createRoot(elt);
        const elementToRender =
          content.kind === 'entity' ? (
            <Entity color={content.color} label={content.name} />
          ) : (
            <Variable color={content.color} label={content.name} />
          );
        root.render(elementToRender);
      }
      return elt;
    } catch (err) {
      return elt;
    }
  }

  ignoreEvent() {
    return false;
  }
}
