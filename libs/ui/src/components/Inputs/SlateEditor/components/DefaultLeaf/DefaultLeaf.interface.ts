import type { RenderLeafProps } from 'slate-react';

import type { PluginsOptions } from '../../editor/plugins/plugin.interface';
import type { Editor } from '../../SlateEditor.interface';

export interface IDefaultLeaf extends RenderLeafProps {
  className?: string;
}

export interface IDefaultLeafPreview extends Pick<IDefaultLeaf, 'leaf'> {
  editor: Editor;
  pluginsOptions: PluginsOptions;
}
