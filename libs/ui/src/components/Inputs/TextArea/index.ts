import { TextAreaAutoSize } from './AutoSize';
import { TextArea as TextAreaComponent } from './TextArea.component';

export type { ITextAreaAutoSize } from './AutoSize';
export type { ITextArea } from './types';

export const TextArea = Object.assign(TextAreaComponent, {
  AutoSize: TextAreaAutoSize,
});
