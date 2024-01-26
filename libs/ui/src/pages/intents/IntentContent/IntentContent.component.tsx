import React, { useRef, useState } from 'react';
import type { Descendant } from 'slate';

import {
  ActionButtons,
  Box,
  Button,
  CollapsibleList,
  Divider,
  EditorButton,
  EmptyPage,
  Gauge,
  InputFormControl,
  Menu,
  MenuItem,
  Popper,
  Scroll,
  Search,
  Section,
  SlateEditor,
  Surface,
  TextArea,
  TextField,
  VirtualizedContent,
} from '@/components';
import { EditorButtonSuffixButton } from '@/components/Buttons/EditorButton/EditorButtonSuffixButton';
import type { SlateEditorRef } from '@/components/Inputs/SlateEditor';
import { VariableElementVariant } from '@/components/Inputs/SlateEditor';
import { defaultColors } from '@/utils/colors/color.util';

import { ListenForEntities } from '../Popovers/ListenForEntities';
import { entityButton, footer, intentProgressBar } from './IntentContent.css';
import { IntentUtteranceInput } from './IntentInput/IntentInput.component';

export interface IIntentContent {
  errorExample?: boolean;
  data: { value: Descendant[]; error: boolean }[];
  showNameInput?: boolean;
  showDescriptionInput?: boolean;
  entities: string[];
}

const variablesMap = {
  id0: {
    kind: 'entity',
    id: 'id1',
    variant: SlateEditor.VariableElementVariant.ENTITY,
    name: 'CoolEntity',
    color: defaultColors.fern,
  },
  id1: {
    kind: 'entity',
    id: 'id1',
    variant: SlateEditor.VariableElementVariant.ENTITY,
    name: 'Entity 1',
    color: defaultColors.fern,
  },
  id2: {
    name: 'Entity 2',
    kind: 'entity',
    color: defaultColors.copper,
    variant: SlateEditor.VariableElementVariant.ENTITY,
    id: 'id2',
  },
  id3: {
    id: 'id3',
    name: 'Entity 3',
    kind: 'entity',
    variant: SlateEditor.VariableElementVariant.ENTITY,
    color: defaultColors.havelock,
  },
  id4: {
    id: 'id4',
    name: 'Entity 4',
    kind: 'entity',
    variant: SlateEditor.VariableElementVariant.ENTITY,
    color: defaultColors.hibiscus,
  },
};

const pluginsOptions = {
  [SlateEditor.PluginType.VARIABLE]: {
    canCreate: true,
    createButtonLabel: 'Create entity',
    onCreate: () => {
      return {
        id: 'string',
        name: 'test',
        kind: 'entity',
        color: 'red',
        variant: VariableElementVariant.ENTITY,
      };
    },
    variablesMap,
  },
};

const defaultValue = [
  {
    children: [{ text: '' }],
  },
];

const gaugeValue = 50;
const nameError = 'Name is required.';
const descriptionError = 'Description is required for LLM classification.';

