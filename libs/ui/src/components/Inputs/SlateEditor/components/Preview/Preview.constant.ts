import { createEditor } from '../../editor/editor';
import { PluginType } from '../../SlateEditor.constant';

export const ALL_PLUGINS = Object.values(PluginType);

// we don't wanna have an editor for each preview component, it's ok to have shared one to reduce memory usage
export const PREVIEW_EDITOR = createEditor(ALL_PLUGINS);
