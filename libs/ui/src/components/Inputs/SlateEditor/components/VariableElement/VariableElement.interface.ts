import type { RenderElementProps } from 'slate-react';

import type { VariableElement } from '../../SlateEditor.interface';
import type { IDefaultElementPreview } from '../DefaultElement/DefaultElement.interface';

export interface IVariableElement extends Omit<RenderElementProps, 'element'> {
  element: VariableElement;
}

export interface IVariableElementPreview extends Omit<IDefaultElementPreview, 'element'> {
  element: VariableElement;
}
