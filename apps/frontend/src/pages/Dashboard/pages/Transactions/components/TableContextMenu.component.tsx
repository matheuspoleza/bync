import { MenuItem, Divider } from '@bync/ui';

export const TransactionsTableContextMenu: React.FC<{
  id: string;
  onClose: VoidFunction;
  onRename: VoidFunction;
}> = ({ id, onClose, onRename }) => {
  return (
    <>
      <MenuItem
        key={id}
        prefixIconName="Edit"
        label="Rename"
        onClick={() => {
          onRename();
          onClose();
        }}
      />
      <MenuItem prefixIconName="Export" label="Export" onClick={onClose} />
      <MenuItem prefixIconName="MoveTo" label="Move to..." onClick={onClose} />
      <MenuItem prefixIconName="Link" label="Copy link" onClick={onClose} />
      <Divider />
      <MenuItem prefixIconName="Trash" label="Delete" onClick={onClose} />
    </>
  );
};
