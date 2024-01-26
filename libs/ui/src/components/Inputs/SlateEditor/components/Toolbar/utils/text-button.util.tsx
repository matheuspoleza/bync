import type { ConditionalPick } from 'type-fest';

import { StaticEditor } from '../../../editor/staticEditor';
import type { TextProperty } from '../../../SlateEditor.constant';
import type { Text } from '../../../SlateEditor.interface';
import { buttonFactory, type PropertyButtonBaseFactoryOptions, type PropertyButtonFactoryOptions } from './button.util';

// only boolean text property keys
type BooleanTextPropertyKey = keyof ConditionalPick<Pick<Text, TextProperty>, boolean | undefined>;

interface TextPropertyButtonFactoryOptions<Property extends TextProperty> extends PropertyButtonFactoryOptions {
  value: NonNullable<Text[Property]>;
  property: Property;
  canRemove?: boolean;
}

interface ToggleTextPropertyButtonFactoryOptions<P extends BooleanTextPropertyKey>
  extends PropertyButtonBaseFactoryOptions {
  property: P;
}

export const textPropertyButtonFactory = <Property extends TextProperty>({
  value,
  property,
  nullable,
  ...options
}: TextPropertyButtonFactoryOptions<Property>) =>
  buttonFactory({
    ...options,
    isActive: (editor) => StaticEditor.isTextPropertyActive(editor, property, value, { nullable }),
    onAction: (editor, active) => {
      if (!StaticEditor.isFocused(editor)) {
        StaticEditor.focusAtTheEnd(editor);
      }

      StaticEditor.setTextProperty(editor, property, active && options.canRemove ? undefined : value);
    },
  });

export const toggleTextPropertyButtonFactory = <Property extends BooleanTextPropertyKey>({
  property,
  ...options
}: ToggleTextPropertyButtonFactoryOptions<Property>) =>
  buttonFactory({
    ...options,
    isActive: (editor) => StaticEditor.isTextPropertyActive<Property>(editor, property, true),
    onAction: (editor, active) => {
      if (!StaticEditor.isFocused(editor)) {
        StaticEditor.focusAtTheEnd(editor);
      }

      StaticEditor.toggleTextProperty(editor, property, !active);
    },
  });
