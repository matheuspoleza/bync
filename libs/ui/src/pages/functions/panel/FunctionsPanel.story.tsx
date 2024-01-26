import type { Meta, StoryObj } from '@storybook/react';

import { EditFunctionsPanelContent } from '../EditFunctionsPanelContent/EditFunctionsPanelContent.component';
import { EmptyFunctionsPanel } from '../EmptyFunctionsPanel/EmptyFunctionsPanel.component';
import {
  filledInputVariableMapping,
  outputVariableMappingFilled,
  outputVariableMappingFilledWithVariables,
  outputVariableMappingunFilled,
  stressTest,
  unfilledInputVariableMapping,
} from '../fixtures';
import { SelectFunctionPanelContent } from '../SelectFunctionPanelContent/SelectFunctionPanelContent.component';
import { FunctionsPanel } from './FunctionsPanel.component';

type Story = StoryObj<typeof FunctionsPanel>;

const descriptionFixture = 'This is a description. It can be long or short. It can be anything you want it to be.';

const meta: Meta<typeof FunctionsPanel> = {
  title: 'Pages/Functions/Panel ',
  component: FunctionsPanel,
  parameters: {
    layout: 'fullscreen',
  },
};

export const Empty: Story = {
  args: {
    children: <EmptyFunctionsPanel />,
  },
};

export const SelectFunction: Story = {
  args: {
    children: <SelectFunctionPanelContent />,
  },
};

export const EditFunctionAllFields: Story = {
  args: {
    children: (
      <EditFunctionsPanelContent
        outputVariableMapping={outputVariableMappingFilled}
        inputVariableMapping={filledInputVariableMapping}
        description={descriptionFixture}
      />
    ),
  },
};

export const StressTest: Story = {
  render: () => {
    console.log({ stressTest });
    return (
      <FunctionsPanel>
        <EditFunctionsPanelContent
          outputVariableMapping={stressTest}
          inputVariableMapping={stressTest}
          description={descriptionFixture}
        />
      </FunctionsPanel>
    );
  },
};

export const EditFunctionUnassigned: Story = {
  args: {
    children: (
      <EditFunctionsPanelContent
        outputVariableMapping={outputVariableMappingunFilled}
        inputVariableMapping={unfilledInputVariableMapping}
        description={descriptionFixture}
      />
    ),
  },
};

export const NoInputVaraibles: Story = {
  args: {
    children: (
      <EditFunctionsPanelContent
        outputVariableMapping={outputVariableMappingFilled}
        inputVariableMapping={[]}
        description={descriptionFixture}
      />
    ),
  },
};

export const NoOutputVaraibles: Story = {
  args: {
    children: (
      <EditFunctionsPanelContent
        outputVariableMapping={[]}
        inputVariableMapping={filledInputVariableMapping}
        description={descriptionFixture}
      />
    ),
  },
};

export const OutputVariablesWithVariables: Story = {
  args: {
    children: (
      <EditFunctionsPanelContent
        outputVariableMapping={outputVariableMappingFilledWithVariables}
        inputVariableMapping={filledInputVariableMapping}
        description={descriptionFixture}
      />
    ),
  },
};

export default meta;
