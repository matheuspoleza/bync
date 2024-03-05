import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth, useAuthSubscription } from './context/auth';
import { useBankingAccounts } from './hooks/banking';
import { useBudgetAccounts } from './hooks/budgets';
import { ModalProvider } from './context/modal';

export const Layout: React.FC = () => {
  const navigate = useNavigate();
  useAuthSubscription();
  const { isLoggedIn } = useAuth();
  const { fetchBankAccounts } = useBankingAccounts({ enabled: false });
  const { fetchBudgetAccounts } = useBudgetAccounts({ enabled: false });

  const handleRedirect = async () => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    const bankAccounts = await fetchBankAccounts();
    const budgetAccounts = await fetchBudgetAccounts();

    if (!bankAccounts.data?.length) {
      navigate('/dashboard?modal=OnboardingModal&step=bank-accounts');
      return;
    }

    if (!budgetAccounts.data?.length) {
      navigate('/dashboard?modal=OnboardingModal&step=budgets');
      return;
    }

    navigate('/dashboard');
  };

  useEffect(() => {
    handleRedirect();
  }, [isLoggedIn]);

  return (
    <ModalProvider>
      <Outlet />
    </ModalProvider>
  );
};
