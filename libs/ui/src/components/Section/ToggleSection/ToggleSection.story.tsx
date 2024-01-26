import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Box, Placeholder, Toggle } from '@/components';

import type { IToggleSection } from './ToggleSection.component';
import { ToggleSection } from './ToggleSection.component';

const meta: Meta<typeof ToggleSection> = {
  title: 'Section/Toggle',
  component: ToggleSection,
  args: {
    isOpen: false,
    headerProps: { title: 'Label' },
    children: <Placeholder />,
  },
};

export default meta;

type Story = StoryObj<typeof ToggleSection>;

const BaseSection = (props: IToggleSection) => {
  const [isOpen, setOpen] = useState(false);

  return <ToggleSection {...props} isOpen={isOpen} onToggle={() => setOpen((value) => !value)} />;
};

export const Base: Story = {
  render: (props) => (
    <Box style={{ width: '320px' }}>
      <BaseSection {...props} />
    </Box>
  ),
};

const SectionWithToggle = (props: IToggleSection) => {
  const [isOpen, setOpen] = useState(false);

  const onSectionToggle = () => {
    setOpen((prev) => !prev);
  };

  return (
    <ToggleSection
      {...props}
      isOpen={isOpen}
      onToggle={onSectionToggle}
      toggle={<Toggle value={isOpen} onValueChange={setOpen} />}
    />
  );
};

export const WithToggle: Story = {
  args: {
    isOpen: false,
    headerProps: { title: 'With Toggle' },
    children: <Placeholder />,
  },
  render: (props) => (
    <Box style={{ width: '320px' }}>
      <SectionWithToggle {...props} />
    </Box>
  ),
};
