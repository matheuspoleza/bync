import { Modal } from '@/components';

import type { IIntentContent } from '../../IntentContent/IntentContent.component';
import { IntentContent } from '../../IntentContent/IntentContent.component';

interface ICreateIntentModal {
  errorExample?: boolean;
  data: IIntentContent['data'];
  entities: string[];
}

export const CreateIntentModal: React.FC<ICreateIntentModal> = ({ errorExample, data, entities }) => {
  return (
    <Modal.Container>
      <Modal.Header title="Create intent" onClose={() => null} />
      <IntentContent entities={entities} errorExample={errorExample} data={data} />
      <Modal.Footer>
        <Modal.Footer.Button label="Cancel" variant="secondary" />
        <Modal.Footer.Button label="Create intent" variant="primary" />
      </Modal.Footer>
    </Modal.Container>
  );
};
