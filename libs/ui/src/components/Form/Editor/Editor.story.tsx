import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Button } from '@/components/Buttons/Button';
import { SquareButton } from '@/components/Buttons/SquareButton';
import { Box } from '@/components/Utility/Box';
import { Scroll } from '@/components/Utility/Scroll';

import { Toggle } from '../Toggle';
import { Editor } from './Editor.component';
import { footerButtonStyle } from './Editor.css';
import type { IEditor } from './Editor.interface';

const titleFixture = 'Intent Name';
const headerActionsFixture = <SquareButton size="medium" iconName="More" onClick={() => null} />;
const footerFixture = <Button variant="primary" label="Save changes" className={footerButtonStyle} />;

type Story = StoryObj<typeof Editor>;

const meta: Meta<typeof Editor> = {
  title: 'Form/Editor',
  component: Editor,
  render: (args) => (
    <div style={{ backgroundColor: 'grey', padding: '1rem', width: 'auto', height: '100vh' }}>
      <Editor {...args} title={titleFixture} />
    </div>
  ),
};

export const Base: Story = {
  args: {
    headerActions: headerActionsFixture,
  },
};

export const WithFooter: Story = {
  args: {
    headerActions: headerActionsFixture,
    footer: footerFixture,
  },
};

export const EditableHeader = (args: IEditor) => {
  const [title, setTitle] = useState('Editable Intent Name');

  return (
    <div style={{ backgroundColor: 'grey', padding: '1rem', width: 'auto', height: '100vh' }}>
      <Editor {...args} title={title} onTitleChange={(newTitle) => setTitle(newTitle)} />
    </div>
  );
};

export const CustomHeaderActions: Story = {
  args: {
    headerActions: (
      <Box gap={8}>
        <SquareButton size="medium" iconName="More" onClick={() => null} />
        <SquareButton size="medium" iconName="CloseM" onClick={() => null} />
      </Box>
    ),
  },
};

export const ScrollableContent: Story = {
  render: (args) => (
    <div style={{ backgroundColor: 'grey', padding: '1rem', width: 'auto', height: '100vh' }}>
      <Editor {...args} title={titleFixture} headerActions={headerActionsFixture} footer={footerFixture}>
        <Scroll>
          <div
            style={{ display: 'flex', flexDirection: 'column', height: '1000px', width: '100%', background: 'green' }}
          >
            <div style={{ alignSelf: 'flex-start', height: '2000px', width: '350px' }}>Start</div>
            <div style={{ alignSelf: 'flex-end', width: '350px' }}>End</div>
          </div>
        </Scroll>
      </Editor>
    </div>
  ),
};

export const Examples: Story = {
  render: (args) => (
    <div>
      <div style={{ backgroundColor: 'grey', padding: '1rem', width: 'auto', height: '100vh' }}>
        <Editor {...args} divider={false} headerActions={headerActionsFixture} title={titleFixture} />
      </div>
      <div style={{ backgroundColor: 'grey', padding: '1rem', width: 'auto', height: '100vh' }}>
        <Editor {...args} headerActions={headerActionsFixture} title={titleFixture} />
      </div>
      <div style={{ backgroundColor: 'grey', padding: '1rem', width: 'auto', height: '100vh' }}>
        <Editor {...args} headerActions={headerActionsFixture} title={titleFixture} footer={footerFixture} />
      </div>
      <div style={{ backgroundColor: 'grey', padding: '1rem', width: 'auto', height: '100vh' }}>
        <Editor
          {...args}
          title="Persona name"
          headerActions={
            <Box gap={16} align="center">
              <SquareButton size="medium" iconName="More" onClick={() => null} />
              <Toggle value={true} onValueChange={action('toggle changed')} />
            </Box>
          }
        />
      </div>
    </div>
  ),
};

export default meta;
