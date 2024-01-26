import type { Descendant } from 'slate';

import type { PluginsOptions } from '@/components/Inputs/SlateEditor';

import type { IAttachmentContainer } from './AttachmentContainer';

export interface AudioAttachment {
  type: 'audio';
  title: string;
  src?: string;
}

export interface ImageAttachment {
  type: 'image';
  filename: string;
  src?: string;
}

export interface CardAttachment {
  type: 'card';
  title: Descendant[];
  description: Descendant[];
  isUploading?: boolean;
  src?: string;
}

export type AnyAttachment = ImageAttachment | AudioAttachment | CardAttachment;

export interface IAttachment extends IAttachmentContainer {
  attachment: AnyAttachment;
  pluginsOptions?: PluginsOptions;
}
