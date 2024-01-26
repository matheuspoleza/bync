import type { Descendant } from 'slate';
import { Editor, Element, Node, Range, Transforms } from 'slate';

import type { PrismLanguage } from '../../prism';
import type { StaticEditor } from '../staticEditor';
import type {
  DataProcessor,
  DataProcessorMiddleware,
  DataProcessorOptions,
  Plugin,
  ProcessorNext,
  TextProcessor,
  TextProcessorMiddleware,
  TextProcessorOptions,
} from './plugin.interface';
import type { VariableItem } from './variables.plugin';

interface TextSerializerOptions {
  variablesMap?: Record<string, VariableItem>;
  markdownLinks?: boolean;
  encodeVariables?: boolean;
}

export interface BasePluginEditor {
  processText(options: TextProcessorOptions): Descendant[];
  isEmptyState(value: Descendant[]): boolean;
  nodeToString(node: Descendant, options: TextSerializerOptions): string;
  nodesToString(nodes: Descendant[], options: TextSerializerOptions): string[];
  prismLanguages(): PrismLanguage[];
  serializeToText(content: Descendant[], options?: TextSerializerOptions): string;
  registerPrismLanguage(language: PrismLanguage): void;
  registerTextProcessingMiddleware: (middleware: TextProcessorMiddleware) => void;
  registerDataProcessingMiddleware: (middleware: DataProcessorMiddleware) => void;
}

// eslint-disable-next-line sonarjs/cognitive-complexity
export const withBasePlugin: Plugin = (StaticEditor: StaticEditor) => (editor: Editor) => {
  const { onChange: originalOnChange, insertData: originalInsertData, insertText: originalInsertText } = editor;

  const PRISM_LANGUAGES: PrismLanguage[] = [];

  const defaultProcessor = (value: Descendant[]) => value;

  let prevContentEmpty: null | boolean = null;

  const processor: {
    text: (options: TextProcessorOptions) => ProcessorNext;
    data: (options: DataProcessorOptions) => ProcessorNext;
  } = {
    text: () => defaultProcessor,
    data: () => defaultProcessor,
  };

  const rooTextProcessor: TextProcessor = (value: Descendant[], options: TextProcessorOptions) =>
    processor.text(options)(value);

  const rooDataProcessor: DataProcessor = (value: Descendant[], options: DataProcessorOptions) =>
    processor.data(options)(value);

  const insertProcessedNodes = (nodes: Node | Node[]) => {
    if (!editor.selection) {
      return;
    }

    // If the cursor is at the end of an inline, move it outside of the inline before inserting
    if (Range.isCollapsed(editor.selection)) {
      const inline = StaticEditor.above<Element>(editor, {
        match: (n) => Element.isElement(n) && StaticEditor.isInline(editor, n),
        mode: 'highest',
      });

      if (inline) {
        const [, inlinePath] = inline;

        if (StaticEditor.isEnd(editor, editor.selection.anchor, inlinePath)) {
          const point = Editor.after(editor, inlinePath);

          Transforms.setSelection(editor, { anchor: point, focus: point });
        }
      }
    }

    Transforms.insertNodes(editor, nodes, { at: editor.selection, select: true });
  };

  const isNodesEqual = (nodes: Node[], processedNodes: Node[]) =>
    nodes.length === processedNodes.length && nodes.every((node, index) => node === processedNodes[index]);

  // eslint-disable-next-line no-param-reassign
  editor.onChange = (...args) => {
    originalOnChange(...args);

    if (prevContentEmpty === false && StaticEditor.isNewState(editor.children)) {
      prevContentEmpty = true;

      requestAnimationFrame(() => {
        const marks = StaticEditor.marks(editor);

        if (!marks) return;

        StaticEditor.withoutNormalizing(editor, () =>
          Object.keys(marks).forEach((mark) => StaticEditor.removeMark(editor, mark))
        );
      });
    } else {
      prevContentEmpty = StaticEditor.isNewState(editor.children);
    }
  };

  // eslint-disable-next-line no-param-reassign
  editor.insertText = (text, ...args) => {
    // insert text is called on paste and every keypress, so skipping keypress
    if (text.length <= 1) {
      originalInsertText(text, ...args);
      return;
    }

    const { selection } = editor;

    if (!selection) {
      return;
    }

    const nodes: Node[] = [{ text }];
    const processedNodes = rooTextProcessor(nodes, { pasted: true, originalText: text });

    if (!processedNodes || isNodesEqual(nodes, processedNodes)) {
      originalInsertText(text, ...args);
    } else {
      insertProcessedNodes(processedNodes);
    }
  };

  // eslint-disable-next-line no-param-reassign
  editor.insertData = (data: DataTransfer, ...args) => {
    const fragment = data.getData('application/x-slate-fragment');

    if (fragment) {
      const decoded = decodeURIComponent(window.atob(fragment));
      const parsed = JSON.parse(decoded) as Node[];
      editor.insertFragment(parsed);
      return;
    }

    const text = data.getData('text/plain');

    if (text) {
      editor.insertText(text);
    } else {
      const nodes: Node[] = [];
      const processedNodes = rooDataProcessor(nodes, { pasted: true, originalData: data });

      if (!processedNodes || isNodesEqual(nodes, processedNodes)) {
        originalInsertData(data, ...args);
      } else {
        insertProcessedNodes(processedNodes);
      }
    }
  };

  const pluginsEditor: BasePluginEditor = {
    nodeToString: (node, options): string => {
      if (!Element.isElement(node)) return Node.string(node);

      if (StaticEditor.isLink(node) && options.markdownLinks) {
        return `[${pluginsEditor.serializeToText(node.children, options)}](${node.url})`;
      }

      if (StaticEditor.isVariable(node) && options.encodeVariables)
        return `{${options.variablesMap?.[node.variableID]?.name ?? node.variableID}}`;

      return pluginsEditor.nodesToString(node.children, options).join('');
    },

    nodesToString: (nodes, options): string[] => nodes.map((node) => pluginsEditor.nodeToString(node, options)),

    serializeToText: (content, { encodeVariables = true, markdownLinks = false, variablesMap } = {}): string =>
      pluginsEditor.nodesToString(content, { encodeVariables, markdownLinks, variablesMap }).join('\n').trim(),

    processText: (options) => rooTextProcessor([{ text: options.originalText }], options),

    isEmptyState: (value): boolean => value.every((node) => !pluginsEditor.serializeToText([node]).trim()),

    prismLanguages: () => PRISM_LANGUAGES,

    registerPrismLanguage: (language) => {
      PRISM_LANGUAGES.push(language);
    },

    registerTextProcessingMiddleware: (middleware) => {
      const next = middleware(rooTextProcessor);
      const originalProcessor = processor.text;

      processor.text = (options) => (value) => next(originalProcessor(options))(value, options);
    },

    registerDataProcessingMiddleware: (middleware: DataProcessorMiddleware) => {
      const next = middleware(rooDataProcessor);
      const originalProcessor = processor.data;

      processor.data = (options) => (value) => next(originalProcessor(options))(value, options);
    },
  };

  return Object.assign(editor, pluginsEditor);
};
