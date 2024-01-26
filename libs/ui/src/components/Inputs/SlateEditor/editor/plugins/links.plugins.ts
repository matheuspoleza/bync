import type { Descendant, Location, NodeEntry, Selection } from 'slate';
import { Editor, Element, Node, Point, Range, Text, Transforms } from 'slate';

import { linkLightTokens } from '@/styles/theme/components/link';
import type { Nullable, RGBAColor } from '@/types';
import { colorStringToRGBA, isEqualRGBA } from '@/utils/colors/color.util';

import { ElementType, PluginType, TextProperty } from '../../SlateEditor.constant';
import type { LinkElement } from '../../SlateEditor.interface';
import type { StaticEditor } from '../staticEditor';
import type { APIPlugin, Plugin } from './plugin.interface';
import { matchAndProcessTextNodeToElement } from './plugin.util';

export interface LinksPluginOptions {
  isURL: (value: string) => boolean;
  color: RGBAColor;
  regexp: RegExp;
  normalizeURL: (url: string) => string;
}

export interface LinksStaticEditor {
  link: (editor: Editor) => Nullable<LinkElement>;
  isLink: (node: Descendant) => node is LinkElement;
  wrapLink: (editor: Editor, options: { url: string; text?: string; selection?: Selection }) => void;
  linkEntry: (editor: Editor) => Nullable<NodeEntry<LinkElement>>;
  unwrapLink: (editor: Editor, options?: { selection?: Selection }) => void;
  applyLinkStyles: (editor: Editor, location: Location) => void;
  removeLinkStyles: (editor: Editor, location: Location) => void;
  identifyLinksInTextIfAny: (editor: Editor) => Nullable<[url: string, range: Range]>;
}

