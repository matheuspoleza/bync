import type { Meta, StoryObj } from '@storybook/react';

import { Input, SlateEditor } from '@/components/Inputs';
import { Divider } from '@/components/Other/Divider';
import { Section } from '@/components/Section';
import { Box } from '@/components/Utility';

import { conditionsList, variablesMap } from '../../fixtures';
import { Condition } from '../Condition/Condition.component';
import { ConditionBuilderContainer } from '../ConditionBuilderContainer';
import { ReturnValueSection } from '../ReturnValueSection/ReturnValueSection.component';
import { ConditionWithReturnValue } from './ConditionWithReturnValue.component';

const meta: Meta<typeof ConditionWithReturnValue> = {
  title: 'Other / ConditionBuilder / ConditionWithReturnValue',
  component: ConditionWithReturnValue,
};

type Story = StoryObj<typeof ConditionWithReturnValue>;

export const Base: Story = {
  render: (args) => (
    <ConditionBuilderContainer pt={11} pb={20}>
      <ConditionWithReturnValue {...args} onHelpClick={() => null}>
        <Input placeholder="Enter prompt to evaluate..." value="" variant="ghost" />
      </ConditionWithReturnValue>
      <Divider />
      <ReturnValueSection onAddClick={() => null} />
      <Condition
        variablesMap={variablesMap}
        conditionsList={conditionsList}
        rightValue={SlateEditor.StaticEditor.getEmptyState()}
        onConditionRemove={() => null}
        leftValue={[{ children: [{ text: 'value' }] }]}
        placeholder="enter value or {var}"
        activeLogicType="is"
      />
      <Condition
        variablesMap={variablesMap}
        conditionsList={conditionsList}
        rightValue={SlateEditor.StaticEditor.getEmptyState()}
        onConditionRemove={() => null}
        leftValue={[{ children: [{ text: 'value' }] }]}
        placeholder="enter value or {var}"
        activeLogicType="contains"
      />
    </ConditionBuilderContainer>
  ),
};

export const WithActions: Story = {
  render: (args) => (
    <ConditionBuilderContainer py={11}>
      <ConditionWithReturnValue {...args} onHelpClick={() => null}>
        <Input placeholder="Enter prompt to evaluate..." value="" variant="ghost" />
      </ConditionWithReturnValue>
      <Divider />
      <ReturnValueSection onAddClick={() => null} />
      <Condition
        variablesMap={variablesMap}
        conditionsList={conditionsList}
        rightValue={SlateEditor.StaticEditor.getEmptyState()}
        onConditionRemove={() => null}
        leftValue={[{ children: [{ text: 'value' }] }]}
        placeholder="enter value or {var}"
        activeLogicType="is"
      />
      <Condition
        variablesMap={variablesMap}
        conditionsList={conditionsList}
        rightValue={SlateEditor.StaticEditor.getEmptyState()}
        onConditionRemove={() => null}
        leftValue={[{ children: [{ text: 'value' }] }]}
        placeholder="enter value or {var}"
        activeLogicType="contains"
      />
      <Divider />
      <Box pt={11}>
        <Section.Header.Container title="Actions" variant="active">
          <Section.Header.Button iconName="Plus" onClick={() => null} />
        </Section.Header.Container>
      </Box>
    </ConditionBuilderContainer>
  ),
};

export default meta;
