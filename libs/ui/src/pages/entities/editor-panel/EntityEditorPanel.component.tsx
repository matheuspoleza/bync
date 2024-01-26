import { useCallback, useState } from 'react';

import { SquareButton } from '@/components/Buttons/SquareButton';
import { Editor } from '@/components/Form/Editor';
import { TextArea } from '@/components/Inputs/TextArea/TextArea.component';
import { Divider } from '@/components/Other/Divider';
import { Box } from '@/components/Utility/Box';
import { Collapsible, CollapsibleHeader, CollapsibleHeaderButton } from '@/components/Utility/Collapsible';
import { Scroll } from '@/components/Utility/Scroll';

import { EntityValuesSection } from '../components/EntityValuesSection';
import type { IValueEntry } from '../components/EntityValuesSection/EntityValueList';
import { CUSTOM_TEXT } from '../const';
import { EntityTypeAndPreview } from '../modals/components/EntityTypeAndPreview';
import { generateValues, getEntityValue } from '../modals/CreateEntityModal/CreateEntityModal.util';

export interface IEntityEditPanel {
  entity: { dataType: string; name: string; values: IValueEntry[] };
}

export const EntityEditorPanel: React.FC<IEntityEditPanel> = ({ entity }) => {
  const [name, setName] = useState(entity.name);
  const [dataType, setDataType] = useState<string>(entity.dataType);
  const [description, setDescription] = useState<string>('');
  const [valueEntries, setValueEntries] = useState<IValueEntry[]>(entity.values);

  const onAddValue = useCallback(
    (item: IValueEntry) => {
      setValueEntries([item, ...valueEntries]);
    },
    [valueEntries]
  );

  const onDeleteValue = (id: string) => {
    if (dataType === CUSTOM_TEXT && valueEntries.length === 1) return;
    setValueEntries(valueEntries.filter((item) => item.id !== id));
  };

  const onValueEntryChange = (item: IValueEntry, patch: Partial<IValueEntry>) => {
    const index = valueEntries.findIndex((entry) => entry.id === item.id);
    const newEntry = { ...valueEntries[index], ...patch };
    setValueEntries([...valueEntries.slice(0, index), newEntry, ...valueEntries.slice(index + 1)]);
  };

  const onGenerateClick = (count: number) => {
    setValueEntries([...generateValues(count), ...valueEntries]);
  };

  const collapsibleHeader = (
    <CollapsibleHeader label="Description">
      {({ isOpen, headerChildrenStyles }) => (
        <CollapsibleHeaderButton headerChildrenStyles={headerChildrenStyles} isOpen={isOpen} />
      )}
    </CollapsibleHeader>
  );

  return (
    <Editor
      title={name}
      onTitleChange={setName}
      headerActions={<SquareButton size="medium" iconName="More" onClick={() => null} />}
    >
      <Scroll overflow="scroll">
        <Box pl={24} pr={16} py={20}>
          <EntityTypeAndPreview
            dropdownWidth="177px"
            dataType={dataType}
            entityName={name}
            onDropdownChange={(value) => setDataType(value as string)}
            onDropdownFocus={() => null}
            isPreviewVisible={true}
          />
        </Box>
        <Divider fullWidth noPadding />

        <EntityValuesSection
          onAddValue={() => onAddValue(getEntityValue())}
          onGenerate={onGenerateClick}
          valueEntries={valueEntries}
          error={false}
          onValueEntryChange={onValueEntryChange}
          onDeleteValue={onDeleteValue}
        />

        <Divider fullWidth noPadding />
        <Collapsible showDivider header={collapsibleHeader} isEmpty={!description.length}>
          <TextArea
            minRows={4}
            maxRows={17}
            value={description}
            onValueChange={setDescription}
            placeholder="Enter entity description"
          />
        </Collapsible>
      </Scroll>
    </Editor>
  );
};
