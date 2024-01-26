import { isEventActionKey } from '@/utils/event.util';

import { type LinksPluginOptions } from '../../editor/plugins/links.plugins';
import type { LinkElement } from '../../SlateEditor.interface';

export const useOpenLink =
  ({ element, pluginOptions }: { element: LinkElement; pluginOptions: LinksPluginOptions }) =>
  (event: React.MouseEvent) => {
    if (!element.url?.trim() || isEventActionKey(event)) return;

    event.stopPropagation();
    event.preventDefault();

    window.open(pluginOptions.normalizeURL(element.url), '_blank', 'noopener=true,noreferrer=true')?.focus();
  };
