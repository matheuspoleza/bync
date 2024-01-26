import { useCallback, useState } from 'react';

import { SquareButton } from '@/components/Buttons/SquareButton';
import { Modal } from '@/components/Modal';
import { Menu, MenuItem } from '@/components/Navigation/Menu';
import { Divider } from '@/components/Other/Divider';
import { Box } from '@/components/Utility/Box';
import { Popper } from '@/components/Utility/Popper';

import { EntityValuesSection } from '../../components/EntityValuesSection';
import { type IValueEntry } from '../../components/EntityValuesSection/EntityValueList';
import { CUSTOM_TEXT } from '../../const';
import { EntityNameField } from '../components/EntityNameField';
import { EntityTypeAndPreview } from '../components/EntityTypeAndPreview';
import { LeftSearchEntityButton } from '../components/LeftSearchEntityButton';
import { generateValues, getEntityValue } from '../CreateEntityModal/CreateEntityModal.util';

export interface IEditEntityModal {
  onClose: VoidFunction;
  entity: { dataType: string; name: string; values: IValueEntry[] };
}

export const EditEntityModal: React.FC<IEditEntityModal> = ({ onClose, entity }) => {
  const [name, setName] = useState(entity.name);
  const [nameError, setNameError] = useState(false);
  const [isPreviewVisible, setIsPreviewVisible] = useState(true);
  const [dataType, setDataType] = useState<string>(entity.dataType);
  const [valueEntries, setValueEntries] = useState<IValueEntry[]>(entity.values);
  const [valueError, setValuError] = useState(false);
  const [dataTypeError, setDataTypeError] = useState(false);

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

  const onGenerateClick = (count: number) => {
    setValueEntries([...generateValues(count), ...valueEntries]);
  };

  const onValueEntryChange = (item: IValueEntry, patch: Partial<IValueEntry>) => {
    const index = valueEntries.findIndex((entry) => entry.id === item.id);
    const newEntry = { ...valueEntries[index], ...patch };
    setValueEntries([...valueEntries.slice(0, index), newEntry, ...valueEntries.slice(index + 1)]);
  };

  const onNameBlur = () => setIsPreviewVisible(!!name.length);

  const onDataTypeChange = (value: string | null) => {
    setDataType(value as string);

    if (value === CUSTOM_TEXT && valueEntries.length === 0) {
      onAddValue(getEntityValue());
    }
  };

  const secondaryMenuButton = (
    <Popper
      placement="bottom-start"
      referenceElement={({ isOpen, onToggle, ref }) => (
        <SquareButton isActive={isOpen} onClick={onToggle} ref={ref} size="xlarge" iconName="More" />
      )}
    >
      {() => (
        <Menu width={83}>
          <MenuItem label="Delete" />
        </Menu>
      )}
    </Popper>
  );

  return (
    <Modal.Container>
      <Modal.Header
        title="Edit entity"
        onClose={onClose}
        leftButton={<LeftSearchEntityButton />}
        secondaryButton={secondaryMenuButton}
      />
      <Box pt={20} px={24} pb={24} direction="column" gap={20}>
        <EntityNameField
          error={nameError}
          onFocus={() => setNameError(false)}
          value={name}
          onBlur={() => onNameBlur()}
          onValueChange={setName}
          errorMessage={nameError ? 'Name is required.' : ''}
        />
        <EntityTypeAndPreview
          dataType={dataType}
          entityName={name}
          onDropdownChange={(value) => onDataTypeChange(value as string)}
          onDropdownFocus={() => setDataTypeError(false)}
          dataTypeError={dataTypeError}
          isPreviewVisible={isPreviewVisible}
        />
      </Box>
      <Divider fullWidth noPadding />
      <EntityValuesSection
        onAddValue={() => onAddValue(getEntityValue())}
        onGenerate={onGenerateClick}
        valueEntries={valueEntries}
        error={valueError}
        onValueEntryChange={onValueEntryChange}
        onDeleteValue={onDeleteValue}
        firstLineProps={{
          onFocus: () => (valueError ? setValuError(false) : undefined),
        }}
      />
      <Modal.Footer>
        <Modal.Footer.Button label="Close" variant="secondary" onClick={() => null} />
      </Modal.Footer>
    </Modal.Container>
  );
};
