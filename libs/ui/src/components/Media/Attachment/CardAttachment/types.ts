import type { PluginsOptions } from '@/components/Inputs/SlateEditor';

import type { CardAttachment } from '../types';

export interface ICardAttachment {
  attachment: CardAttachment;

  testID?: string;
  className?: string;
  pluginsOptions?: PluginsOptions;
}
