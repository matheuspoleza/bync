import type { Meta, StoryObj } from '@storybook/react';

import { CodeEditor } from './CodeEditor.component';
import type { TCodeData } from './types';
import { codeFunctionFixture, codeWithVariables, javascriptLanguageFeatures } from './utils/__fixtures__';
import { codeEditorJSONFixture } from './utils/__fixtures__/json';
import { variablesMap } from './utils/__fixtures__/variablemap';

type Story = StoryObj<typeof CodeEditor>;

const meta: Meta<typeof CodeEditor> = {
  title: 'Inputs/CodeEditor',
  component: CodeEditor,
  args: {
    value: [],
    variableEntities: variablesMap,
    onChange: (value: TCodeData) => console.log({ value }),
  },
  render: (args) => {
    return <CodeEditor {...args} />;
  },
};

export default meta;

export const BaseLight: Story = {
  args: {
    theme: 'light',
    language: 'javascript',
  },
};

export const BaseDark: Story = {
  args: {
    theme: 'dark',
    language: 'javascript',
  },
};

export const FunctionExample: Story = {
  args: {
    theme: 'light',
    language: 'javascript',
    isFunctionEditor: true,
    value: codeFunctionFixture,
  },
};

export const JustJavascript: Story = {
  args: {
    theme: 'light',
    language: 'javascript',
    value: javascriptLanguageFeatures,
  },
};

export const JustJavascriptDark: Story = {
  args: {
    theme: 'dark',
    language: 'javascript',
    value: javascriptLanguageFeatures,
  },
};

export const LightJavascript: Story = {
  args: {
    theme: 'light',
    language: 'javascript',
    value: codeWithVariables,
  },
};

export const DarkJavascriptWithVariables: Story = {
  args: {
    theme: 'dark',
    language: 'javascript',
    value: codeWithVariables,
  },
};

export const LightJSON: Story = {
  args: {
    theme: 'light',
    language: 'json',
    value: codeEditorJSONFixture,
  },
};

export const DarkJSON: Story = {
  args: {
    theme: 'dark',
    language: 'json',
    value: codeEditorJSONFixture,
  },
};

export const DisabledState: Story = {
  args: {
    theme: 'light',
    language: 'javascript',
    disabled: true,
  },
};

export const DisabledStateDark: Story = {
  args: {
    theme: 'dark',
    language: 'javascript',
    disabled: true,
  },
};
