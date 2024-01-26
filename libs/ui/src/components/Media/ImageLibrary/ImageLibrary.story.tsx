/* eslint-disable no-secrets/no-secrets */
import { faker } from '@faker-js/faker';
import type { Meta, StoryObj } from '@storybook/react';
import random from 'lodash/random';

import { ImageLibrary } from './ImageLibrary.component';

type Story = StoryObj<typeof ImageLibrary>;

const meta: Meta<typeof ImageLibrary> = {
  title: 'Media/ImageLibrary',
  component: ImageLibrary,
};

// we need static images on top to avoid test flakiness
const IMAGES = [
  {
    id: '1',
    url: 'https://global-uploads.webflow.com/5bec5cb06b362b0cf5ae9c36/6476401b49059f7901c06f82_discord%20image-p-500.png',
    name: '6476401b49059f7901c06f82_discord%20image-p-500.png',
  },
  {
    id: '2',
    url: 'https://global-uploads.webflow.com/5bec5cb06b362b0cf5ae9c36/64c7f85a214b1263553d0477_support%20bot-p-800.png',
    name: '64c7f85a214b1263553d0477_support%20bot-p-800.png',
  },
  {
    id: '3',
    url: 'https://global-uploads.webflow.com/5bec5cb06b362b0cf5ae9c36/64c7fedc1cf390b1241a6337_retail%20bot-1-p-800.png',
    name: '64c7fedc1cf390b1241a6337_retail%20bot-1-p-800.png',
  },
  {
    id: '4',
    url: 'https://global-uploads.webflow.com/5bec5cb06b362b0cf5ae9c36/628f705c0d2df789e3f254ad_template-Introduction%20to%20Voiceflow%20VOICE-p-500.png',
    name: '628f705c0d2df789e3f254ad_template-Introduction%20to%20Voiceflow%20VOICE-p-500.png',
  },
  {
    id: '5',
    url: 'https://global-uploads.webflow.com/5bec5cb06b362b0cf5ae9c36/64b86370948367be1b1bc27c_zapier-p-800.png',
    name: '64b86370948367be1b1bc27c_zapier-p-800.png',
  },
  {
    id: '6',
    url: 'https://global-uploads.webflow.com/5bec5cb06b362b0cf5ae9c36/64c4264d535c4a2ec6ae0c57_survey-p-800.png',
    name: '64c4264d535c4a2ec6ae0c57_survey-p-800.png',
  },
  {
    id: '7',
    url: 'https://global-uploads.webflow.com/5bec5cb06b362b0cf5ae9c36/6257b460e5d4ad624ab0d990_1.png',
    name: '6257b460e5d4ad624ab0d990_1.png',
  },
  {
    id: '8',
    url: 'https://global-uploads.webflow.com/5bec5cb06b362b0cf5ae9c36/619bcf6f604d2d5b99929f25_template-%20Bank%20IVR-p-500.png',
    name: '619bcf6f604d2d5b99929f25_template-%20Bank%20IVR-p-500.png',
  },
  ...Array.from({ length: 51 }, () => ({
    id: faker.string.uuid(),
    url: `https://picsum.photos/${random(200, 400)}/${random(200, 400)}?/${faker.image.urlPlaceholder()}`,
    name: faker.system.fileName(),
  })),
];

export const Examples: Story = {
  render: () => <ImageLibrary images={IMAGES} onImageRemove={console.log} />,
};

export default meta;
