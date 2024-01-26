import type { Meta, StoryObj } from '@storybook/react';

import { TextArea } from '@/main';

import { Collapsible } from './Collapsible.component';
import { CollapsibleHeader } from './CollapsibleHeader';
import { CollapsibleHeaderButton } from './CollapsibleHeader/components';

type Story = StoryObj<typeof Collapsible>;

const meta: Meta<typeof Collapsible> = {
  title: 'Utility/Collapsible',
  component: Collapsible,
};

export default meta;

const textValue = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel ornare odio. Aenean tempus nisl sit amet leo rhoncus dictum. Mauris maximus libero eget arcu pellentesque imperdiet. Maecenas nunc sem, scelerisque ut elit vel, egestas blandit ipsum. Nulla sollicitudin eget erat eget luctus. Donec molestie ex nec nibh pulvinar, in consectetur urna hendrerit. Nulla porttitor non est id posuere. Phasellus dapibus rhoncus sem. Nullam metus velit, vehicula a laoreet sodales, dictum vitae erat. Nulla porttitor ac massa et pellentesque. Nunc vulputate, mi rhoncus eleifend mollis, orci nibh varius tortor, id feugiat lorem sem in tellus. Mauris vehicula nulla velit, in rutrum ex rhoncus vitae vehicula a laoree`;

export const Base: Story = {
  args: {
    header: (
      <CollapsibleHeader label="Label">{({ isOpen }) => <CollapsibleHeaderButton isOpen={isOpen} />}</CollapsibleHeader>
    ),
    children: <TextArea value={textValue} />,
  },
};

export const WithCaption: Story = {
  args: {
    header: (
      <CollapsibleHeader label="Label" caption="Caption">
        {({ isOpen }) => <CollapsibleHeaderButton isOpen={isOpen} />}
      </CollapsibleHeader>
    ),
    children: <TextArea value={textValue} />,
  },
};
export const Empty: Story = {
  args: {
    header: (
      <CollapsibleHeader label="Empty state">
        {({ isOpen }) => <CollapsibleHeaderButton isOpen={isOpen} />}
      </CollapsibleHeader>
    ),
    children: <TextArea value="" placeholder="Placeholder" />,
    isEmpty: true,
  },
};

export const WithStyledDivider: Story = {
  args: {
    header: (
      <CollapsibleHeader label="With Styled Divider">
        {({ isOpen }) => <CollapsibleHeaderButton isOpen={isOpen} />}
      </CollapsibleHeader>
    ),
    children: <TextArea value="" placeholder="Placeholder" />,
    isEmpty: true,
    showDivider: true,
    noBottomPadding: true,
  },
};

export const AsSection: Story = {
  args: {
    header: (
      <CollapsibleHeader label="As Section">
        {({ isOpen }) => <CollapsibleHeaderButton isOpen={isOpen} />}
      </CollapsibleHeader>
    ),
    children: <TextArea value="" placeholder="Placeholder" />,
    isSection: true,
  },
};

export const Disabled: Story = {
  args: {
    header: (
      <CollapsibleHeader label="Disabled" isDisabled>
        {({ isOpen }) => <CollapsibleHeaderButton isOpen={isOpen} disabled />}
      </CollapsibleHeader>
    ),
    children: <TextArea value="" placeholder="Placeholder" />,
    isDisabled: true,
  },
};
