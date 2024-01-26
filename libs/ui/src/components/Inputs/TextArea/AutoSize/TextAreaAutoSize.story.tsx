import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { ModalContainer } from '@/components/Modal/ModalContainer';
import { ModalFooter } from '@/components/Modal/ModalFooter';
import { ModalHeader } from '@/components/Modal/ModalHeader';
import { Box } from '@/components/Utility/Box/Box.component';
import { CartesianProduct } from '@/storybook/CartesianProduct';

import { TextAreaAutoSize } from './TextAreaAutoSize.component';
import type { ITextAreaAutoSize } from './types';

type Story = StoryObj<typeof TextAreaAutoSize>;

const longTextFixture =
  'Tattooed hashtag cloud bread af same. Green juice stumptown hammock flexitarian. Chicharrones iPhone copper mug organic. Cold-pressed poke grailed af shaman, vape mustache taiyaki hella sus shabby chic direct trade whatever +1 neutral milk hotel. Mumblecore Brooklyn direct trade cornhole squid chartreuse, coloring book man bun XOXO. Street art kogi four loko distillery asymmetrical pinterest. Taiyaki skateboard pork belly direct trade. Tilde blog street art locavore, cray biodiesel 3 wolf moon tumeric coloring book twee church-key semiotics organic. Brunch hella church-key forage pork belly portland meditation gochujang photo booth. Mlkshk hexagon semiotics, activated charcoal pitchfork readymade tumblr photo booth. Intelligentsia single-origin coffee lo-fi woke umami skateboard. Dreamcatcher migas cornhole bespoke lomo, knausgaard organic salvia keffiyeh listicle pour-over big mood. Mumblecore cred waistcoat meditation godard, palo santo ethical. Air plant edison bulb pug, wayfarers whatever mukbang street art raw denim cardigan gluten-free tumblr yuccie pour-over single-origin coffee.';

const urlTextFixture =
  'https://developer.voiceflow.com/docs/step-3-deploy-assistant\nhttps://learn.voiceflow.com/hc/en-us/articles/14448920140941-Handling-User-Input-and-Matching-to-Intents\nhttps://lear\n';

const MockComponent = (args: Partial<ITextAreaAutoSize>) => {
  const [value, setValue] = useState(args.value || '');

  return <TextAreaAutoSize {...args} value={value} onChange={(e) => setValue(e.target.value)} />;
};

const meta: Meta<typeof TextAreaAutoSize> = {
  title: 'Inputs/TextAreaAutosize',
  component: TextAreaAutoSize,
  render: (args) => {
    return <MockComponent {...args} />;
  },
  parameters: {
    chromatic: { delay: 100 },
  },
};

export default meta;

export const Base: Story = {
  render: () => (
    <CartesianProduct<ITextAreaAutoSize>
      componentName={TextAreaAutoSize.name}
      Component={TextAreaAutoSize}
      combinations={{
        placeholder: ['Placeholder'],
        value: [`${longTextFixture}`],
      }}
      columns={2}
      center
    />
  ),
};
export const Disabled: Story = {
  render: () => (
    <CartesianProduct<ITextAreaAutoSize>
      componentName={TextAreaAutoSize.name}
      Component={TextAreaAutoSize}
      combinations={{
        placeholder: ['Placeholder'],
        value: ['', longTextFixture],
        disabled: [true],
      }}
      columns={2}
      center
    />
  ),
};

export const WithIconButton: Story = {
  render: () => (
    <CartesianProduct<ITextAreaAutoSize>
      componentName={TextAreaAutoSize.name}
      Component={TextAreaAutoSize}
      combinations={{
        placeholder: ['Placeholder'],
        value: ['', longTextFixture],
        disabled: [true],
        onIconClick: [() => null],
        iconName: ['Copy'],
      }}
      columns={2}
      center
    />
  ),
};
export const Chunk: Story = {
  render: () => (
    <CartesianProduct<ITextAreaAutoSize>
      componentName={TextAreaAutoSize.name}
      Component={TextAreaAutoSize}
      combinations={{
        placeholder: ['Placeholder'],
        value: ['', `${longTextFixture} ${longTextFixture}`],
        variant: ['chunk'],
      }}
      columns={2}
      center
    />
  ),
};

export const Url: Story = {
  render: () => (
    <CartesianProduct<ITextAreaAutoSize>
      componentName={TextAreaAutoSize.name}
      Component={TextAreaAutoSize}
      combinations={{
        placeholder: ['Placeholder'],
        value: ['', `${urlTextFixture} ${urlTextFixture}`],
        horizontalScroll: [true],
        error: [true, false],
        disabled: [true, false],
      }}
      columns={2}
      center
    />
  ),
};

const ModalExampleComponent = (props: ITextAreaAutoSize) => {
  return (
    <ModalContainer style={{ maxHeight: '80vh' }}>
      <ModalHeader title="Howdy" onClose={() => null} />
      <Box py={20} px={20} style={{ overflow: 'scroll' }}>
        <MockComponent {...props} />
      </Box>
      <ModalFooter></ModalFooter>
    </ModalContainer>
  );
};

export const ModalExample: Story = {
  render: () => (
    <CartesianProduct<ITextAreaAutoSize>
      componentName={TextAreaAutoSize.name}
      Component={ModalExampleComponent}
      combinations={{
        placeholder: ['Placeholder'],
        value: ['', longTextFixture],
        disabled: [false],
        onIconClick: [() => null],
        iconName: ['Copy'],
        variant: ['default', 'chunk'],
      }}
      columns={2}
      center
    />
  ),
};
