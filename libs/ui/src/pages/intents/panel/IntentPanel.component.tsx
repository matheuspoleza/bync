import { useState } from 'react';

import {
  Box,
  Collapsible,
  CollapsibleHeader,
  CollapsibleHeaderButton,
  DataNotification,
  Divider,
  Drawer,
  Editor,
  Scroll,
  SquareButton,
  TextArea,
} from '@/components';

import { IntentContent } from '../IntentContent/IntentContent.component';

export const IntentPanel = () => {
  const [description, setDescription] = useState('');
  const [utterances] = useState([
    { value: [{ children: [{ text: 'Howdy 1' }] }], error: false },
    { value: [{ children: [{ text: 'Howdy 2' }] }], error: false },
    { value: [{ children: [{ text: 'Howdy 3' }] }], error: false },
    { value: [{ children: [{ text: 'Howdy 4' }] }], error: false },
    { value: [{ children: [{ text: 'Howdy 5' }] }], error: false },
    { value: [{ children: [{ text: 'Howdy 6' }] }], error: false },
    { value: [{ children: [{ text: 'Howdy 7' }] }], error: false },
    { value: [{ children: [{ text: 'Howdy 8' }] }], error: false },
    { value: [{ children: [{ text: 'Howdy 9' }] }], error: false },
    { value: [{ children: [{ text: 'Howdy 10' }] }], error: false },
    { value: [{ children: [{ text: 'Howdy 11' }] }], error: false },
    { value: [{ children: [{ text: 'Howdy 12' }] }], error: false },
    { value: [{ children: [{ text: 'Howdy 13' }] }], error: false },
    { value: [{ children: [{ text: 'Howdy 14' }] }], error: false },
    { value: [{ children: [{ text: 'Howdy 15' }] }], error: false },
    { value: [{ children: [{ text: 'Howdy 16' }] }], error: false },
    { value: [{ children: [{ text: 'Howdy 17' }] }], error: false },
    { value: [{ children: [{ text: 'Howdy 18' }] }], error: false },
  ]);

  return (
    <Drawer isOpen={true}>
      <Scroll>
        <Editor
          title="Title"
          divider={false}
          headerActions={<SquareButton size="medium" iconName="More" onClick={() => null} />}
        >
          <Box direction="column" align="center">
            <Box mb={20}>
              <DataNotification score={84} type="clarity" text="Information about the clarity of this entity" />
            </Box>
          </Box>
          <Divider fullWidth={true} noPadding={true} />
          <IntentContent data={utterances} entities={[]} showNameInput={false} showDescriptionInput={false} />
          <Divider fullWidth={true} noPadding={true} />
          <Collapsible
            showDivider
            header={
              <CollapsibleHeader label="Description">
                {({ isOpen, headerChildrenStyles }) => (
                  <CollapsibleHeaderButton headerChildrenStyles={headerChildrenStyles} isOpen={isOpen} />
                )}
              </CollapsibleHeader>
            }
            isEmpty={!description.length}
          >
            <TextArea
              minRows={4}
              maxRows={17}
              value={description}
              onValueChange={setDescription}
              placeholder="Enter intent description"
            />
          </Collapsible>
        </Editor>
      </Scroll>
    </Drawer>
  );
};
