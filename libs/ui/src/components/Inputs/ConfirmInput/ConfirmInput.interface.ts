export interface IConfirmInputChildren {
  disabled?: boolean;
  isLoading?: boolean;
  inputFieldClassName: string;
}

export interface IConfirmInput {
  children: (props: IConfirmInputChildren) => React.ReactNode;
  disabled?: boolean;
  isLoading?: boolean;
}
