import { ContextMenu, MenuItem } from '@/components/Navigation';
import { Text } from '@/components/Text/Text.component';
import { Box, Popper, Tooltip } from '@/components/Utility';
import { composeRefs } from '@/utils/ref.util';

import { ColorPreview } from '../../ColorPreview/ColorPreview.component';
import { ColorNameForm } from '../ColorNameForm/ColorNameForm.component';
import { isLocalColor } from '../ColorPickerForm.utils';
import type { IColorList } from './ColorList.interface';

export const ColorList: React.FC<IColorList> = ({
  size = 'large',
  gap,
  themes,
  isDisabled,
  selectedColor,
  onColorSelect,
  onDeleteCustomTheme,
  onUpdateCustomTheme,
}) => {
  const lowercaseSelectedColor = selectedColor.toLowerCase();

  return (
    <Box direction="row" justify="start" wrap="wrap" gap={gap}>
      {themes.map((theme) => {
        const standardGrade = theme.color.toLowerCase();
        const localColor = isLocalColor(theme.color);

        if (localColor) {
          return (
            <ColorPreview
              key={standardGrade}
              size={size}
              color={theme.color}
              onClick={() => onColorSelect(theme.color)}
              isActive={standardGrade === lowercaseSelectedColor}
              isDisabled={isDisabled}
            />
          );
        }

        return (
          <Popper
            key={standardGrade}
            placement="bottom-start"
            referenceElement={({ ref: renameRef, onOpen: onOpenRename, isOpen: renameIsOpen }) => (
              <Tooltip
                placement="top"
                referenceElement={({ ref: tooltipRef, onOpen: onOpenTooltip, onClose: onCloseTooltip }) => (
                  <ContextMenu
                    width={133}
                    boundToReferenceElement
                    referenceElement={({ ref: contextRef, onContextMenu }) => (
                      <Box
                        ref={composeRefs(contextRef, tooltipRef, renameRef)}
                        onMouseEnter={theme.label ? onOpenTooltip : undefined}
                        onMouseLeave={theme.label ? onCloseTooltip : undefined}
                        onContextMenu={onContextMenu}
                      >
                        <ColorPreview
                          size={size}
                          color={theme.color}
                          onClick={() => onColorSelect(theme.color)}
                          isActive={renameIsOpen || standardGrade === lowercaseSelectedColor}
                          isDisabled={isDisabled}
                        />
                      </Box>
                    )}
                  >
                    {({ onClose: onCloseContext }) => (
                      <>
                        <MenuItem
                          label="Edit label"
                          onClick={() => {
                            onCloseContext();
                            onOpenRename();
                          }}
                        />

                        <MenuItem label="Delete" onClick={() => onDeleteCustomTheme?.(theme)} />
                      </>
                    )}
                  </ContextMenu>
                )}
              >
                {() => <Text variant="caption">{theme.label}</Text>}
              </Tooltip>
            )}
          >
            {({ onClose }) => (
              <ColorNameForm
                value={theme.label}
                onSave={(name) => onUpdateCustomTheme?.({ ...theme, label: name })}
                onClose={onClose}
              />
            )}
          </Popper>
        );
      })}
    </Box>
  );
};
