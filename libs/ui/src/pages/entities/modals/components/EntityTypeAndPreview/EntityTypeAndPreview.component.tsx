import { useState } from 'react';

import { ColorPickerForm } from '@/components/Other/ColorPicker';
import type { ICustomTheme } from '@/components/Other/ColorPicker/ColorPickerForm/ColorPickerForm.interface';
import { Entity } from '@/components/Other/VariableEntity/Entity';
import type { IBox } from '@/components/Utility/Box';
import { Box } from '@/components/Utility/Box';
import { DataTypeSelect } from '@/pages/entities/components/DataTypeSelect';
import { Tokens } from '@/styles';

import { variableStyles } from './EntityTypeAndPreview.css';

export interface IEntityTypeAndPreview extends IBox {
  dataType?: string;
  isDisabled?: boolean;
  color?: string;
  isPreviewVisible?: boolean;
  dataTypeError?: boolean;
  dropdownWidth?: string;
  entityName: string;
  onDropdownChange: (value: string | null) => void;
  onDropdownFocus: () => void;
}

export const EntityTypeAndPreview: React.FC<IEntityTypeAndPreview> = ({
  onDropdownChange,
  onDropdownFocus,
  dataTypeError,
  color: defaultColor,
  isDisabled,
  isPreviewVisible,
  entityName: name,
  dataType,
  dropdownWidth,
  ...props
}) => {
  const [color, setColor] = useState(defaultColor ?? Tokens.colors.neutralDark.neutralsDark200);
  const [customColors, setCustomColors] = useState<ICustomTheme[]>([]);

  const getNameEllipsis = (name: string) => {
    const maxLength = 12;
    return name.length > maxLength ? `${name.slice(0, maxLength)}...` : name;
  };

  return (
    <Box {...props} align="end" gap={props.gap ?? 20} id="type-selection-section">
      <DataTypeSelect
        width={dropdownWidth}
        onFocus={onDropdownFocus}
        dataType={dataType}
        onDropdownChange={onDropdownChange}
        isDisabled={isDisabled}
        error={dataTypeError}
      />
      <Box id="preview-and-colors" direction="column" justify="start" alignSelf="baseline">
        <Entity
          label={getNameEllipsis(name)}
          color={color}
          className={variableStyles({ isVisible: isPreviewVisible })}
        />

        <ColorPickerForm
          mb={8}
          mt={15}
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
