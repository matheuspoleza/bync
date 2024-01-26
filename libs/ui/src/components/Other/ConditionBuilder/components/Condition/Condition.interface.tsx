import type { ISlateEditor, VariableItem } from '@/components/Inputs/SlateEditor';
import type { IMenuItem } from '@/components/Navigation';
import type { IBox } from '@/components/Utility';

export interface ICondition extends IBox {
  leftValue: ISlateEditor['value'];
  rightValue: ISlateEditor['value'];
  variablesMap: Record<string, VariableItem>;
  conditionsList: IMenuItem[];
  onConditionRemove: () => void;

  onLogicItemClick?: (item: IMenuItem) => void;
  onVariableClick?: (item: VariableItem) => void;
  onVariableCreate?: (value: string) => VariableItem | Promise<VariableItem>;
  onValueChange?: (value: ISlateEditor['value']) => void;

  placeholder?: string;
  isCreatable?: boolean;
  isDisabled?: boolean;
  activeLogicType?: string;

  leftPluginOptions?: ISlateEditor['pluginsOptions'];
  rightPluginOptions?: ISlateEditor['pluginsOptions'];
}
