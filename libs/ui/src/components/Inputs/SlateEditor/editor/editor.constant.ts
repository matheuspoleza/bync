import { Tokens } from '@/styles';
import { inputTokens } from '@/styles/theme/components';
import { colorStringToRGBA } from '@/utils/colors/color.util';

import { PluginType } from '../SlateEditor.constant';
import { withBasePlugin } from './plugins/base.plugin';
import { withFakeSelectionPlugin } from './plugins/fake-selection.plugin';
import { withHotkeysPlugin } from './plugins/hotkeys.plugin';
import { withDefaultLinksPluginOptions, withLinksPlugin } from './plugins/links.plugins';
import type { EditorOptions, Plugin, PluginsOptions } from './plugins/plugin.interface';
import { withPreventCallbacksPlugin } from './plugins/prevent-callbacks.plugin';
import { withDefaultSingleLinePluginOptions, withSingleLinePlugin } from './plugins/single-line.plugin';
import { withDefaultVariablesPluginOptions, withVariablesPlugin } from './plugins/variables.plugin';

export enum InternalPluginType {
  BASE = 'base',
  HOTKEY = 'hotkey',
  FAKE_SELECTION = 'fake_selection',
  PREVENT_CALLBACK = 'prevent_callback',
}

export const DEFAULT_OPTIONS: EditorOptions = {
  defaultColor: colorStringToRGBA(inputTokens.colors.text.default.text),
  fakeSelectionColor: colorStringToRGBA(Tokens.colors.accent.accent100),
};

export const DEFAULT_PLUGINS_OPTIONS: PluginsOptions = {};

export const PLUGIN_MAP: Record<PluginType | InternalPluginType, Plugin> = {
  [PluginType.LINK]: withLinksPlugin,
  [PluginType.VARIABLE]: withVariablesPlugin,
  [PluginType.SINGLE_LINE]: withSingleLinePlugin,
  [InternalPluginType.BASE]: withBasePlugin,
  [InternalPluginType.HOTKEY]: withHotkeysPlugin,
  [InternalPluginType.FAKE_SELECTION]: withFakeSelectionPlugin,
  [InternalPluginType.PREVENT_CALLBACK]: withPreventCallbacksPlugin,
};

export const PLUGIN_DEFAULT_OPTIONS_MAP = {
  [PluginType.LINK]: withDefaultLinksPluginOptions,
  [PluginType.VARIABLE]: withDefaultVariablesPluginOptions,
  [PluginType.SINGLE_LINE]: withDefaultSingleLinePluginOptions,
};

export const INTERNAL_PLUGINS_ORDER = [
  InternalPluginType.BASE,
  InternalPluginType.FAKE_SELECTION,
  InternalPluginType.PREVENT_CALLBACK,
  InternalPluginType.HOTKEY,
];

export const PUBLIC_PLUGINS_ORDER = [
  // variables should be above links to support variables inside links
  PluginType.VARIABLE,
  PluginType.LINK,
  PluginType.SINGLE_LINE,
];
