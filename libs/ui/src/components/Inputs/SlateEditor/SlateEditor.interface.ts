import type { BaseEditor, BaseElement, BaseRange, BaseText, Descendant } from 'slate';
import type { HistoryEditor } from 'slate-history';
import type { ReactEditor } from 'slate-react';
import type { EditableProps } from 'slate-react/dist/components/editable';

import type { FormControlProps, RGBAColor } from '@/types';

import type {
  EditorOptions,
  PartialOptions,
  PluginsEditor,
  PluginsOptions as AllPluginsOptions,
  PluginsRange,
  PluginsText,
} from './editor/plugins/plugin.interface';
import type { ElementProperty, ElementType, TextProperty, VariableElementVariant } from './SlateEditor.constant';

export interface Range extends BaseRange, PluginsRange {}

export interface Text extends BaseText, PluginsText {
  [TextProperty.COLOR]?: RGBAColor;
  [TextProperty.ITALIC]?: boolean;
  [TextProperty.UNDERLINE]?: boolean;
  [TextProperty.FONT_WEIGHT]?: string;
  [TextProperty.FONT_FAMILY]?: string;
  [TextProperty.STRIKE_THROUGH]?: boolean;
  [TextProperty.BACKGROUND_COLOR]?: RGBAColor;
}

export interface Element extends BaseElement {
  type?: string;
  [ElementProperty.TEXT_ALIGN]?: string;
}

export interface LinkElement extends Element {
  type: ElementType.LINK;
  url?: string;
}

export interface VariableElement extends Element {
  type: ElementType.VARIABLE;
  variableID: string;
  variableVariant: VariableElementVariant;
}

export declare type AnyElement = Element | LinkElement | VariableElement;

export interface Editor extends BaseEditor, ReactEditor, HistoryEditor, PluginsEditor {}

export interface SlateEditorRef {
  focus: VoidFunction;
  getEditor: () => Editor;
  getContent: () => Descendant[];
}

export interface PluginsOptions extends PartialOptions<AllPluginsOptions> {}

export interface ISlateEditor
  extends FormControlProps<Descendant[]>,
    Omit<EditableProps, 'value' | 'decorate' | 'children'> {
  editor: Editor;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  options?: Partial<EditorOptions>;
  pluginsOptions?: PluginsOptions;
  editableContainer?: (props: { editable: React.ReactNode }) => React.ReactNode;
  ellipsis?: boolean;
}
