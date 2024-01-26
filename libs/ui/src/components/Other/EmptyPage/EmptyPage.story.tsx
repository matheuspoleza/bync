import type { Meta, StoryObj } from '@storybook/react';

import { CartesianProduct } from '@/storybook/CartesianProduct';

import { EmptyPage } from './EmptyPage.component';
import type { IEmptyPage } from './types';

const titleFixture = 'No entities exist';
const descriptionFixture = 'Entities help your assistant know which data to pluck out from the users response. ';
const illustrationFixture = 'NoContent';
const linkFixture = 'www.google.com';

const meta: Meta<typeof EmptyPage> = {
  title: 'Other/EmptyPage',
  component: EmptyPage,
  args: {
    title: titleFixture,
    description: descriptionFixture,
    learnMoreLink: linkFixture,
  },
};

type Story = StoryObj<typeof EmptyPage>;
export const Base: Story = {
  args: {
    illustration: illustrationFixture,
    button: { label: 'Create entity', onClick: () => null },
  },
};
export const NoButton: Story = {
  args: {
    illustration: illustrationFixture,
  },
};
export const NoImage: Story = {};

export const Examples: Story = {
  render: () => (
    <CartesianProduct<IEmptyPage>
      componentName={EmptyPage.name}
      Component={(props) => (
        <EmptyPage {...props} description={descriptionFixture} title={titleFixture} learnMoreLink="www.voiceflow.com" />
      )}
      combinations={{
        button: [
          {
            label: 'Create entity',
            onClick: () => null,
          },
          undefined,
        ],
        illustration: [illustrationFixture, undefined],
      }}
      center
    />
  ),
};

export default meta;
