export const useOnboarding = () => {
  const { openModal } = useModal(Modals.Onboarding);

  useEffect(() => {
    if (isLoading) return;

    if (!bankAccounts?.length) {
      openModal({ step: 'bank-accounts' });
      return;
    }

    if (!budgetAccounts?.length) {
      openModal({ step: 'budgets' });
      return;
    }

    if (!Object.keys(connections).length) {
      openModal({ step: 'connection' });
    }
  }, [bankAccounts, budgetAccounts, connections, isLoading]);
};
