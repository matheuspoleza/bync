import type React from 'react';
import type { Editor } from 'slate';

import type { Plugin } from './plugin.interface';

export interface HotkeysEditor {
  fireHotKey: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  registerHotKey: (key: string, callback: React.KeyboardEventHandler<HTMLDivElement>) => void;
  unregisterHotKey: (key: string, callback: React.KeyboardEventHandler<HTMLDivElement>) => void;
  _hotKeysHandlersMap: Partial<Record<string, Set<React.KeyboardEventHandler<HTMLDivElement>>>>;
}

export const withHotkeysPlugin: Plugin = () => (editor: Editor) => {
  const hotkeysEditor: HotkeysEditor = {
    _hotKeysHandlersMap: {},

    fireHotKey: (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (!event.ctrlKey && !event.metaKey) return;

      hotkeysEditor._hotKeysHandlersMap[event.key]?.forEach((callback) => callback(event));
    },

    registerHotKey: (key: string, callback: React.KeyboardEventHandler<HTMLDivElement>) => {
      const set = hotkeysEditor._hotKeysHandlersMap[key] ?? new Set();

      set.add(callback);

      hotkeysEditor._hotKeysHandlersMap[key] = set;
    },

    unregisterHotKey: (key: string, callback: React.KeyboardEventHandler<HTMLDivElement>) => {
      hotkeysEditor._hotKeysHandlersMap[key]?.delete(callback);
    },
  };

  return Object.assign(editor, hotkeysEditor);
};
