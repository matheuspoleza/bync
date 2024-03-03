import { useAtom } from 'jotai';
import * as atoms from '../atoms';
import { getAllBankingAccounts } from '../clients/api';

export const useBankingAccounts = () => {
  const [accounts, setAccounts] = useAtom(atoms.banking.accounts);
  const [isFetching, setIsFetching] = useAtom(atoms.banking.isFetchingAccounts);

  const fetchBankAccounts = () => {
    setIsFetching(true);

    getAllBankingAccounts()
      .then((accounts) => setAccounts(accounts))
      .finally(() => setIsFetching(false));
  };

  return {
    accounts,
    isFetching,
    fetchBankAccounts,
  };
};
