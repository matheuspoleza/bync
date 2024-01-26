import type { Descendant, Editor, NodeEntry, Range } from 'slate';

import type { RGBAColor } from '@/types';

import type { PluginType } from '../../SlateEditor.constant';
import type { StaticEditor } from '../staticEditor';
import type { BasePluginEditor } from './base.plugin';
import type { FakeSelectionEditor, FakeSelectionStaticEditor, FakeSelectionText } from './fake-selection.plugin';
import type { HotkeysEditor } from './hotkeys.plugin';
import type { LinksPluginOptions, LinksStaticEditor } from './links.plugins';
import type { PreventCallbacksEditor } from './prevent-callbacks.plugin';
import type { SingleLinePluginOptions } from './single-line.plugin';
import type { VariablesDecorate, VariablesPluginOptions, VariablesStaticEditor } from './variables.plugin';

interface BaseProcessorOptions {
  pasted?: boolean;
}

export interface TextProcessorOptions extends BaseProcessorOptions {
  originalText: string;
}
export interface DataProcessorOptions extends BaseProcessorOptions {
  originalData: DataTransfer;
}

export type ProcessorNext = (value: Descendant[]) => Descendant[];

export type TextProcessor = (value: Descendant[], options: TextProcessorOptions) => Descendant[];

export type DataProcessor = (value: Descendant[], options: DataProcessorOptions) => Descendant[];

export type TextProcessorMiddleware = (process: TextProcessor) => (next: ProcessorNext) => TextProcessor;

export type DataProcessorMiddleware = (process: DataProcessor) => (next: ProcessorNext) => DataProcessor;

export type PluginDecorate = (entry: NodeEntry) => Range[];

export type Plugin = (StaticEditor: StaticEditor) => (editor: Editor) => Editor;

export type APIPlugin = (StaticEditor: StaticEditor) => StaticEditor;

interface PluginsDecorate extends VariablesDecorate {
  range?: Range;
  isSelected?: boolean;
}

export interface PluginsOptions {
  [PluginType.LINK]?: LinksPluginOptions;
  [PluginType.VARIABLE]?: VariablesPluginOptions;
  [PluginType.SINGLE_LINE]?: SingleLinePluginOptions;
}

export interface EditorOptions {
  defaultColor: RGBAColor;
  fakeSelectionColor: RGBAColor;
}

export type PartialOptions<Options> = { [Key in keyof Options]: Partial<Options[Key]> };

export interface PluginsStaticEditor extends LinksStaticEditor, VariablesStaticEditor, FakeSelectionStaticEditor {}

export interface PluginsText extends FakeSelectionText, PluginsDecorate {}

export interface PluginsRange extends PluginsDecorate {}

export interface PluginsEditor extends FakeSelectionEditor, HotkeysEditor, PreventCallbacksEditor, BasePluginEditor {
  options: EditorOptions;
  plugins: Set<PluginType>;
  pluginsOptions: PluginsOptions;
  setPluginsOptions: (options?: PartialOptions<PluginsOptions>) => PluginsOptions;
}
