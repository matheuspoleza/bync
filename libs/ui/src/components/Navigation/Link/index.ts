import { HighLightLink } from './HighlightLink';
import { Link as LinkComponent } from './Link.component';

export type { IHighlightLink } from './HighlightLink';
export type { ILink } from './types';

export const Link = Object.assign(LinkComponent, {
  Highlight: HighLightLink,
});
