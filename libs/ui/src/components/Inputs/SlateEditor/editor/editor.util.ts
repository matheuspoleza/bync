import flowRight from 'lodash/flowRight';
import type { Editor } from 'slate';

import type { PluginType } from '../SlateEditor.constant';
import {
  DEFAULT_OPTIONS,
  INTERNAL_PLUGINS_ORDER,
  PLUGIN_DEFAULT_OPTIONS_MAP,
  PLUGIN_MAP,
  PUBLIC_PLUGINS_ORDER,
} from './editor.constant';
import { withFakeSelectionStaticEditor } from './plugins/fake-selection.plugin';
import { withLinksStaticEditor } from './plugins/links.plugins';
import type { PartialOptions, PluginsOptions } from './plugins/plugin.interface';
import { withVariablesStaticEditor } from './plugins/variables.plugin';
import type { StaticEditor } from './staticEditor';

export const withPluginsStaticEditor = (StaticEditor: StaticEditor): StaticEditor =>
  flowRight(withLinksStaticEditor, withVariablesStaticEditor, withFakeSelectionStaticEditor)(StaticEditor);

export const withDefaultOptions = (pluginsOrder: PluginType[], options?: PartialOptions<PluginsOptions>) => {
  const pluginsOptions: PluginsOptions = {};

  pluginsOrder.forEach((type) =>
    Object.assign(pluginsOptions, { [type]: PLUGIN_DEFAULT_OPTIONS_MAP[type](options?.[type]) })
  );

  return pluginsOptions;
};

export const withPlugins =
  (StaticEditor: StaticEditor, pluginsTypes: PluginType[] = []) =>
  (editor: Editor): Editor => {
    const pluginsSet = new Set(pluginsTypes);

    const pluginsTypesOrder = PUBLIC_PLUGINS_ORDER.map((type) => (pluginsSet.has(type) ? type : null)).filter(
      (type): type is PluginType => !!type
    );
    const plugins = [...INTERNAL_PLUGINS_ORDER, ...pluginsTypesOrder].map((type) => PLUGIN_MAP[type](StaticEditor));

    /* eslint-disable no-param-reassign */
    editor.options = DEFAULT_OPTIONS;
    editor.plugins = pluginsSet;
    editor.pluginsOptions = {};
    editor.setPluginsOptions = (options) => {
      editor.pluginsOptions = withDefaultOptions(pluginsTypesOrder, options);

      return editor.pluginsOptions;
    };
    /* eslint-enable no-param-reassign */

    return plugins.reduce((editor, plugin) => plugin(editor), editor);
  };
