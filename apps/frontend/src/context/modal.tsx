import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactElement,
  FunctionComponent,
} from 'react';
import { useLocation } from 'react-router-dom';

type ModalComponent<Props> = FunctionComponent<
  Props & { closeModal: () => void }
>;

interface ModalInstance<Props> {
  Component: ModalComponent<Props>;
  name: string;
}

interface ModalContextType {
  openModal: <Props>(
    modalInstance: ModalInstance<Props>,
    props?: Props
  ) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModals = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }

  return { closeModals: context.closeModal };
};

export const useModal = <Props,>(
  modalInstance: ModalInstance<Props>
): { openModal: (props?: Props) => void; closeModal: () => void } => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }

  const openModal = (props?: Props) => context.openModal(modalInstance, props);
  const { closeModal } = context;

  return { openModal, closeModal };
};

export const modalsManager = {
  modals: new Map<string, ModalInstance<any>>(),

  register<Props>(
    name: string,
    Component: ModalComponent<Props>
  ): ModalInstance<Props> {
    const instance = { Component, name };
    this.modals.set(name, instance);
    return instance;
  },

  get(name: string) {
    return this.modals.get(name);
  },
};

export const ModalProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [activeModal, setActiveModal] = useState<ReactElement | null>(null);
  const location = useLocation();

  const openModal = useCallback(
    <Props,>(
      modalInstance: ModalInstance<Props>,
      props: Props = {} as Props
    ) => {
      setActiveModal(
        <modalInstance.Component
          {...props}
          closeModal={() => setActiveModal(null)}
        />
      );
    },
    []
  );

  const closeModal = useCallback(() => {
    setActiveModal(null);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const modalName = params.get('modal');

    const props = Array.from(params.entries()).reduce<Record<string, any>>(
      (acc, [key, value]) => {
        acc[key] = value;
        return acc;
      },
      {}
    );

    if (modalName) {
      const modalInstance = modalsManager.get(modalName);

      if (modalInstance) {
        openModal(modalInstance, props);
      }
    }
  }, [location, openModal]);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {activeModal}
    </ModalContext.Provider>
  );
};
