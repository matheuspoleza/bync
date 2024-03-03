import { useEffect } from 'react';
import { useModal } from '../../context/modal';
import { Modals } from '../../modals';
import { useOnboarding } from '../../hooks/onboarding';

export const DashboardPage = () => {
  const { openModal } = useModal(Modals.Onboarding);
  const { step, isComplete, isLoading } = useOnboarding();

  useEffect(() => {
    if (!isComplete && !isLoading) {
      openModal({ step });
    }
  }, [step, isComplete, isLoading]);

  if (isLoading) return <div>is loading</div>;

  return <div>dashboard</div>;
};
