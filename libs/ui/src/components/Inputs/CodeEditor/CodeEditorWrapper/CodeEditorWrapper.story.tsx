import type { Meta, StoryObj } from '@storybook/react';

import { Box } from '@/components/Utility/Box/Box.component';

import { CodeEditor } from '../CodeEditorInput';
import { functionsExample } from '../CodeEditorInput/utils/__fixtures__';
import { codeExample } from './__fixtures__/code-example';
import { customHeightCodeEditor, scrollableCodeEditor } from './__fixtures__/story.css';
import { CodeEditorWrapper } from './CodeEditorWrapper.component';
import { codeEditorWrapperInputStyles } from './CodeEditorWrapper.css';

type Story = StoryObj<typeof CodeEditorWrapper>;

const meta: Meta<typeof CodeEditorWrapper> = {
  title: 'Inputs/CodeEditor/CodeEditorWrapper',
  component: CodeEditorWrapper,
  args: {
    title: 'Javascript',
    headerButtonProps: {
      iconName: 'Question',
      onClick: () => null,
    },
    codeEditor: (
      <CodeEditor
        className={codeEditorWrapperInputStyles}
        language="javascript"
        theme="dark"
        value={[]}
        onChange={() => null}
      />
    ),
    bottomButtonProps: {
      label: 'Run',
      onClick: () => null,
    },
  },
  render: (args) => {
    return (
      <Box width="450px">
        <CodeEditorWrapper {...args} />
      </Box>
    );
  },
};

export default meta;

export const BaseLight: Story = {};

export const NoButton: Story = {
  args: {
    bottomButtonProps: undefined,
  },
};

export const NoExpand: Story = {
  args: {
    showExpandButton: false,
    bottomButtonProps: undefined,
  },
};

export const CustomHeight: Story = {
  args: {
    codeEditor: (
      <CodeEditor
        language="javascript"
        className={customHeightCodeEditor}
        theme="dark"
        value={[]}
        onChange={() => null}
      />
    ),
  },
};

export const Scrollable: Story = {
  args: {
    codeEditor: (
      <CodeEditor
        language="javascript"
        className={scrollableCodeEditor}
        theme="dark"
        value={[codeExample]}
        onChange={() => null}
      />
    ),
  },
};

export const FunctionExample: Story = {
  args: {
    codeEditor: (
      <CodeEditor
        language="javascript"
        className={scrollableCodeEditor}
        theme="dark"
        value={functionsExample}
        isFunctionEditor={true}
        autofocus={true}
        autoFocusLineNumber={3}
        onChange={() => null}
      />
    ),
  },
};
