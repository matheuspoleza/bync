/* eslint-disable no-param-reassign */
import { type Editor, Transforms } from 'slate';

import type { Plugin } from './plugin.interface';

export interface SingleLinePluginOptions {
  nowrap?: boolean;
}

export const withDefaultSingleLinePluginOptions = (
  options?: Partial<SingleLinePluginOptions>
): SingleLinePluginOptions => ({
  nowrap: options?.nowrap ?? false,
});

export const withSingleLinePlugin: Plugin = () => (editor: Editor) => {
  const { normalizeNode } = editor;

  editor.normalizeNode = ([node, path]) => {
    if (path.length === 0 && editor.children.length > 1) {
      Transforms.mergeNodes(editor);
    }

    return normalizeNode([node, path]);
  };

  return editor;
};
