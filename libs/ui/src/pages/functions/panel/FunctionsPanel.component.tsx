import { Drawer, Editor, SquareButton } from '@/components';

interface IFunctionsPanel {
  children?: React.ReactNode;
}

export const FunctionsPanel: React.FC<IFunctionsPanel> = ({ children }) => {
  return (
    <Drawer isOpen={true}>
      <Editor
        title="Function"
        readOnly={true}
        headerActions={<SquareButton size="medium" iconName="More" onClick={() => null} />}
      >
        {children}
      </Editor>
    </Drawer>
  );
};
