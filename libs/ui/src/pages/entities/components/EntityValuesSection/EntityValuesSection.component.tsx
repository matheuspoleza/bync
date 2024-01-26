import type { ITwoLineInput } from '@/components/Inputs/Input/TwoLineInput';
import { Section } from '@/components/Section';
import { Box } from '@/components/Utility/Box';

import type { IValueEntry } from './EntityValueList/EntityValueList.component';
import { EntityValueList } from './EntityValueList/EntityValueList.component';

export interface IEntityValuesSection {
  valueEntries: IValueEntry[];
  onDeleteValue: (id: string) => void;
  onValueEntryChange: (item: IValueEntry, patch: Partial<IValueEntry>) => void;
  onAddValue: () => void;

  error?: boolean;
  disabled?: boolean;
  isUploading?: boolean;
  onGenerate?: (count: number) => void;
  firstLineProps?: Partial<ITwoLineInput['firstLineProps']>;
  secondLineProps?: Partial<ITwoLineInput['secondLineProps']>;
}

export const EntityValuesSection: React.FC<IEntityValuesSection> = ({
  valueEntries,
  onAddValue,
  onDeleteValue,
  onValueEntryChange,
  onGenerate,
  firstLineProps,
  secondLineProps,
  disabled,
  error,
}) => {
  const onValuesHeaderClick = () => {
    if (valueEntries.length) return;
    onAddValue();
  };
  return (
    <>
      <Box id="values-collapsible-section" pt={11} pb={valueEntries.length ? 0 : 11}>
        <Section.Header.Container
          variant={valueEntries.length ? 'active' : 'basic'}
          title="Values"
          {...(!valueEntries.length ? { onHeaderClick: onValuesHeaderClick } : null)}
        >
          <Section.Header.Button variant="light" iconName="Plus" onClick={onAddValue} disabled={disabled} />
        </Section.Header.Container>
      </Box>
      {valueEntries.length ? (
        <EntityValueList
          onAddValue={onAddValue}
          onGenerate={onGenerate}
          valueEntries={valueEntries}
          error={error}
          onValueEntryChange={onValueEntryChange}
          onDeleteValue={onDeleteValue}
          firstLineProps={firstLineProps}
          secondLineProps={secondLineProps}
        />
      ) : null}
    </>
  );
};
