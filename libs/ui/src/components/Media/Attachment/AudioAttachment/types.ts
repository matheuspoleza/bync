import type { IAttachmentContainer } from '../AttachmentContainer';
import type { AudioAttachment } from '../types';

export interface IAudioAttachment extends IAttachmentContainer {
  attachment: AudioAttachment;
}
