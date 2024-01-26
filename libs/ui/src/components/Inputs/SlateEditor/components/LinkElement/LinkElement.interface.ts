import type { RenderElementProps } from 'slate-react';

import type { LinkElement } from '../../SlateEditor.interface';
import type { IDefaultElementPreview } from '../DefaultElement/DefaultElement.interface';

export interface ILinkElement extends Omit<RenderElementProps, 'element'> {
  element: LinkElement;
}

export interface ILinkElementPreview extends Omit<IDefaultElementPreview, 'element'> {
  element: LinkElement;
}
