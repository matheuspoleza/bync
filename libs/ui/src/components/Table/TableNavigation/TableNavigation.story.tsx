import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '@/components/Buttons/Button';
import { SquareButton } from '@/components/Buttons/SquareButton';
import { Box } from '@/components/Utility/Box';

import { TableNavigation } from './TableNavigation.component';

const breadCrumbsFixture = [{ label: 'Agent name' }, { label: 'All flows (12)' }];
const leftHeaderFixture = (
  <Box gap={12} style={{ flexShrink: '2' }}>
    <Button variant="secondary" iconName="Folder" size="large" onClick={() => null} label="Create folder" />
    <Button variant="secondary" iconName="MoveTo" size="large" onClick={() => null} label="Move..." />
    <Button variant="secondary" iconName="Export" size="large" onClick={() => null} label="Export" />
    <Button variant="secondary" iconName="Community" size="large" onClick={() => null} label="Share..." />
    <Button variant="secondary" iconName="Trash" size="large" onClick={() => null} label="Delete" />
  </Box>
);

const meta: Meta<typeof TableNavigation> = {
  title: 'Table/TableNavigation',
  component: TableNavigation,
  render: (args) => (
    <div style={{ backgroundColor: 'grey', padding: '10px' }}>
      <TableNavigation {...args} />
    </div>
  ),
};

type Story = StoryObj<typeof TableNavigation>;
export const Base: Story = {
  args: {
    breadCrumbsItems: breadCrumbsFixture,
  },
};

export const CustomLeftHeader: Story = {
  args: {
    leftHeader: leftHeaderFixture,
    onImportClick: () => null,
  },
};

export const CustomChild: Story = {
  render: () => (
    <div style={{ backgroundColor: 'grey', padding: '10px' }}>
      <TableNavigation breadCrumbsItems={breadCrumbsFixture} onImportClick={() => null} onSettingsClick={() => null}>
        <SquareButton iconName="Community" size="medium" onClick={() => null} />
      </TableNavigation>
    </div>
  ),
};

export const Examples: Story = {
  render: () => (
    <div>
      <div style={{ backgroundColor: 'grey', padding: '10px' }}>
        <TableNavigation breadCrumbsItems={breadCrumbsFixture} onImportClick={() => null} onSettingsClick={() => null}>
          <SquareButton iconName="Community" size="medium" onClick={() => null} />
        </TableNavigation>
      </div>
      <div style={{ backgroundColor: 'grey', padding: '10px' }}>
        <TableNavigation
          breadCrumbsItems={[{ label: 'Agent name' }, { label: 'All entities (0)' }]}
          onImportClick={() => null}
          onSettingsClick={() => null}
        />
      </div>
      <div style={{ backgroundColor: 'grey', padding: '10px' }}>
        <TableNavigation leftHeader={leftHeaderFixture} onImportClick={() => null} onSettingsClick={() => null}>
          <SquareButton iconName="Community" size="medium" onClick={() => null} />
        </TableNavigation>
      </div>
    </div>
  ),
};

export default meta;
