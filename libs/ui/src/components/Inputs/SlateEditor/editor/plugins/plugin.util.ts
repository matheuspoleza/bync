import type { Node, Text } from 'slate';
import { Element } from 'slate';

import type { Nullable } from '@/types';

import type { ElementType } from '../../SlateEditor.constant';
import type { ProcessorNext } from './plugin.interface';

export const matchAndProcessTextNodeToElement = (
  { type, node, regexp, next }: { type: ElementType; node: Text; regexp: RegExp; next: ProcessorNext },
  callback: (match: RegExpMatchArray, prevTextNode: Text) => Node[]
): Node[] => {
  const { text } = node;
  const nodes: Node[] = [];

  let prevMatch: Nullable<RegExpMatchArray> = null;

  for (const match of text.matchAll(regexp)) {
    let textNode: Text;

    // find text before the match
    if (!prevMatch) {
      textNode = { text: text.substring(0, match.index) };
    } else {
      textNode = { text: text.substring(prevMatch.index! + prevMatch[0].length, match.index) };
    }

    // eslint-disable-next-line callback-return
    nodes.push(...callback(match, textNode));

    prevMatch = match;
  }

  const isNodesProcessed = nodes.some((node) => Element.isElement(node) && node.type === type);

  if (prevMatch && isNodesProcessed) {
    // eslint-disable-next-line callback-return
    nodes.push(...next([{ text: text.substring(prevMatch.index! + prevMatch[0].length, text.length) || ' ' }]));
  }

  return isNodesProcessed ? nodes : next([node]);
};
