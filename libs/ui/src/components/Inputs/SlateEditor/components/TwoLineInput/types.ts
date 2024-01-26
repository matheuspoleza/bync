import type { ISlateEditor, SlateEditorRef } from '../../SlateEditor.interface';

export interface ISlateEditorTwoLineInput {
  lineOne: ISlateEditor & { ref?: React.Ref<SlateEditorRef> };
  lineTwo: ISlateEditor & { ref?: React.Ref<SlateEditorRef> };
  testID?: string;
}
