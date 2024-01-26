import { useMemo } from 'react';

import { Box } from '@/components/Utility/Box';

import { ImportFileModal } from '../../../modals/ImportFileModal/ImportFileModal.component';
import { ImportFromSitemapModal } from '../../../modals/ImportFromSitemapModal/ImportFromSitemapModal.component';
import { ImportFromURLModal } from '../../../modals/ImportFromURLModal/ImportFromURLModal.component';
import { ImportPlainTextModal } from '../../../modals/ImportPlainTextModal';
import { ReviewURLsModal } from '../../../modals/ReviewURLsModal/ReviewURLsModal.component';

interface IModalSwitcher {
  activeModal: number | null;
  setActiveModal: (activeModal: number | null) => void;
}
export const ModalSwitcher: React.FC<IModalSwitcher> = ({ activeModal, setActiveModal }) => {
  const activeModalComponent = useMemo(() => {
    switch (activeModal) {
      case 0:
        return <ImportPlainTextModal onClose={() => setActiveModal(null)} />;

      case 1:
        return <ImportFileModal onClose={() => setActiveModal(null)} />;
      case 2:
        return <ImportFromURLModal onClose={() => setActiveModal(null)} />;
      case 3:
        return <ImportFromSitemapModal onClose={() => setActiveModal(null)} onNextClick={() => setActiveModal(4)} />;
      case 4:
        return <ReviewURLsModal onClose={() => setActiveModal(null)} onBackClick={() => setActiveModal(3)} />;
      default:
        return null;
    }
  }, [activeModal]);

  const modalBackdrop = activeModalComponent && (
    <Box
      width="100%"
      height="100%"
      style={{
        position: 'absolute',
        zIndex: 99,
        top: 0,
        left: 0,
        backgroundBlendMode: 'normal, color',
        background: '#191D22',
        opacity: 0.2,
      }}
    />
  );
  return (
    <>
      {modalBackdrop}
      <Box
        style={{
          position: 'fixed',
          zIndex: 100,
          left: '50%',
          transform: 'translateX(-50%)',
        }}
        mt={32}
        mb={32}
      >
        {activeModalComponent}
      </Box>
    </>
  );
};
