import { useMemo, useState } from 'react';

import { SlateEditor } from '@/components/Inputs';
import type { ISlateEditor } from '@/components/Inputs/SlateEditor';
import { PluginType } from '@/components/Inputs/SlateEditor';
import type { IMenuItem } from '@/components/Navigation';
import { Link, Menu, MenuItem } from '@/components/Navigation';
import { Divider } from '@/components/Other/Divider';
import { FocusIndicator } from '@/components/Other/FocusIndicator';
import { Text } from '@/components/Text';
import { Box } from '@/components/Utility/Box';
import { Popper } from '@/components/Utility/Popper';
import { Removable } from '@/components/Utility/Removable';
import { useCreateConst, usePersistFunction } from '@/hooks';

import { editorStyles, focusContainerStyles, ifStyles, operatorTypeStyles } from './Condition.css';
import type { ICondition } from './Condition.interface';
import { hasEmptyValue } from './Condition.util';

export const Condition: React.FC<ICondition> = ({
  rightValue,
  leftValue = SlateEditor.StaticEditor.getEmptyState(),
  onConditionRemove,
  onLogicItemClick,
  onVariableClick,
  onVariableCreate,
  onValueChange,
  conditionsList,
  activeLogicType: defaultLogicType,
  isCreatable = true,
  isDisabled,
  placeholder,
  variablesMap,
  leftPluginOptions,
  rightPluginOptions,
  ...props
}) => {
  const [activeLogicType, setActiveLogicType] = useState(defaultLogicType);

  const createEditor = () => SlateEditor.createEditor([PluginType.VARIABLE, PluginType.SINGLE_LINE]);
  const leftEditor = useCreateConst(() => createEditor());
  const rightEditor = useCreateConst(() => createEditor());

  const [hasLeftValue, setHasLeftValue] = useState(!hasEmptyValue(leftValue));

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const pluginsOptions = useMemo<SlateEditor.ISlateEditor['pluginsOptions']>(
    () => ({
      [SlateEditor.PluginType.VARIABLE]: {
        variablesMap,
        creatable: isCreatable,
        createButtonLabel: 'Create variable',
        onClick: onVariableClick,
        onCreate: onVariableCreate,
      },
      [SlateEditor.PluginType.SINGLE_LINE]: { nowrap: false },
    }),
    [variablesMap, onVariableClick, onVariableCreate, isCreatable]
  );

  const handleLeftValueChange = usePersistFunction((value: ISlateEditor['value']) => {
    const isEmpty = hasEmptyValue(value);
    setHasLeftValue(!isEmpty);
    if (isEmpty) {
      setActiveLogicType(undefined);
    }
    onValueChange?.(value);
  });

  const handleDropdownSelect = (item: IMenuItem) => {
    setIsDropdownVisible(false);
    setActiveLogicType(item.label as string);
    onLogicItemClick?.(item);
  };

  return (
    <Box gap={8} align="center" pr={16} width="100%" pt={2} pb={2} {...props}>
      <Removable onRemove={onConditionRemove} align="start" wrap="nowrap">
        <FocusIndicator.Container pl={22} direction="row" align="start" wrap="nowrap" className={focusContainerStyles}>
          <Text className={ifStyles}>if</Text>
          <SlateEditor.Component
            value={leftValue}
            pluginsOptions={{ ...pluginsOptions, ...leftPluginOptions }}
            placeholder="{variable} or expression"
            disabled={isDisabled}
            className={editorStyles}
            onValueChange={(value) => handleLeftValueChange(value)}
            editor={leftEditor}
          />
          {hasLeftValue && (
            <Popper
              placement="bottom"
              isOpen={isDropdownVisible}
              referenceElement={({ ref }) => (
                <Link
                  variant="dotted"
                  isActive={isDropdownVisible}
                  ref={ref}
                  weight="semiBold"
                  label={activeLogicType ?? 'is'}
                  className={operatorTypeStyles}
                  onClick={() => setIsDropdownVisible(!isDropdownVisible)}
                />
              )}
            >
              {() => (
                <Menu minWidth={194} width={194} maxHeight={380}>
                  {conditionsList?.map((item: IMenuItem, index: number) => (
                    <>
                      <MenuItem key={index} {...item} label={item.label} onClick={() => handleDropdownSelect(item)} />
                      {(index === 1 || index === 5) && <Divider />}
                    </>
                  ))}
                </Menu>
              )}
            </Popper>
          )}
          {(!!activeLogicType || hasLeftValue) && (
            <SlateEditor.Component
              value={rightValue}
              pluginsOptions={{ ...pluginsOptions, ...rightPluginOptions }}
              placeholder={placeholder ?? 'value or {var}'}
              disabled={isDisabled}
              className={editorStyles}
              onValueChange={onValueChange}
              editor={rightEditor}
            />
          )}
        </FocusIndicator.Container>
      </Removable>
    </Box>
  );
};
