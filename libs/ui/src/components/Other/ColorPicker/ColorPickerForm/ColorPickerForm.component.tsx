import React, { useMemo, useState } from 'react';

import { SquareButton } from '@/components/Buttons/SquareButton/SquareButton.component';
import { Text } from '@/components/Text';
import { Box, Popper } from '@/components/Utility';
import { Surface } from '@/components/Utility/Surface';
import { useDebouncedCallback } from '@/hooks/callback.hook';
import { useLinkedState } from '@/hooks/linked.hook';
import { normalizeColor } from '@/utils/colors/color.util';
import { createStandardShadeFromHue } from '@/utils/colors/hsl.util';
import { hexToHsluv } from '@/utils/colors/hsluv.util';

import { ColorPreview } from '../ColorPreview/ColorPreview.component';
import { HueSelector } from '../HueSelector/HueSelector.component';
import { ColorList } from './ColorList/ColorList.component';
import { ColorNameForm } from './ColorNameForm/ColorNameForm.component';
import { colorThemeTextStyle } from './ColorPickerForm.css';
import type { IColorPickerForm } from './ColorPickerForm.interface';
import { colorsToTheme, mergeThemes } from './ColorPickerForm.utils';
import { ALL_COLORS, DEFAULT_SCHEME_COLORS } from './constants';

export const ColorPickerForm: React.FC<IColorPickerForm> = ({
  onChange,
  renderItem,
  isDisabled,
  debounceTime = 100,
  customThemes,
  selectedColor,
  onAddCustomTheme,
  onUpdateCustomTheme,
  onDeleteCustomTheme,
  ...props
}) => {
  const [showWheelColor, setShowWheelColor] = useState(true);
  const normalizedColor = useMemo(() => normalizeColor(selectedColor ?? DEFAULT_SCHEME_COLORS), [selectedColor]);
  const [selectedHex, setSelectedHex] = useLinkedState(normalizedColor);

  const debouncedOnChange = useDebouncedCallback(debounceTime, (color: string) => onChange(color), []);
  const localHue = useMemo(() => hexToHsluv(selectedHex)[0], [selectedHex]);

  const previewThemes = useMemo(() => colorsToTheme(ALL_COLORS.slice(0, 3)), []);
  const mergedCustomThemes = useMemo(() => mergeThemes(colorsToTheme(ALL_COLORS), customThemes), [customThemes]);

  const onChangeHex = (hex: string) => {
    setSelectedHex(hex);
    debouncedOnChange(hex);
    setShowWheelColor(ALL_COLORS.includes(hex));
  };

  return (
    <Box gap={8} {...props}>
      <ColorList
        gap={8}
        size="small"
        themes={previewThemes}
        isDisabled={isDisabled}
        selectedColor={selectedHex}
        onColorSelect={onChangeHex}
      />

      <Popper
        placement="bottom-start"
        referenceElement={({ ref, isOpen, onToggle }) => (
          <ColorPreview
            {...(showWheelColor ? { variant: 'wheel' } : { color: selectedHex })}
            ref={ref}
            onClick={onToggle}
            isActive={!showWheelColor || isOpen}
            isDisabled={isDisabled}
          />
        )}
      >
        {() => (
          <Surface width="256px" direction="column" gap={8} px={24} py={20}>
            {renderItem?.({ color: selectedHex })}

            <Box width="164" gap={10} justify="space-between" align="center">
              <HueSelector value={localHue} onValueChange={(v) => onChangeHex(createStandardShadeFromHue(v))} />

              <Popper
                placement="bottom-start"
                referenceElement={({ ref, onToggle, isOpen }) => (
                  <Box ref={ref} mr={-3}>
                    <SquareButton isActive={isOpen} iconName="Plus" onClick={onToggle} />
                  </Box>
                )}
              >
                {({ onClose }) => (
                  <ColorNameForm
                    onSave={(name) => onAddCustomTheme({ label: name, color: selectedHex })}
                    onClose={onClose}
                  />
                )}
              </Popper>
            </Box>

            <Box direction="column" gap={11}>
              <Text className={colorThemeTextStyle}>Color themes</Text>

              <ColorList
                gap={12}
                themes={mergedCustomThemes}
                selectedColor={selectedHex}
                onColorSelect={onChangeHex}
                onDeleteCustomTheme={onDeleteCustomTheme}
                onUpdateCustomTheme={onUpdateCustomTheme}
              />
            </Box>
          </Surface>
        )}
      </Popper>
    </Box>
  );
};
