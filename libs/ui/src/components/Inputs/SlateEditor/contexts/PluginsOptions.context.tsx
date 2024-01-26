import React from 'react';

import { PLUGIN_DEFAULT_OPTIONS_MAP } from '../editor/editor.constant';
import type { PluginsOptions } from '../editor/plugins/plugin.interface';

const PluginsOptionsContext = React.createContext<PluginsOptions>({});

export const { Provider: PluginsOptionsContextProvider } = PluginsOptionsContext;

// rerenders on each editor change(includes selection and etc)
export const usePluginOptions = <T extends keyof PluginsOptions>(type: T): NonNullable<PluginsOptions[T]> =>
  React.useContext(PluginsOptionsContext)[type] ??
  (PLUGIN_DEFAULT_OPTIONS_MAP[type]() as NonNullable<PluginsOptions[T]>);