export const DEFAULT_LINKS_PLUGIN_OPTIONS: LinksPluginOptions = {
  color: colorStringToRGBA(linkLightTokens.color.default),
  regexp: /(((https?:)?\/\/)?(www\.)?[\w#%+.:=@~-]{2,256}\.[a-z]{2,10}\b([\w#%&+./:=?@~-]*))/g,
  isURL: (text) => !!text.match(DEFAULT_LINKS_PLUGIN_OPTIONS.regexp),
  normalizeURL: (url) => (url.startsWith('//') || url.includes('://') ? url : `//${url}`),
};

export const withDefaultLinksPluginOptions = (options?: Partial<LinksPluginOptions>): LinksPluginOptions => ({
  isURL: options?.isURL ?? DEFAULT_LINKS_PLUGIN_OPTIONS.isURL,
  color: options?.color ?? DEFAULT_LINKS_PLUGIN_OPTIONS.color,
  regexp: options?.regexp ?? DEFAULT_LINKS_PLUGIN_OPTIONS.regexp,
  normalizeURL: options?.normalizeURL ?? DEFAULT_LINKS_PLUGIN_OPTIONS.normalizeURL,
});

const getOptions = (editor: Editor): LinksPluginOptions =>
  withDefaultLinksPluginOptions(editor.pluginsOptions[PluginType.LINK]);

// eslint-disable-next-line sonarjs/cognitive-complexity
export const withLinksPlugin: Plugin = (StaticEditor: StaticEditor) => (editor: Editor) => {
  const { isInline: originalIsInline, onChange: originalOnChange, normalizeNode: originalNormalizeNode } = editor;

  const addNodeStylesToChildrenNodes = (node: Node): Node => {
    if (Element.isElement(node) && StaticEditor.isVoid(editor, node)) {
      return node;
    }

    if (Text.isText(node)) {
      return {
        ...node,
        [TextProperty.COLOR]: node[TextProperty.COLOR] ?? getOptions(editor).color,
      };
    }

    return {
      ...node,
      children: node.children.map(addNodeStylesToChildrenNodes),
    };
  };

  editor.registerTextProcessingMiddleware(() => (next) => (nodes, { pasted, originalText }) => {
    const createLinkFromTextNode = (node: Text): LinkElement => ({
      type: ElementType.LINK,
      url: node.text,
      children: next([node]).map(addNodeStylesToChildrenNodes),
    });

    const { selection } = editor;

    if (pasted && selection && Range.isExpanded(selection) && getOptions(editor).isURL(originalText)) {
      const selectedText = StaticEditor.string(editor, selection);

      return [createLinkFromTextNode({ text: selectedText })];
    }

    return nodes.flatMap((node) => {
      if (!Text.isText(node)) {
        return next([node]);
      }

      if (node.text && getOptions(editor).isURL(node.text)) {
        return createLinkFromTextNode(node);
      }

      return matchAndProcessTextNodeToElement(
        { type: ElementType.LINK, node, next, regexp: getOptions(editor).regexp },
        (match, textNode) => [...next([textNode]), createLinkFromTextNode({ text: match[0] })]
      );
    });
  });

  // eslint-disable-next-line no-param-reassign
  editor.isInline = (element, ...args) => (StaticEditor.isLink(element) ? true : originalIsInline(element, ...args));

  // eslint-disable-next-line no-param-reassign
  editor.onChange = (...args) => {
    const linkRange = StaticEditor.identifyLinksInTextIfAny(editor);

    originalOnChange(...args);

    if (linkRange) {
      // eslint-disable-next-line promise/catch-or-return, promise/always-return
      Promise.resolve().then(() => {
        const rangeRef = StaticEditor.rangeRef(editor, linkRange[1]);

        Transforms.wrapNodes(
          editor,
          { url: linkRange[0], type: ElementType.LINK, children: [] },
          { at: linkRange[1], split: true }
        );

        StaticEditor.applyLinkStyles(editor, rangeRef.current!);

        rangeRef.unref();
      });
    }
  };

  // eslint-disable-next-line no-param-reassign
  editor.normalizeNode = (entry, ...args) => {
    const [node, path] = entry;

    // if element is not link, run original normalization
    if (!Element.isElement(node) || !StaticEditor.isLink(node)) {
      originalNormalizeNode(entry, ...args);
      return;
    }

    // do nothing if children exists
    if (StaticEditor.serialize(node.children)) {
      return;
    }

    // remove empty link node
    Transforms.removeNodes(editor, { at: path });
  };

  return editor;
};

export const withLinksStaticEditor: APIPlugin = (StaticEditor: StaticEditor): StaticEditor => {
  const LinksStaticEditor: LinksStaticEditor = {
    isLink: (node): node is LinkElement => Element.isElement(node) && node.type === ElementType.LINK,

    link: (editor): Nullable<LinkElement> => StaticEditor.linkEntry(editor)?.[0] ?? null,

    linkEntry: (editor): Nullable<NodeEntry<LinkElement>> => {
      const entry = Editor.above(editor, {
        at: editor.selection || StaticEditor.fullRange(editor),
        match: StaticEditor.isLink,
      });

      return entry ?? null;
    },

    unwrapLink: (editor: Editor, { selection: selectionProp }: { selection?: Selection } = {}): void => {
      StaticEditor.withoutNormalizing(editor, () => {
        let selection = selectionProp ?? editor.selection ?? StaticEditor.fullRange(editor);

        if (Range.isCollapsed(selection)) {
          const entry = StaticEditor.above(editor, { at: selection, match: StaticEditor.isLink });

          if (entry) {
            const [node, path] = entry;

            selection = {
              anchor: { path, offset: 0 },
              focus: { path, offset: Node.string(node).length - 1 },
            };
          }
        }

        const selectionRef = StaticEditor.rangeRef(editor, selection);

        if (selectionRef.current) {
          StaticEditor.removeLinkStyles(editor, selectionRef.current);

          Transforms.unwrapNodes(editor, {
            at: selectionRef.current,
            match: StaticEditor.isLink,
            mode: 'all',
            split: true,
            voids: true,
          });
        }

        selection = selectionRef.unref()!;

        selection = { anchor: selection.focus, focus: selection.focus };

        Transforms.select(editor, selection);

        if (editor.isFakeSelectionApplied()) {
          editor.setFakeSelectionRange(selection);
        }
      });
    },

    wrapLink: (
      editor: Editor,
      { url, text, selection: selectionProp }: { url: string; text?: string; selection?: Selection }
    ): void => {
      StaticEditor.withoutNormalizing(editor, () => {
        let selection = selectionProp ?? editor.selection ?? StaticEditor.fullRange(editor);

        const selectionRef = StaticEditor.rangeRef(editor, selection);

        StaticEditor.unwrapLink(editor, { selection });

        const isLineEnd = Point.equals(
          selectionRef.current!.focus,
          Editor.end(editor, [selectionRef.current!.focus.path[0]])
        );
        const isCollapsed = Range.isCollapsed(selectionRef.current!);

        if (text || isCollapsed) {
          Transforms.insertNodes(
            editor,
            [
              {
                url,
                type: ElementType.LINK,
                children: [
                  {
                    text: text ?? url,
                    [TextProperty.COLOR]: getOptions(editor).color,
                  },
                ],
              },
              { text: ' ' },
            ],
            { at: selectionRef.current! }
          );
        } else {
          Transforms.wrapNodes(
            editor,
            {
              url,
              type: ElementType.LINK,
              children: [],
            },
            {
              at: selectionRef.current!,
              split: true,
              match: (node) =>
                Text.isText(node) &&
                (!editor.isFakeSelectionApplied() || editor.isFakeSelectionAppliedAppliedToText(node)),
            }
          );

          StaticEditor.applyLinkStyles(editor, selectionRef.current!);
        }

        selection = selectionRef.unref()!;

        const anchorPoint = isLineEnd ? Editor.end(editor, [selection.focus.path[0]]) : selection.focus;

        selection = { anchor: anchorPoint!, focus: anchorPoint! };

        Transforms.select(editor, selection);

        if (editor.isFakeSelectionApplied()) {
          editor.setFakeSelectionRange(selection);
        }
      });
    },

    applyLinkStyles: (editor: Editor, location: Location) => {
      StaticEditor.setTextPropertyAtLocation(editor, location, TextProperty.COLOR, getOptions(editor).color);
    },

    removeLinkStyles: (editor: Editor, location: Location) => {
      const textNodes = StaticEditor.nodes(editor, { match: Text.isText, at: location });
      const defaultColor = getOptions(editor).color;

      for (const [text, path] of textNodes) {
        if (isEqualRGBA(text.color ?? defaultColor, defaultColor)) {
          StaticEditor.setTextPropertyAtLocation(editor, path, TextProperty.COLOR, undefined);
        }
      }
    },

    identifyLinksInTextIfAny: (editor: Editor) => {
      // if selection is not collapsed, we do not proceed with the link detection
      if (editor.selection == null || !Range.isCollapsed(editor.selection)) {
        return null;
      }

      const [node] = Editor.parent(editor, editor.selection);

      // if we are already inside a link, exit early.
      if (StaticEditor.isLink(node)) {
        return null;
      }

      const [currentNode, currentNodePath] = Editor.node(editor, editor.selection);

      // if we are not inside a text node, exit early.
      if (!Text.isText(currentNode)) {
        return null;
      }

      let [start]: [Nullable<Point>, Point] = Range.edges(editor.selection);
      const cursorPoint = start;

      const startPointOfLastCharacter = Editor.before(editor, editor.selection, { unit: 'character' });

      if (!startPointOfLastCharacter) {
        return null;
      }

      const lastCharacter = Editor.string(editor, Editor.range(editor, startPointOfLastCharacter, cursorPoint));

      if (lastCharacter !== ' ') {
        return null;
      }

      let end = startPointOfLastCharacter;

      start = Editor.before(editor, end, { unit: 'character' }) ?? null;

      const startOfTextNode = Editor.point(editor, currentNodePath, { edge: 'start' });

      while (
        start &&
        Editor.string(editor, Editor.range(editor, start, end)) !== ' ' &&
        !Point.isBefore(start, startOfTextNode)
      ) {
        end = start;
        start = Editor.before(editor, end, { unit: 'character' }) ?? null;
      }

      const lastWordRange = Editor.range(editor, end, startPointOfLastCharacter);
      const lastWord = Editor.string(editor, lastWordRange);

      if (getOptions(editor).isURL(lastWord)) {
        return [lastWord, lastWordRange];
      }

      return null;
    },
  };

  return Object.assign(StaticEditor, LinksStaticEditor);
};
