import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { SquareButton } from '@/components/Buttons/SquareButton';
import { SlateEditor } from '@/components/Inputs';
import type { ISlateEditor } from '@/components/Inputs/SlateEditor';
import { Section } from '@/components/Section';
import { Box } from '@/components/Utility';

import { Divider } from '../Divider';
import { Condition } from './components/Condition';
import type { ICondition } from './components/Condition/Condition.interface';
import { ConditionBuilderContainer } from './components/ConditionBuilderContainer';
import type { IConditionBuilder } from './ConditionBuilder.component';
import { ConditionBuilder } from './ConditionBuilder.component';
import { conditionsList, DEFAULT_LEFT_VALUE, DEFAULT_RIGHT_VALUE, variablesMap } from './fixtures';

const meta: Meta<typeof ConditionBuilder> = {
  title: 'Other / ConditionBuilder',
  component: ConditionBuilder,
  args: {
    headerButtons: (
      <>
        <SquareButton iconName="Question" size="medium" />
        <SquareButton iconName="Plus" size="medium" />
      </>
    ),
  },
};

interface IMockCondition {
  id: string;
  leftValue: ISlateEditor['value'];
  rightValue: ISlateEditor['value'];
  activeLogicType?: string;
}

type Story = StoryObj<typeof ConditionBuilder>;

const FilledCondition = (props: Omit<ICondition, 'variablesMap' | 'conditionsList'>) => {
  return <Condition {...props} conditionsList={conditionsList} variablesMap={variablesMap} />;
};

const ControlledBuilder = (props: IConditionBuilder) => {
  const [tab, setTab] = useState(0);
  const matchAll = [
    {
      leftValue: [{ children: [...DEFAULT_LEFT_VALUE[0].children, { text: ' - 900 * 0.6' }] }],
      rightValue: DEFAULT_RIGHT_VALUE,
      activeLogicType: 'is not',
      id: '111',
    },
    {
      leftValue: DEFAULT_LEFT_VALUE,
      rightValue: SlateEditor.StaticEditor.getEmptyState(),
      activeLogicType: 'is not',
      id: '222',
    },
    {
      leftValue: SlateEditor.StaticEditor.getEmptyState(),
      rightValue: SlateEditor.StaticEditor.getEmptyState(),
      id: '33',
    },
  ];
  const matchAny = [
    {
      id: '01',
      leftValue: SlateEditor.StaticEditor.getEmptyState(),
      rightValue: SlateEditor.StaticEditor.getEmptyState(),
    },
  ];
  const [conditions, setConditions] = useState(matchAll as any);

  const onRemove = (id: string) => {
    if (conditions.length === 1) return;
    const newConditions = conditions.filter((el: IMockCondition) => el.id !== id);
    setConditions(newConditions);
  };

  return (
    <ConditionBuilder
      {...props}
      activeTab={tab}
      onTabChange={(tab) => {
        setTab(tab);
        if (tab === 1) setConditions(matchAny as any);
        else setConditions(matchAll as any);
      }}
      headerButtons={
        <>
          <SquareButton iconName="Question" size="medium" />
          <SquareButton
            iconName="Plus"
            size="medium"
            onClick={() =>
              setConditions([
                ...conditions,
                {
                  leftValue: SlateEditor.StaticEditor.getEmptyState(),
                  rightValue: SlateEditor.StaticEditor.getEmptyState(),
                  id: Math.random().toString(),
                },
              ])
            }
          />
        </>
      }
    >
      {conditions.map((c: IMockCondition, index: number) => (
        <FilledCondition
          {...c}
          key={c.id}
          isCreatable={true}
          onConditionRemove={() => onRemove(c.id)}
          leftValue={c.leftValue}
          rightValue={c.rightValue}
          onValueChange={(value) => {
            const entry = conditions.find((el: IMockCondition) => el.id === c.id);
            const newEntry = { ...entry, leftValue: value };
            const newConditions = [...conditions];
            newConditions.splice(index, 1, newEntry as any);

            setConditions(newConditions);
          }}
        />
      ))}
    </ConditionBuilder>
  );
};

export const Base: Story = {
  render: (args) => (
    <ConditionBuilderContainer>
      <ControlledBuilder {...args} />
    </ConditionBuilderContainer>
  ),
};

export const WithActions: Story = {
  render: (args) => (
    <ConditionBuilderContainer pb={11}>
      <ControlledBuilder {...args} />
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
