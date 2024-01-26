import type { Descendant } from 'slate';

import type { LinksPluginOptions } from '../../editor/plugins/links.plugins';
import type { VariablesPluginOptions } from '../../editor/plugins/variables.plugin';
import type { PluginType } from '../../SlateEditor.constant';
import type { Editor } from '../../SlateEditor.interface';
import type { IElementPreview } from '../Element/Element.interface';
import type { ILeafPreview } from '../Leaf/Leaf.interface';

interface PluginsOptions {
  [PluginType.LINK]?: Partial<Pick<LinksPluginOptions, 'color' | 'normalizeURL'>>;
  [PluginType.VARIABLE]?: Partial<Pick<VariablesPluginOptions, 'variablesMap'>>;
}

export interface IPreview {
  value: Descendant[];
  editor?: Editor;
  testID?: string;
  disabled?: boolean;
  placeholder?: string;
  pluginsOptions?: PluginsOptions;
  renderLeafPreview?: (props: ILeafPreview) => JSX.Element;
  renderElementPreview?: (props: IElementPreview) => JSX.Element;
  className?: string;
}
