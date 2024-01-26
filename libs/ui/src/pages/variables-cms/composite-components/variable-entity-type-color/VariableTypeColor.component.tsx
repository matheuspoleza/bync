import { useState } from 'react';

import { Variable } from '@/components';
import { ColorPickerForm } from '@/components/Other/ColorPicker';
import type { ICustomTheme } from '@/components/Other/ColorPicker/ColorPickerForm/ColorPickerForm.interface';
import { Entity } from '@/components/Other/VariableEntity/Entity';
import type { IBox } from '@/components/Utility/Box';
import { Box } from '@/components/Utility/Box';
import { Tokens } from '@/styles';

import { VariableDataTypeSelect } from './DataTypeSelect/VaraibleDataTypeSelect.component';
import { variableStyles } from './VariableTypeColor.css';

export interface IVariableEntityTypeColor extends IBox {
  variableOrEntity?: 'variable' | 'entity';
  isDisabled?: boolean;
  color?: string;
  isPreviewVisible?: boolean;
  dataTypeError?: boolean;
  dropdownWidth?: string;
  entityName: string;
  onDropdownChange: (value: any) => void;
  onDropdownFocus: () => void;
}

const COLOR_PICKER_TEST_ID = 'variable__color-picker';
const TYPE_DROPDOWN_TEST_ID = 'variable__type-dropdown';

const getNameEllipsis = (name: string) => {
  const maxLength = 12;
  return name.length > maxLength ? `${name.slice(0, maxLength)}...` : name;
};

export const VariableTypeColor: React.FC<IVariableEntityTypeColor> = ({
  onDropdownChange,
  onDropdownFocus,
  dataTypeError,
  color: defaultColor,
  isDisabled,
  isPreviewVisible,
  entityName: name,
  dropdownWidth,
  variableOrEntity = 'variable',
  ...props
}) => {
  const [color, setColor] = useState(defaultColor ?? Tokens.colors.neutralDark.neutralsDark200);
  const [customColors, setCustomColors] = useState<ICustomTheme[]>([]);

  return (
    <Box {...props} pb={24} px={24} align="end" gap={props.gap ?? 20}>
      <VariableDataTypeSelect
        width={dropdownWidth}
        onFocus={onDropdownFocus}
        onDropdownChange={onDropdownChange}
        error={dataTypeError}
        testID={TYPE_DROPDOWN_TEST_ID}
      />
      <Box id="preview-and-colors" direction="column" justify="start" alignSelf="baseline">
        {variableOrEntity === 'variable' && (
          <Variable
            label={getNameEllipsis(name)}
            color={color}
            className={variableStyles({ isVisible: isPreviewVisible })}
          />
        )}
        {variableOrEntity === 'entity' && (
          <Entity
            label={getNameEllipsis(name)}
            color={color}
            className={variableStyles({ isVisible: isPreviewVisible })}
          />
        )}

        <ColorPickerForm
          mb={8}
          mt={15}
          testID={COLOR_PICKER_TEST_ID}
          selectedColor={color}
          isDisabled={isDisabled}
          customThemes={[...customColors]}
          onChange={(newColor) => setColor(newColor)}
          onAddCustomTheme={(theme) => setCustomColors([...customColors, theme])}
          // these are required but don't seem to be needed in prototype
          onDeleteCustomTheme={() => null}
          onUpdateCustomTheme={() => null}
        />
      </Box>
    </Box>
  );
};
