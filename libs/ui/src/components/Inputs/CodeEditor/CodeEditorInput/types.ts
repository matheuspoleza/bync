export interface IVariableCode {
  variableID: string;
}

export interface IEntityCode {
  entityID: string;
}
export type TCodeEditorData = Array<string | IVariableEntityCode>;

export type TCodeData = Array<string | IVariableCode | IEntityCode>;

export interface ICodeEditor {
  language: TCode;
  onChange?: (value: TCodeData) => void;
  value: TCodeData;
  variableEntities?: TVariableEntityMap | null;
  theme: 'light' | 'dark';
  placeholder?: string;
  readOnly?: boolean;
  autofocus?: boolean;
  autoFocusLineNumber?: number;
  isFunctionEditor?: boolean;
  disabled?: boolean;
  className?: string;
}

export type TCode = 'javascript' | 'json';

export interface IVariableEntityCode {
  id: string;
  name: string;
  kind: 'variable' | 'entity';
  color: string;
  variant: 'variable' | 'entity';
}

export type TVariableEntityMap = Record<string | number, IVariableEntityCode>;
