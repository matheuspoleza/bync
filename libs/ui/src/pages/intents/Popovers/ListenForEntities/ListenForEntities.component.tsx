import { useState } from 'react';
import type { Descendant } from 'slate';

import {
  Box,
  Divider,
  Dropdown,
  InputFormControl,
  Menu,
  MenuItem,
  Section,
  SlateEditor,
  Surface,
  Text,
  Variable,
} from '@/components';
import { VariableElementVariant } from '@/components/Inputs/SlateEditor';

import { listenForIntentsCaption } from './ListenForEntities.css';
import { RepromptInput } from './RepromptInput';

const MOCK_FOLDERS = [
  { id: '323', label: 'howdy' },
  { id: '123', label: 'howdy howdy howdy howdy howdy howdy howdy' },
];

const defaultValue = [
  {
    children: [{ text: '' }],
  },
];

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
  },
};

export const ListenForEntities = ({ entity }: { entity: string }) => {
  const [selectedEntity, setEntity] = useState<string>(entity);
  const [reprompts, setReprompts] = useState<Descendant[]>([]);

  const handleAddReprompt = () => {
    setReprompts([...reprompts, ...defaultValue]);
  };

  return (
    <Surface width="300px">
      <Box direction="column" py={20} px={24}>
        <InputFormControl
          caption={
            <>
              {selectedEntity && (
                <Box align="center" mt={6} direction="row">
                  <Text variant="fieldCaption" className={listenForIntentsCaption}>
                    Saving entity to
                  </Text>
                  <Box ml={4} overflow="hidden">
                    <Variable label={selectedEntity} />
                  </Box>
                </Box>
              )}
            </>
          }
        >
          <Dropdown prefixIconName="EditS" label="Entity" value={selectedEntity} placeholder="Select entity to capture">
            {({ onClose }) => (
              <Menu>
                {MOCK_FOLDERS.map((item) => (
                  <MenuItem
                    key={item.id}
                    label={item.label}
                    id={item.id}
                    onClick={() => {
                      setEntity(item.label);
                      onClose();
                    }}
                  />
                ))}
              </Menu>
            )}
          </Dropdown>
        </InputFormControl>
      </Box>
      <Divider fullWidth={true} noPadding={true} />
      <Box pt={11} pb={reprompts.length > 0 ? 0 : 11} direction="column">
        <Section.Header.Container title="Required entities" variant={reprompts.length > 0 ? 'active' : 'basic'}>
          <Section.Header.Button iconName="Plus" variant="light" onClick={handleAddReprompt} />
        </Section.Header.Container>
        {reprompts.map((reprompt, index) => (
          <RepromptInput value={defaultValue} key={index} plugins={pluginsOptions} />
        ))}
      </Box>
    </Surface>
  );
};
