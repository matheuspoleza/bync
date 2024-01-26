import type { RenderElementProps } from 'slate-react';

import type { PluginsOptions } from '../../editor/plugins/plugin.interface';
import type { AnyElement, Editor } from '../../SlateEditor.interface';

export interface IDefaultElement extends RenderElementProps {}

export interface IDefaultElementPreview {
  editor: Editor;
  element: AnyElement;
  children: React.ReactNode;
  pluginsOptions: PluginsOptions;
}
