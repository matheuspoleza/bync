import React from 'react';

import { createEditor } from '../editor/editor';
import type { PluginType } from '../SlateEditor.constant';
import type { Editor } from '../SlateEditor.interface';

export const useSetupEditor = (...plugins: PluginType[]): Editor => React.useMemo(() => createEditor(plugins), []);
