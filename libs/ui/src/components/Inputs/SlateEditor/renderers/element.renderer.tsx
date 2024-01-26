import { Element } from '../components/Element/Element.component';
import type { IElement, IElementPreview } from '../components/Element/Element.interface';
import { ElementPreview } from '../components/Element/ElementPreview.component';

export const defaultRenderElement = (props: IElement): JSX.Element => <Element {...props} />;

export const defaultRenderElementPreview = (props: IElementPreview): JSX.Element => <ElementPreview {...props} />;
