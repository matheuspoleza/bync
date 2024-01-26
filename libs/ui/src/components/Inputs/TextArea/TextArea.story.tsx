import type { Meta, StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';

import { Button } from '@/components/Buttons/Button/Button.component';
import { CartesianProduct } from '@/storybook/CartesianProduct';
import { WithFormControlState } from '@/storybook/decorators';

import { TextArea } from './TextArea.component';
import type { ITextArea } from './types';

type Story = StoryObj<typeof TextArea>;

const longTextFixture =
  'Tattooed hashtag cloud bread af same. Green juice stumptown hammock and some flex about a an Chicharrones iPhone copper mug organic. Cold-pressed poke grailed af shaman, vape mustache taiyaki hella sus shabby chic direct trade whatever +1 neutral milk hotel. Mumblecore Brooklyn direct trade cornhole squid chartreuse, coloring book man bun XOXO. Street art kogi four loko distillery asymmetrical pinterest. Taiyaki skateboard pork belly direct trade. Tilde blog street art locavore, cray biodiesel 3 wolf moon tumeric coloring book twee church-key semiotics organic. Brunch hella church-key forage pork belly portland meditation gochujang photo booth. Mlkshk hexagon semiotics, activated charcoal pitchfork readymade tumblr photo booth. Intelligentsia single-origin coffee lo-fi woke umami skateboard. Dreamcatcher migas cornhole bespoke lomo, knausgaard organic salvia keffiyeh listicle pour-over big mood. Mumblecore cred waistcoat meditation godard, palo santo ethical. Air plant edison bulb pug, wayfarers whatever mukbang street art raw denim cardigan gluten-free tumblr yuccie pour-over single-origin coffee.';

const meta: Meta<typeof TextArea> = {
  title: 'Inputs/Text Area',
  component: TextArea,
  decorators: [WithFormControlState],
  render: (args) => {
    return (
      <div style={{ width: '25%' }}>
        <TextArea {...args} />
      </div>
    );
  },
  parameters: {
    chromatic: { delay: 100 },
  },
};

export default meta;
export const Base: Story = {
  args: {
    minHeight: 30,
    maxHeight: 100,
    value: longTextFixture,
    disabled: false,
  },
};
export const WithIcon: Story = {
  args: {
    minHeight: 20,
    maxHeight: 100,
    iconName: 'Copy',
  },
};
export const StaticHeight: Story = {
  args: {
    minHeight: 20,
    maxHeight: 100,
  },
};

export const Chunk: Story = {
  args: {
    value: longTextFixture,
    variant: 'chunk',
  },
};

export const Ellipsis: Story = {
  args: {
    value: longTextFixture,
    maxRows: 3,
    ellipsis: true,
  },
};

export const Caption: Story = {
  args: {
    value: longTextFixture,
    maxRows: 3,
    caption: 'Caption',
  },
};

const RefTextArea = (props: ITextArea) => {
  const textRef = useRef<HTMLTextAreaElement>(null);
  const handleClick = () => {
    textRef.current?.focus();
  };
  return (
    <div>
      <TextArea {...props} ref={textRef} value="Some text" />
      <Button onClick={handleClick}>Focus</Button>
    </div>
  );
};

export const Focus: Story = {
  render: (args) => {
    return (
      <div style={{ width: '50%' }}>
        <RefTextArea {...args} />
      </div>
    );
  },
};

export const Examples: Story = {
  render: () => (
    <CartesianProduct<ITextArea>
      componentName={TextArea.name}
      Component={(props) => {
        const [value, setValue] = useState(props.value);

        return <TextArea {...props} value={value} onValueChange={setValue} />;
      }}
      combinations={{
        placeholder: [undefined, 'Placeholder'],
        disabled: [false, true],
        iconName: [undefined, 'Copy'],
        maxHeight: [undefined, 100],
        minHeight: [50],
        value: ['', longTextFixture],
        variant: ['default', 'chunk'],
      }}
      columns={2}
      center
      isHidden={({ value, disabled, minHeight, placeholder, iconName, maxHeight }) =>
        !value && !disabled && minHeight === 50 && !placeholder && !iconName && !maxHeight
      }
    />
  ),
};
