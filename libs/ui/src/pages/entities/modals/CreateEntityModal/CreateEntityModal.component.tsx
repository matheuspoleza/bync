import { useCallback, useState } from 'react';

import { Modal } from '@/components/Modal';
import { Divider } from '@/components/Other/Divider';
import { Box } from '@/components/Utility/Box';
import { type IValueEntry } from '@/pages/entities/components/EntityValuesSection/EntityValueList/EntityValueList.component';
import { useMockImport } from '@/pages/hooks/useMockImport';

import { EntityValuesSection } from '../../components/EntityValuesSection';
import { CUSTOM_TEXT } from '../../const';
import { EntityNameField } from '../components/EntityNameField';
import { EntityTypeAndPreview } from '../components/EntityTypeAndPreview';
import { submitButtonStyles } from './CreateEntityModal.css';
import { generateValues, getEntityValue } from './CreateEntityModal.util';

export interface ICreateEntityModal {
  onClose: VoidFunction;
}

export const CreateEntityModal: React.FC<ICreateEntityModal> = ({ onClose }) => {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);

  const [isPreviewVisible, setIsPreviewVisible] = useState(false);

  const [valueEntries, setValueEntries] = useState<IValueEntry[]>([]);
  const [dataType, setDataType] = useState<string | null>(null);
  const [valueError, setValuError] = useState(false);
  const [dataTypeError, setDataTypeError] = useState(false);

  const { isUploading, onImport } = useMockImport(() => onClose?.());

  const onGenerateClick = (count: number) => {
    setValueEntries([...generateValues(count), ...valueEntries]);
  };

  const onAddValue = useCallback(
    (item: IValueEntry) => {
      setValueEntries([item, ...valueEntries]);
    },
    [valueEntries]
  );

  const onDeleteValue = (id: string) => {
    setValueEntries(valueEntries.filter((item) => item.id !== id));
  };

  const onValueEntryChange = (item: IValueEntry, patch: Partial<IValueEntry>) => {
    const index = valueEntries.findIndex((entry) => entry.id === item.id);
    const newEntry = { ...valueEntries[index], ...patch };
    setValueEntries([...valueEntries.slice(0, index), newEntry, ...valueEntries.slice(index + 1)]);
  };

  const onCreateEntity = () => {
    const isValueEmpty =
      valueEntries.length === 1 && dataType === CUSTOM_TEXT && !valueEntries[0].firstLine.value?.length;
    if (dataType === CUSTOM_TEXT && isValueEmpty) {
      setValuError(true);
    }
    if (!dataType) {
      setDataTypeError(true);
    }
    if (name.length && !valueError) {
      onImport();
    } else {
      setIsPreviewVisible(false);
      setNameError(true);
    }
  };

  const onNameBlur = () => setIsPreviewVisible(!!name.length);

  const onDataTypeChange = (value: string | null) => {
    setDataType(value as string);

    if (value === CUSTOM_TEXT && valueEntries.length === 0) {
      onAddValue(getEntityValue());
    }
  };

  return (
    <Modal.Container>
      <Modal.Header title="Create entity" onClose={onClose} />
      <Box pt={20} px={24} pb={24} direction="column" gap={20}>
        <EntityNameField
          error={nameError}
          onFocus={() => setNameError(false)}
          value={name}
          onBlur={() => onNameBlur()}
          onValueChange={setName}
          disabled={isUploading}
          errorMessage={nameError ? 'Name is required.' : ''}
        />
        <EntityTypeAndPreview
          entityName={name}
          onDropdownChange={onDataTypeChange}
          onDropdownFocus={() => setDataTypeError(false)}
          dataTypeError={dataTypeError}
          isPreviewVisible={isPreviewVisible}
          isDisabled={isUploading}
        />
      </Box>
      <Divider fullWidth noPadding />
      <EntityValuesSection
        onGenerate={onGenerateClick}
        valueEntries={valueEntries}
        onAddValue={() => onAddValue(getEntityValue())}
        error={valueError}
        isUploading={isUploading}
        onValueEntryChange={onValueEntryChange}
        onDeleteValue={onDeleteValue}
        firstLineProps={{
          onFocus: () => (valueError ? setValuError(false) : undefined),
        }}
      />
      <Modal.Footer>
        <Modal.Footer.Button label="Cancel" variant="secondary" onClick={onClose} />
        {/* TODO replace by a special button once DX-712 is implemented */}

        <Modal.Footer.Button
          className={submitButtonStyles}
          label={isUploading ? '' : 'Create entity'}
          disabled={isUploading}
          isLoading={isUploading}
          onClick={onCreateEntity}
        />
      </Modal.Footer>
    </Modal.Container>
  );
};
