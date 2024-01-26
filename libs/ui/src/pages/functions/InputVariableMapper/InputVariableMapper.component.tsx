import { useMemo } from 'react';
import type { Descendant } from 'slate';

import {
  ActionButtons,
  Box,
  FocusIndicator,
  Mapper,
  Menu,
  MenuItem,
  Popper,
  Search,
  SlateEditor,
  Text,
  Tooltip,
} from '@/components';
import type { VariableItem } from '@/components/Inputs/SlateEditor';
import { useTooltipModifiers } from '@/hooks';
import { Tokens } from '@/styles';

import { focusModifier, mapperInputStyles, mapperModifier } from './InputVariableMapper.css';

interface IVariableMapper {
  leftHandInput: React.ReactNode;
  rightHandInput: React.ReactNode;
  mapFrom: Descendant[];
  mapTo: Descendant[];
  description?: string;
  variablesMap: Record<string, VariableItem>;
  isError?: boolean;
}

const MAX_WIDTH_OF_VARIABLE = '115px';
const TOOLTIP_OFFSET_FOR_32_PX_ARROW_DROP = 41.5;

export const VariableMapper: React.FC<IVariableMapper> = ({ leftHandInput, rightHandInput, description, isError }) => {
  const modifiers = useTooltipModifiers([
    { name: 'offset', options: { offset: [TOOLTIP_OFFSET_FOR_32_PX_ARROW_DROP, 3] } },
  ]);

  return (
    <Tooltip
      placement="left"
      width={247}
      modifiers={modifiers}
      referenceElement={({ ref, onOpen, onClose }) => (
        <Box height="36px" align="center">
          <FocusIndicator.Container focusIndicatorRef={ref} pl={24} error={isError} className={focusModifier}>
            <Mapper
              equalityIcon="arrow"
              leftHandSide={<div onFocus={onOpen}>{leftHandInput}</div>}
              rightHandSide={
                <div onFocus={onOpen} onBlur={onClose}>
                  {rightHandInput}
                </div>
              }
              className={mapperModifier}
            />
          </FocusIndicator.Container>
        </Box>
      )}
    >
      {() => <TooltipContent description={description} />}
    </Tooltip>
  );
};

interface IEditableSlateInput {
  value: Descendant[];
  variablesMap: Record<string, VariableItem>;
  description?: string;
  placeholder?: string;
}

export const EditableSlateInput: React.FC<IEditableSlateInput> = ({ value, variablesMap, placeholder }) => {
  const editor = useMemo(
    () => SlateEditor.createEditor([SlateEditor.PluginType.VARIABLE, SlateEditor.PluginType.SINGLE_LINE]),
    []
  );

  return (
    <Popper
      placement="bottom-start"
      referenceElement={({ onOpen, ref }) => (
        <Box ref={ref} maxWidth={139}>
          <SlateEditor.Component
            placeholder={placeholder || 'Value or {var}'}
            editor={editor}
            className={mapperInputStyles}
            pluginsOptions={{
              [SlateEditor.PluginType.VARIABLE]: {
                onEdit: () => null,
                canEdit: true,
                canCreate: true,
                createButtonLabel: 'Create variable',
                maxVariableWidth: MAX_WIDTH_OF_VARIABLE,
                variablesMap,
                onClick: onOpen,
              },
              [SlateEditor.PluginType.SINGLE_LINE]: { nowrap: true },
            }}
            value={value}
          />
        </Box>
      )}
    >
      {() => (
        <Menu
          width={200}
          maxWidth={256}
          searchSection={<Search value="" onValueChange={() => null} placeholder="Search" />}
          actionButtons={<ActionButtons firstButton={<ActionButtons.Button label="Remove" />} />}
        >
          <MenuItem.WithButton suffixButton={{ iconName: 'EditS', onClick: () => null }} label="Different" />
          <MenuItem.WithButton suffixButton={{ iconName: 'EditS', onClick: () => null }} label="Variables" />
          <MenuItem.WithButton suffixButton={{ iconName: 'EditS', onClick: () => null }} label="And" />
          <MenuItem.WithButton suffixButton={{ iconName: 'EditS', onClick: () => null }} label="Other" />
          <MenuItem.WithButton suffixButton={{ iconName: 'EditS', onClick: () => null }} label="Options" />
          <MenuItem.WithButton suffixButton={{ iconName: 'EditS', onClick: () => null }} label="Provided by Core" />
        </Menu>
      )}
    </Popper>
  );
};

interface IReadOnlySlateInput {
  value: Descendant[];
  variablesMap: Record<string, VariableItem>;
  description?: string;
  placeholder?: string;
}

export const ReadOnlySlateInput: React.FC<IReadOnlySlateInput> = ({
  value,
  variablesMap,
  description,
  placeholder,
}) => {
  const editor = SlateEditor.createEditor([SlateEditor.PluginType.VARIABLE]);
  const modifiers = useTooltipModifiers([
    { name: 'offset', options: { offset: [TOOLTIP_OFFSET_FOR_32_PX_ARROW_DROP, 8] } },
  ]);

  return (
    <Tooltip
      placement="left"
      width={247}
      modifiers={modifiers}
      referenceElement={({ ref, onOpen, onClose }) => (
        <Box ref={ref}>
          <SlateEditor.Component
            editor={editor}
            readOnly={true}
            placeholder={placeholder || 'Value or {var}'}
            onMouseEnter={onOpen}
            onMouseLeave={onClose}
            className={mapperInputStyles}
            ellipsis={true}
            pluginsOptions={{
              [SlateEditor.PluginType.VARIABLE]: {
                canCreate: true,
                createButtonLabel: 'Create variable',
                variablesMap,
                canFocus: false,
                maxVariableWidth: MAX_WIDTH_OF_VARIABLE,
                onEdit: () => null,
                canEdit: true,
              },
            }}
            value={value}
          />
        </Box>
      )}
    >
      {() => <TooltipContent description={description} />}
    </Tooltip>
  );
};

const TooltipContent = ({ description }: { description: string | undefined }) => {
  if (!description) return null;
  return (
    <Box direction="column" px={8} pt={4} pb={5}>
      <Box mb={4}>
        <Text variant="caption" weight="semiBold" color={Tokens.colors.neutralLight.neutralsLight400}>
          Builder note
        </Text>
      </Box>
      <Text variant="caption">{description}</Text>
    </Box>
  );
};
