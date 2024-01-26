import { useMemo } from 'react';
import type { Descendant } from 'slate';

import { Box, Button, Collapsible, CollapsibleHeader, CollapsibleHeaderButton, Divider, TextArea } from '@/components';
import { VariableElementVariant } from '@/components/Inputs/SlateEditor';
import { defaultColors } from '@/utils/colors/color.util';

import {
  EditableSlateInput,
  ReadOnlySlateInput,
  VariableMapper,
} from '../InputVariableMapper/InputVariableMapper.component';
import { SelectFunctionDropdown } from '../SelectFunctionDropdown/SelectFunctionDropdown.component';
import { inputVariableContainerModifier, runButtonWrapper } from './EditFunctionsPanelContent.css';

const variablesMap = {
  id1: {
    id: 'id1',
    kind: 'variable',
    name: 'Users_Name_With_Really_Long_Name',
    color: defaultColors.fern,
    variant: VariableElementVariant.VARIABLE,
    iconName: 'Number',
  },
  id2: {
    id: 'id2',
    kind: 'variable',
    name: 'Account_ID',
    color: defaultColors.neutral,
    variant: VariableElementVariant.VARIABLE,
    iconName: 'Text',
  },
  id3: {
    id: 'id3',
    kind: 'variable',
    name: 'Cool_ID',
    color: defaultColors.fern,
    variant: VariableElementVariant.VARIABLE,
    iconName: 'Boolean',
  },
  id4: {
    id: 'id4',
    kind: 'variable',
    name: '4IDs',
    color: defaultColors.copper,
    variant: VariableElementVariant.VARIABLE,
    iconName: 'Text',
  },
  id5: {
    id: 'id5',
    kind: 'variable',
    name: 'Fifth_Wheel',
    color: defaultColors.fern,
    variant: VariableElementVariant.VARIABLE,
    iconName: 'Boolean',
  },
  id6: {
    id: 'id6',
    kind: 'variable',
    name: 'Overflowing with variables',
    color: defaultColors.havelock,
    variant: VariableElementVariant.VARIABLE,
    iconName: 'Boolean',
  },
} as const;

interface IVariableMappings {
  mapFrom: Descendant[];
  mapTo: Descendant[];
  description: string;
  error?: boolean;
}

interface IEditFunctionPanelContent {
  inputVariableMapping: IVariableMappings[];
  outputVariableMapping: IVariableMappings[];
  description?: string;
}

export const EditFunctionsPanelContent: React.FC<IEditFunctionPanelContent> = ({
  inputVariableMapping,
  outputVariableMapping,
  description,
}) => {
  // The collapsible sections are `isEmpty` if there are no variables mapped to or from.
  const areInputVariablesAssigned = useMemo(() => {
    return inputVariableMapping.some((item: any) => {
      return item.mapFrom[0].children[0].text?.length > 0 || item.mapFrom[0].children[0].type === 'variable';
    });
  }, [inputVariableMapping]);

  const areOutputVariablesAssigned = useMemo(() => {
    if (outputVariableMapping.length === 0) {
      return false;
    }
    return outputVariableMapping.every((item: any) => {
      return item.mapFrom[0].children[0].text?.length > 0 || item.mapFrom[0].children[0].type === 'variable';
    });
  }, [outputVariableMapping]);

  return (
    <>
      <Box direction="column" pb={60}>
        <Box justify="center" align="center" py={20} px={24} direction="column">
          <SelectFunctionDropdown functionSelected={1} />
        </Box>
        <Box>
          <Divider fullWidth={true} noPadding={true} />
        </Box>
        {inputVariableMapping.length > 0 && (
          <Collapsible
            isSection={true}
            isOpen={true}
            isEmpty={!areInputVariablesAssigned}
            contentClassName={inputVariableContainerModifier}
            header={
              <CollapsibleHeader label="Input variable mapping">
                {({ isOpen, headerChildrenStyles }) => (
                  <CollapsibleHeaderButton headerChildrenStyles={headerChildrenStyles} isOpen={isOpen} />
                )}
              </CollapsibleHeader>
            }
          >
            {inputVariableMapping.map((item, index) => (
              <VariableMapper
                leftHandInput={
                  <EditableSlateInput value={item.mapFrom} variablesMap={variablesMap} description={item.description} />
                }
                rightHandInput={
                  <ReadOnlySlateInput value={item.mapTo} variablesMap={variablesMap} description={item.description} />
                }
                mapFrom={item.mapFrom}
                mapTo={item.mapTo}
                description={item.description}
                isError={item.error}
                key={index}
                variablesMap={variablesMap}
              />
            ))}
          </Collapsible>
        )}
        {outputVariableMapping.length > 0 && (
          <Collapsible
            isSection={true}
            isOpen={true}
            isEmpty={!areOutputVariablesAssigned}
            contentClassName={inputVariableContainerModifier}
            header={
              <CollapsibleHeader label="Output variable mapping">
                {({ isOpen, headerChildrenStyles }) => (
                  <CollapsibleHeaderButton headerChildrenStyles={headerChildrenStyles} isOpen={isOpen} />
                )}
              </CollapsibleHeader>
            }
          >
            {outputVariableMapping.map((item, index) => (
              <VariableMapper
                leftHandInput={
                  <ReadOnlySlateInput value={item.mapTo} variablesMap={variablesMap} description={item.description} />
                }
                rightHandInput={
                  <EditableSlateInput
                    value={item.mapFrom}
                    variablesMap={variablesMap}
                    description={item.description}
                    placeholder="Apply to {var}"
                  />
                }
                mapFrom={item.mapFrom}
                mapTo={item.mapTo}
                description={item.description}
                isError={item.error}
                key={index}
                variablesMap={variablesMap}
              />
            ))}
          </Collapsible>
        )}

        <Collapsible
          showDivider
          header={
            <CollapsibleHeader label="Description">
              {({ isOpen, headerChildrenStyles }) => (
                <CollapsibleHeaderButton headerChildrenStyles={headerChildrenStyles} isOpen={isOpen} />
              )}
            </CollapsibleHeader>
          }
          isEmpty={!description?.length}
        >
          <TextArea
            minRows={4}
            maxRows={17}
            variant="chunk"
            readOnly={true}
            value={description || ''}
            placeholder="Enter intent description"
          />
        </Collapsible>
      </Box>
      <Box className={runButtonWrapper}>
        <Button fullWidth={true} size="large" variant="secondary" label="Run" />
      </Box>
    </>
  );
};
