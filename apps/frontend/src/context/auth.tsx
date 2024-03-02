import React, { createContext, useContext } from 'react';
import { useLocalStorageState } from '../hooks/storage';
import * as atoms from '../atoms';

const AuthContext = createContext({
  customerID: '',
  setCustomerID: (_: string) => null,
});

export const AuthProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [customerID, setCustomerID] = useLocalStorageState<string>(
    atoms.utils.STORAGE_KEYS.CUSTOMER_ID,
    ''
  );

  return (
    <AuthContext.Provider value={{ customerID, setCustomerID }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return {
    isLoggedIn: !!context.customerID,
    login: (customerID: string) => context.setCustomerID(customerID),
  };
};
