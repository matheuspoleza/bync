import flowRight from 'lodash/flowRight';
import { createEditor as createSlateEditor } from 'slate';
import { withHistory } from 'slate-history';
import { withReact } from 'slate-react';

import type { PluginType } from '../SlateEditor.constant';
import type { Editor } from '../SlateEditor.interface';
import { withPlugins } from './editor.util';
import { StaticEditor } from './staticEditor';

export const createEditor = (plugins: PluginType[] = []): Editor =>
  flowRight(withPlugins(StaticEditor, plugins), withHistory, withReact)(createSlateEditor());
