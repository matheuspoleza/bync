import type { Meta, StoryObj } from '@storybook/react';

import { ModalContainer } from '@/components/Modal/ModalContainer';
import { ModalFooterButton } from '@/components/Modal/ModalFooter/components/ModalFooterButton';
import { ModalFooter } from '@/components/Modal/ModalFooter/ModalFooter.component';
import { ModalHeader } from '@/components/Modal/ModalHeader';
import { Menu } from '@/components/Navigation/Menu/Menu.component';
import { MenuItem } from '@/components/Navigation/Menu/MenuItem/MenuItem.component';
import { Box } from '@/components/Utility/Box';
import { Collapsible, CollapsibleHeader } from '@/main';

import { Placeholder } from './Placeholder.component';

type Story = StoryObj<typeof Placeholder>;

const meta: Meta<typeof Placeholder> = {
  title: 'Other /Placeholder',
  component: Placeholder,
};

export const Base: Story = {
  render: () => {
    return (
      <Box width="124px">
        <Placeholder />
      </Box>
    );
  },
};

export const MenuItemUsage: Story = {
  render: () => {
    return (
      <Menu>
        <MenuItem label="Item 1" />
        <Placeholder height="36px" />
        <MenuItem label="Item 1" />
      </Menu>
    );
  },
};
export const ModalContentUsage: Story = {
  render: () => {
    return (
      <ModalContainer>
        <ModalHeader title="Modal" onClose={() => null} />
        <Placeholder />
        <ModalFooter>
          <ModalFooterButton onClick={() => null}>Cancel</ModalFooterButton>
          <ModalFooterButton onClick={() => null} variant="primary">
            Save
          </ModalFooterButton>
        </ModalFooter>
      </ModalContainer>
    );
  },
};
export const CollapsibleUsage: Story = {
  render: () => {
    return (
      <Collapsible header={<CollapsibleHeader label="Label" />}>
        <Placeholder />
      </Collapsible>
    );
  },
};

export default meta;
