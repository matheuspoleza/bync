import { StaticEditor } from '../../../editor/staticEditor';
import type { ElementProperty } from '../../../SlateEditor.constant';
import type { Element } from '../../../SlateEditor.interface';
import type { PropertyButtonFactoryOptions } from './button.util';
import { buttonFactory } from './button.util';

interface ElementPropertyButtonFactoryOptions<Property extends ElementProperty> extends PropertyButtonFactoryOptions {
  value: NonNullable<Element[Property]>;
  property: Property;
}

export const elementPropertyButtonFactory = <P extends ElementProperty>({
  value,
  property,
  nullable,
  ...options
}: ElementPropertyButtonFactoryOptions<P>) =>
  buttonFactory({
    ...options,
    onAction: (editor) => StaticEditor.setElementProperty(editor, property, value),
    isActive: (editor) => StaticEditor.isElementPropertyActive(editor, property, value, { nullable }),
  });
