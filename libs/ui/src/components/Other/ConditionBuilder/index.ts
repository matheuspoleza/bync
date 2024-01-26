import { Condition } from './components/Condition';
import { ConditionBuilderContainer } from './components/ConditionBuilderContainer';
import { ConditionWithReturnValue } from './components/ConditionWithReturnValue';
import { ReturnValueSection } from './components/ReturnValueSection/ReturnValueSection.component';
import { ConditionBuilder as ConditionsBlock } from './ConditionBuilder.component';

export const ConditionBuilder = {
  Container: ConditionBuilderContainer,
  PersonaPromptEvalSection: ConditionWithReturnValue,
  Condition,
  ReturnValueSection,
  ConditionsBlock,
};
