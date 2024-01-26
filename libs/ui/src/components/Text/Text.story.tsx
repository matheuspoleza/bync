import type { Meta, StoryObj } from '@storybook/react';

import { CartesianProduct } from '@/storybook/CartesianProduct';
import { Tokens } from '@/styles';

import { Text } from './Text.component';
import type { IText } from './types';

type Story = StoryObj<typeof Text>;

const meta: Meta<typeof Text> = {
  title: 'Text',
  component: Text,
};

export default meta;

export const Base: Story = {
  args: {
    children: 'Howdy Folks',
  },
};

export const Colors: Story = {
  args: {
    children: 'The quick brown fox jumps over the lazy dog. Design, prototype and launch voice & chat bots.',
  },
  render: ({ children }) => (
    <>
      <CartesianProduct<IText>
        componentName={Text.name}
        Component={(props) => <Text {...props}>{props.variant?.toUpperCase()}</Text>}
        combinations={{
          variant: ['h1', 'h2', 'h3', 'h4'],
          color: [Tokens.colors.accent.accent500],
        }}
      />
      <CartesianProduct<IText>
        componentName={Text.name}
        Component={(props) => <Text {...props}>{children}</Text>}
        combinations={{
          weight: ['regular', 'semiBold', 'bold'],
          underlined: [false, true],
          variant: ['basic', 'p', 'caption'],
          color: [Tokens.colors.accent.accent500],
        }}
      />
      <CartesianProduct<IText>
        componentName={Text.name}
        Component={(props) => (
          <Text {...props} variant="subcaption">
            {children}
          </Text>
        )}
        combinations={{
          weight: ['regular', 'semiBold'],
          color: [Tokens.colors.accent.accent500],
        }}
      />
      <CartesianProduct<IText>
        componentName={Text.name}
        Component={(props) => <Text {...props}>{children}</Text>}
        combinations={{
          variant: ['fieldCaption', 'fieldLabel', 'code', 'codeLarge'],
          color: [Tokens.colors.accent.accent500],
        }}
      />
    </>
  ),
};

export const Examples: Story = {
  args: {
    children: 'The quick brown fox jumps over the lazy dog. Design, prototype and launch voice & chat bots.',
  },
  render: ({ children }) => (
    <>
      <CartesianProduct<IText>
        componentName={Text.name}
        Component={(props) => <Text {...props}>{props.variant?.toUpperCase()}</Text>}
        combinations={{
          variant: ['h1', 'h2', 'h3', 'h4'],
        }}
      />
      <CartesianProduct<IText>
        componentName={Text.name}
        Component={(props) => <Text {...props}>{children}</Text>}
        combinations={{
          weight: ['regular', 'semiBold', 'bold'],
          underlined: [false, true],
          variant: ['basic', 'p', 'caption'],
        }}
      />
      <CartesianProduct<IText>
        componentName={Text.name}
        Component={(props) => (
          <Text {...props} variant="subcaption">
            {children}
          </Text>
        )}
        combinations={{
          weight: ['regular', 'semiBold'],
        }}
      />
      <CartesianProduct<IText>
        componentName={Text.name}
        Component={(props) => <Text {...props}>{children}</Text>}
        combinations={{
          variant: ['fieldCaption', 'fieldLabel', 'code', 'codeLarge'],
        }}
      />
    </>
  ),
};
