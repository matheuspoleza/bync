import type { Meta, StoryObj } from '@storybook/react';

import { CartesianProduct } from '@/storybook/CartesianProduct';

import { Card } from './Card.component';
import type { ICard } from './types';

const meta: Meta<typeof Card> = {
  title: 'Media/Card',
  component: Card,
};

export default meta;
type Story = StoryObj<typeof Card>;

const descriptionFixture = 'Prompts can be used to command AI to complete tasks, command, or respond to the user. ';
const imageFixture = 'https://picsum.photos/seed/1/200';

export const Base: Story = {
  args: {
    title: 'Title',
    description: descriptionFixture,
    learnMoreLink: 'https://www.google.com',
    primaryButtonLabel: 'Review Changes',
    secondaryButtonLabel: 'Cancel',
    onPrimaryButtonClick: () => null,
    onSecondaryButtonClick: () => null,
    onClose: () => null,
    imageSrc: imageFixture,
  },
};

export const NoButtons: Story = {
  args: {
    title: 'Title',
    description: descriptionFixture,
    learnMoreLink: 'https://www.google.com',
    imageSrc: imageFixture,
  },
};

export const WithLocalIcon: Story = {
  args: {
    title: 'Title',
    description: descriptionFixture,
    learnMoreLink: 'https://www.google.com',
    iconName: 'NoContent',
  },
};

export const WeirdImage: Story = {
  args: {
    title: '2360w Image Example',
    description: descriptionFixture,
    learnMoreLink: 'https://www.google.com',
    imageSrc:
      // eslint-disable-next-line no-secrets/no-secrets
      'https://images.unsplash.com/photo-1432251407527-504a6b4174a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2360&q=80',
  },
};
export const NoImage: Story = {
  args: {
    title: 'Title',
    description: descriptionFixture,
    learnMoreLink: 'https://www.google.com',
  },
};

export const CTAButton: Story = {
  args: {
    title: 'Title',
    description: descriptionFixture,
    learnMoreLink: 'https://www.google.com',
    imageSrc: imageFixture,
    primaryButtonLabel: 'Review',
    onPrimaryButtonClick: () => null,
  },
};

export const VerticalButtons: Story = {
  args: {
    title: 'Title',
    description: descriptionFixture,
    learnMoreLink: 'https://www.google.com',
    imageSrc: imageFixture,
    primaryButtonLabel: 'Review',
    onPrimaryButtonClick: () => null,
    secondaryButtonLabel: 'Cancel',
    onSecondaryButtonClick: () => null,
    hasVerticalButtons: true,
  },
};

export const Examples: Story = {
  render: () => (
    <CartesianProduct<ICard>
      componentName={Card.name}
      Component={(props) => (
        <Card
          {...props}
          title="Title"
          imageSrc={imageFixture}
          description="Description String. Lots of cool stuff to howdy folks. If you need folks, you must howdy. "
          learnMoreLink="www.voiceflow.com"
          primaryButtonLabel="Register"
          secondaryButtonLabel="Close"
        />
      )}
      combinations={{
        onPrimaryButtonClick: [() => null, undefined],
        onSecondaryButtonClick: [() => null, undefined],
        onClose: [() => null, undefined],
        hasVerticalButtons: [true, false],
      }}
      center
    />
  ),
};
