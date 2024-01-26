import type { Descendant, Editor, Range } from 'slate';
import { Element, Text, Transforms } from 'slate';

import { PrismLanguage, type PrismVariablesProperty } from '../../prism';
import type { VariableElementVariant } from '../../SlateEditor.constant';
import { ElementType, PluginType } from '../../SlateEditor.constant';
import type { VariableElement } from '../../SlateEditor.interface';
import type { StaticEditor } from '../staticEditor';
import type { APIPlugin, Plugin } from './plugin.interface';
import { matchAndProcessTextNodeToElement } from './plugin.util';

export interface VariablesDecorate {
  [PrismVariablesProperty.VF_VARIABLE]?: true;
}

export interface VariableItem {
  id: string;
  name: string;
  kind: string;
  color?: string;
  variant: VariableElementVariant;
}

export interface VariablesPluginOptions {
  regexp: RegExp;
  onEdit?: (item: VariableItem) => void;
  onClick?: (item: VariableItem) => void;
  canEdit?: boolean;
  onAdded?: (item: VariableItem) => void;
  onCreate?: (variable: string) => VariableItem | Promise<VariableItem>;
  canFocus?: boolean;
  canCreate?: boolean;
  variablesMap?: Record<string, VariableItem>;
  maxVariableWidth?: string;
  createButtonLabel?: string;
}

export interface VariablesStaticEditor {
  isVariable: (node: Descendant) => node is VariableElement;
  replaceWithVariable: (editor: Editor, range: Range, variable: VariableItem) => void;
}

export const DEFAULT_VARIABLES_PLUGIN_OPTIONS: VariablesPluginOptions = {
  regexp: /{([\w- ]*)}/g,
  canFocus: true,
};

export const withDefaultVariablesPluginOptions = (
  options?: Partial<VariablesPluginOptions>
): VariablesPluginOptions => ({
  ...options,
  regexp: options?.regexp ?? DEFAULT_VARIABLES_PLUGIN_OPTIONS.regexp,
  canFocus: options?.canFocus ?? DEFAULT_VARIABLES_PLUGIN_OPTIONS.canFocus,
});

const getOptions = (editor: Editor): VariablesPluginOptions =>
  withDefaultVariablesPluginOptions(editor.pluginsOptions[PluginType.VARIABLE]);

// eslint-disable-next-line sonarjs/cognitive-complexity
export const withVariablesPlugin: Plugin = (StaticEditor: StaticEditor) => (editor: Editor) => {
  const { isVoid: originalIsVoid, isInline: originalIsInline, normalizeNode: originalNormalizeNode } = editor;

  editor.registerPrismLanguage(PrismLanguage.VF_MARKUP);

  editor.registerTextProcessingMiddleware(() => (next) => (nodes) => {
    const { regexp, variablesMap } = getOptions(editor);

    const variablesNameMap = variablesMap
      ? Object.fromEntries(Object.values(variablesMap).map((variable) => [variable.name, variable]))
      : null;

    return nodes.flatMap((node) => {
      if (!Text.isText(node) || !variablesNameMap) return next([node]);

      return matchAndProcessTextNodeToElement({ type: ElementType.VARIABLE, node, next, regexp }, (match, textNode) => {
        const variableItem = variablesNameMap?.[match[1].trim()];

        // skip if not exists
        if (!variableItem) {
          return next([{ ...textNode, text: textNode.text + match[0] }]);
        }

        const variableElement: VariableElement = {
          type: ElementType.VARIABLE,
          children: [{ text: '' }],
          variableID: variableItem.id,
          variableVariant: variableItem.variant,
        };

        return [...next([textNode]), variableElement];
      });
    });
  });

  // eslint-disable-next-line no-param-reassign
  editor.isVoid = (element, ...args) => StaticEditor.isVariable(element) || originalIsVoid(element, ...args);

  // eslint-disable-next-line no-param-reassign
  editor.isInline = (element, ...args) => StaticEditor.isVariable(element) || originalIsInline(element, ...args);

  // eslint-disable-next-line no-param-reassign
  editor.normalizeNode = (entry, ...args) => {
    const [node, path] = entry;

    // if element is not variable, run original normalization
    if (!Element.isElement(node) || !StaticEditor.isVariable(node)) {
      originalNormalizeNode(entry, ...args);
      return;
    }

    const { variablesMap } = getOptions(editor);

    // do nothing if variable exists
    if (variablesMap?.[node.variableID]) return;

    // replace variable element with text node
    StaticEditor.withoutNormalizing(editor, () => {
      const pathRef = StaticEditor.pathRef(editor, path);

      Transforms.insertNodes(editor, { text: `{${node.variableID}}` }, { at: pathRef.current! });
      Transforms.removeNodes(editor, { at: pathRef.current! });

      pathRef.unref();
    });
  };

  return editor;
};

export const withVariablesStaticEditor: APIPlugin = (StaticEditor: StaticEditor): StaticEditor => {
  const VariablesStaticEditor: VariablesStaticEditor = {
    isVariable: (node): node is VariableElement => Element.isElement(node) && node.type === ElementType.VARIABLE,

    replaceWithVariable: (editor: Editor, range: Range, variable: VariableItem) => {
      const variableElement: VariableElement = {
        type: ElementType.VARIABLE,
        // empty text node as child is required for the all slate elements.
        children: [{ text: '' }],
        variableID: variable.id,
        variableVariant: variable.variant,
      };

      Transforms.insertNodes(editor, variableElement, { at: range, match: Text.isText });

      // double move to move to the next character
      Transforms.move(editor);
      Transforms.move(editor);

      // space is required to work correctly
      Transforms.insertText(editor, ' ');

      if (!StaticEditor.isFocused(editor)) {
        StaticEditor.focus(editor);
      }
    },
  };

  return Object.assign(StaticEditor, VariablesStaticEditor);
};
