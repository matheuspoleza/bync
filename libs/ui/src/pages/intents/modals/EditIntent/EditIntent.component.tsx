import { Menu, MenuItem, Modal, Popper, Search, SquareButton } from '@/components';

import { IntentContent } from '../../IntentContent/IntentContent.component';

interface IEditIntentModal {
  errorExample?: boolean;
  data?: any;
  entities: string[];
}

export const EditIntentModal: React.FC<IEditIntentModal> = ({ errorExample, data, entities }) => {
  const headerLeftButton = () => {
    return (
      <Popper
        placement="left-start"
        referenceElement={({ onToggle, ref, isOpen }) => (
          <Modal.Header.LeftButton onClick={onToggle} isActive={isOpen} ref={ref} size="medium" iconName="Menu" />
        )}
      >
        {() => (
          <Menu searchSection={<Search value="" placeholder="Search" />}>
            <MenuItem label="Howdy" />
            <MenuItem label="Folks" />
          </Menu>
        )}
      </Popper>
    );
  };

  const moreHeaderButton = () => {
    return (
      <Popper
        placement="bottom-start"
        referenceElement={({ onOpen, ref, isOpen }) => (
          <SquareButton onClick={onOpen} ref={ref} size="xlarge" iconName="More" isActive={isOpen} />
        )}
      >
        {() => (
          <Menu width={83}>
            <MenuItem label="Delete" />
          </Menu>
        )}
      </Popper>
    );
  };

  return (
    <Modal.Container>
      <Modal.Header
        title="Edit intent"
        onClose={() => null}
        leftButton={headerLeftButton()}
        secondaryButton={moreHeaderButton()}
      />
      <IntentContent errorExample={errorExample} data={data} entities={entities} />

      <Modal.Footer>
        <Modal.Footer.Button label="Close" variant="secondary" />
      </Modal.Footer>
    </Modal.Container>
  );
};
