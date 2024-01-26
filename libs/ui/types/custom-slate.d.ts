import type { AnyElement, Editor, Range, Text } from '@/components/Inputs/SlateEditor/SlateEditor.interface';

declare module 'slate' {
  interface CustomTypes {
    Text: Text;
    Range: Range;
    Editor: Editor;
    Element: AnyElement;
  }
}