export const IntentContent: React.FC<IIntentContent> = ({
  errorExample,
  data,
  entities,
  showNameInput = true,
  showDescriptionInput = true,
}) => {
  const [utterances, setUtterances] = useState<IIntentContent['data']>(data);
  const [requiredEntities, setRequiredEntities] = useState<string[]>(entities);
  const [activeRequiredEntities, setActiveRequiredEntities] = useState<number | null>(null);
  const [description, setDescription] = useState('');
  const utterancesRef = useRef<SlateEditorRef[]>([]);

  const addUtterance = () => {
    const newUtterances = [{ value: defaultValue, error: !!errorExample }, ...utterances];
    setUtterances(newUtterances);
    setTimeout(() => {
      utterancesRef.current[0]?.focus();
    }, 0);
  };

  const onUtteranceChange = (value: any[], index: number) => {
    // implement logic
    return { value, index };
  };

  const removeUtterance = (index: number) => {
    const newUtterances = [...utterances];
    newUtterances.splice(index, 1);
    setUtterances(newUtterances);
  };

  const addRequiredEntities = (value: string) => {
    setRequiredEntities((existingEntities) => [...existingEntities, value]);
  };

  const removeRequireEntity = (index: number) => {
    const newEntities = [...requiredEntities];
    newEntities.splice(index, 1);
    setRequiredEntities(newEntities);
  };

  const handleRequiredEntityClick = (index: number) => {
    setActiveRequiredEntities((prev) => (prev !== index ? index : null));
  };

  const hasUtterances = utterances.length > 0;
  const onUtteranceHeaderClick = utterances.length === 0 ? addUtterance : undefined;

  const requireEntitiesTotalSize = requiredEntities.length * 36 + (requiredEntities.length > 0 ? 11 : 0);

  return (
    <>
      {showNameInput && (
        <Box pt={20} pb={16} px={24} direction="column">
          <TextField
            value=""
            placeholder="Enter intent name"
            label="Name"
            errorMessage={errorExample ? nameError : ''}
          />
        </Box>
      )}
      {showDescriptionInput && (
        <>
          <Box pb={24} px={24} direction="column">
            <InputFormControl label="Description" errorMessage={errorExample ? descriptionError : ''}>
              <TextArea
                value={description}
                onValueChange={setDescription}
                minRows={1}
                maxRows={17}
                placeholder="Enter intent description"
                label="Description"
              />
            </InputFormControl>
          </Box>
          <Divider fullWidth={true} noPadding={true} />
        </>
      )}

      <Box pt={11} pb={hasUtterances ? 8 : 0} direction="column">
        <Box pb={hasUtterances ? 0 : 11}>
          <Section.Header.Container
            title="Utterances"
            variant={hasUtterances ? 'active' : 'basic'}
            onHeaderClick={onUtteranceHeaderClick}
            primaryContent={
              utterances.length ? <Gauge progress={gaugeValue} className={intentProgressBar} /> : undefined
            }
          >
            <Section.Header.Button iconName="Plus" variant="light" onClick={addUtterance} />
          </Section.Header.Container>
        </Box>
        <Scroll style={{ display: 'block' }} maxHeight="394px">
          <CollapsibleList
            items={utterances}
            itemsLimit={10}
            collapseLabel="sample phrases"
            estimatedItemSize={36}
            footerClassName={footer}
            renderItem={({ item, virtualItem, virtualizer }) => (
              <IntentUtteranceInput
                {...item}
                measureRef={virtualizer.measureElement}
                key={virtualItem.key}
                index={virtualItem.index}
                pluginOptions={pluginsOptions}
                remove={() => removeUtterance(virtualItem.index)}
                onChange={(value) => onUtteranceChange(value, virtualItem.index)}
                // eslint-disable-next-line no-return-assign
                ref={(ref: SlateEditorRef) => (utterancesRef.current[virtualItem.index] = ref)}
                onEnter={addUtterance}
                error={!!errorExample}
              />
            )}
          />
        </Scroll>
      </Box>

      {hasUtterances && (
        <Box px={16} pb={16}>
          <Popper
            placement="bottom"
            referenceElement={({ ref, onToggle, isOpen }) => (
              <Button
                variant="primary"
                ref={ref}
                disabled={errorExample}
                isActive={isOpen}
                iconName="Generate"
                label="Generate"
                onClick={onToggle}
                fullWidth={true}
              />
            )}
          >
            {({ onClose }) => (
              <Menu width="328px">
                <MenuItem label="Generate 3 sample phrases" onClick={onClose} />
                <MenuItem label="Generate 5 sample phrases" onClick={onClose} />
                <MenuItem label="Generate 10 sample phrases" onClick={onClose} />
              </Menu>
            )}
          </Popper>
        </Box>
      )}

      <Divider noPadding={true} />
      <Box pt={11} pb={requiredEntities.length > 0 ? 0 : 11}>
        <Section.Header.Container title="Required entities" variant={requiredEntities.length > 0 ? 'active' : 'basic'}>
          <Popper
            placement="bottom-start"
            referenceElement={({ ref, onToggle, isOpen }) => (
              <Section.Header.Button ref={ref} iconName="Plus" variant="light" onClick={onToggle} isActive={isOpen} />
            )}
          >
            {() => (
              <>
                {errorExample ? (
                  <Surface>
                    <Box px={24} py={24} width="280px">
                      <EmptyPage
                        title="No entities exist"
                        illustration="NoContent"
                        learnMoreLink=""
                        description="Entities help your assistant know which data to pluck out from the users response. "
                      />
                    </Box>
                  </Surface>
                ) : (
                  <Menu
                    searchSection={<Search value="" placeholder="Search" />}
                    actionButtons={
                      <ActionButtons
                        firstButton={<ActionButtons.Button label="Create entity" onClick={() => null} />}
                      />
                    }
                  >
                    <MenuItem.WithButton
                      label="Howdy"
                      suffixButton={{ iconName: 'EditS' }}
                      onClick={() => addRequiredEntities('howdy')}
                    />
                    <MenuItem.WithButton
                      label="Folks"
                      onClick={() => addRequiredEntities('folks')}
                      suffixButton={{ iconName: 'EditS' }}
                    />
                  </Menu>
                )}
              </>
            )}
          </Popper>
        </Section.Header.Container>
      </Box>
      <VirtualizedContent start={0} totalSize={requireEntitiesTotalSize}>
        {requiredEntities.length ? (
          <Box pl={12} pr={16} pb={11} direction="column">
            {requiredEntities.map((entity, index) => {
              return (
                <Box key={`${entity}-${index}`} align="center" className={entityButton}>
                  <Popper
                    placement="left-start"
                    referenceElement={({ ref, onToggle }) => (
                      <EditorButton
                        label={entity}
                        ref={ref}
                        fullWidth={true}
                        isActive={activeRequiredEntities === index}
                        onClick={() => {
                          handleRequiredEntityClick(index);
                          onToggle();
                        }}
                        isWarning={errorExample}
                        suffixButtons={[
                          <EditorButtonSuffixButton
                            key={0}
                            iconName="Minus"
                            onClick={() => removeRequireEntity(index)}
                          />,
                        ]}
                      />
                    )}
                  >
                    {() => <ListenForEntities entity={requiredEntities[activeRequiredEntities!]} />}
                  </Popper>
                </Box>
              );
            })}
          </Box>
        ) : null}
      </VirtualizedContent>
    </>
  );
};
