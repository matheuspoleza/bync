import type { Meta, StoryObj } from '@storybook/react';

import { CartesianProduct } from '@/storybook/CartesianProduct';

import { BreadCrumbs } from './BreadCrumbs.component';
import type { IBreadCrumbs } from './types';

type Story = StoryObj<typeof BreadCrumbs>;

const meta: Meta<typeof BreadCrumbs> = {
  title: 'Navigation/Bread Crumbs',
  component: BreadCrumbs,
};

export default meta;

export const Base: Story = {
  args: {
    items: [
      { label: 'Home', onClick: () => console.log('click') },
      { label: 'About', onClick: () => console.log('click') },
      { label: 'Contact', onClick: () => console.log('click') },
    ],
  },
};

export const SingleBreadCrumb: Story = {
  args: {
    items: [{ label: 'Home', onClick: () => console.log('click') }],
  },
};

export const TwoBreadCrumbs: Story = {
  args: {
    items: [
      { label: 'Home', onClick: () => console.log('click') },
      { label: 'About', onClick: () => console.log('click') },
    ],
  },
};

export const Examples: Story = {
  render: () => {
    const onClick = () => console.log('click');

    return (
      <CartesianProduct<IBreadCrumbs>
        componentName={BreadCrumbs.name}
        Component={BreadCrumbs}
        combinations={{
          items: [
            [{ label: 'Root', onClick }],
            [
              { label: 'Root', onClick },
              { label: 'Contacts', onClick },
            ],
            [
              { label: 'Root', onClick },
              { label: 'Contacts', onClick },
              { label: 'Knowledge Base', onClick },
            ],
            [
              { label: 'Root', onClick },
              { label: 'Contacts', onClick },
              { label: 'Knowledge Base', onClick },
              { label: 'Smarter Knowledge Base', onClick },
            ],
          ],
        }}
      />
    );
  },
};
