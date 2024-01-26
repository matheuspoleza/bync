import type { ISlateEditor } from '@/components/Inputs/SlateEditor';

export const hasEmptyValue = (value: ISlateEditor['value']) => {
  // TODO change to isEmptyState base plugin method once it works
  return (
    ((value[0] as any).children!.length === 1 && (value[0] as any).children![0].text === '') ||
    (!(value[0] as any).children![0].type &&
      (value[0] as any).children!.length === 1 &&
      (value[0] as any).children![0].text?.length === 0) ||
    (value[0] as any).children![0].text?.length === 1
  );
};
