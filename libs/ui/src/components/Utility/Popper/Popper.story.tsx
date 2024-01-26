import type { Placement } from '@popperjs/core';
import type { Meta, StoryObj } from '@storybook/react';
import type { PropsWithChildren } from 'react';
import { forwardRef } from 'react';

import { Button } from '@/components/Buttons';
import { Text } from '@/components/Text';
import { CartesianProduct } from '@/storybook/CartesianProduct';
import { Tokens } from '@/styles';

import { Box } from '../Box';
import { Popper } from './Popper.component';
import type { IPopper } from './Popper.interface';

type Story = StoryObj<typeof Popper>;

const meta: Meta<typeof Popper> = {
  title: 'Utility/Popper',
  component: Popper,
};

export default meta;

const PLACEMENTS: Placement[] = [
  'bottom-start',
  'bottom',
  'bottom-end',
  'top-start',
  'top',
  'top-end',
  'right-start',
  'right',
  'right-end',
  'left-start',
  'left',
  'left-end',
  'auto',
  'auto-start',
  'auto-end',
];

interface IReferenceElement extends PropsWithChildren {
  onOpen: VoidFunction;
  onClose: VoidFunction;
  placement?: Placement;
}

const Tooltip: React.FC = () => (
  <Box
    style={{
      padding: '10px',
      cursor: 'pointer',
      borderRadius: Tokens.border.radius[10],
      backgroundColor: Tokens.colors.white[100],
      border: `1px solid ${Tokens.colors.black[100]}`,
    }}
  >
    <Text>Popping tip 🤖</Text>
  </Box>
);

const ReferenceText = forwardRef<HTMLDivElement, IReferenceElement>(({ onOpen, onClose, placement, children }, ref) => (
  <Box
    ref={ref}
    style={{ padding: '1rem', backgroundColor: Tokens.colors.copper.copper300, cursor: 'pointer' }}
    onMouseEnter={onOpen}
    onMouseLeave={onClose}
  >
    <Text>Hover for {placement ?? ''} tip</Text>
    {children}
  </Box>
));

export const Base: Story = {
  render: () => (
    <Popper
      referenceElement={({ ref, onOpen, onClose }) => (
        <Button ref={ref} label="Hover me" onMouseEnter={onOpen} onMouseLeave={onClose} />
      )}
      placement="right"
    >
      {() => <Tooltip />}
    </Popper>
  ),
};

export const Nested: Story = {
  render: () => (
    <Popper
      inline
      referenceElement={({ ref, popper, onOpen, onClose }) => (
        <Button ref={ref} label="Hover me" onMouseEnter={onOpen} onMouseLeave={onClose}>
          {popper}
        </Button>
      )}
      placement="right"
    >
      {() => (
        <Popper
          inline
          placement="bottom"
          referenceElement={({ ref, popper, onOpen, onClose }) => (
            <ReferenceText ref={ref} onOpen={onOpen} onClose={onClose} placement="bottom">
              {popper}
            </ReferenceText>
          )}
        >
          {() => <Tooltip />}
        </Popper>
      )}
    </Popper>
  ),
};

export const Examples: Story = {
  render: () => (
    <CartesianProduct<IPopper<unknown>>
      componentName={Popper.name}
      Component={(props) => (
        <Popper
          referenceElement={({ ref, onOpen, onClose }) => (
            <ReferenceText ref={ref} onOpen={onOpen} onClose={onClose} placement={props.placement} />
          )}
          {...props}
        >
          {() => <Tooltip />}
        </Popper>
      )}
      combinations={{
        placement: PLACEMENTS,
      }}
      columns={3}
      center
    />
  ),
};
