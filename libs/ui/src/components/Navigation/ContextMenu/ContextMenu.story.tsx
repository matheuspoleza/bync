import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '@/components/Buttons/Button';
import { Divider } from '@/components/Other/Divider';
import { Text } from '@/components/Text/Text.component';
import { CartesianProduct } from '@/storybook/CartesianProduct';

import { MenuItem } from '../Menu';
import type { IContextMenu } from './ContextMenu.component';
import { ContextMenu } from './ContextMenu.component';

type Story = StoryObj<typeof ContextMenu>;

const meta: Meta<typeof ContextMenu> = {
  title: 'Navigation/Context Menu',
  component: ContextMenu,
};

export const Base: Story = {
  render: () => {
    return (
      <ContextMenu
        referenceElement={({ ref, onContextMenu }) => (
          <Button ref={ref} label="Right-click me" onContextMenu={onContextMenu} />
        )}
        width={133}
      >
        {({ onClose }) => (
          <>
            <MenuItem prefixIconName="Copy" label="Duplicate" onClick={onClose} />
            <MenuItem prefixIconName="Trash" label="Remove" onClick={onClose} />
          </>
        )}
      </ContextMenu>
    );
  },
};

export const LongWideMenu: Story = {
  render: () => {
    return (
      <ContextMenu
        referenceElement={({ ref, onContextMenu }) => (
          <Button ref={ref} label="Right-click me" onContextMenu={onContextMenu} />
        )}
        width={180}
      >
        {({ onClose }) => (
          <>
            <MenuItem prefixIconName="Edit" label="Copy" onClick={onClose} />
            <MenuItem prefixIconName="Trash" label="Delete" onClick={onClose} />
            <Divider fullWidth={false} />
            <MenuItem prefixIconName="Edit" label="Copy" onClick={onClose} />
            <MenuItem prefixIconName="Trash" label="Delete" onClick={onClose} />
            <Divider fullWidth={false} />
            <MenuItem prefixIconName="Edit" label="Copy" onClick={onClose} />
          </>
        )}
      </ContextMenu>
    );
  },
};

export const Examples: Story = {
  render: () => (
    <CartesianProduct<IContextMenu>
      componentName={ContextMenu.name}
      Component={(props) => (
        <>
          <ContextMenu
            {...props}
            width={133}
            referenceElement={({ onContextMenu }) => <Button label="right-click me" onContextMenu={onContextMenu} />}
          />
          <br />
          <Text>{`placement: ${props.placement}`}</Text>
        </>
      )}
      combinations={{
        children: [
          ({ onClose }) => (
            <>
              <MenuItem label="Copy" prefixIconName="Copy" onClick={onClose} />
              <MenuItem prefixIconName="Trash" label="Delete" onClick={onClose} />
            </>
          ),
        ],
        placement: ['bottom-start', 'left-start', 'right-start', 'top-start'],
      }}
      columns={1}
      center
    />
  ),
};

export default meta;
