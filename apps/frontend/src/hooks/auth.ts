import { useState } from 'react';
import * as api from '../clients/api';

export const useSignup = () => {
  const [isLoading, setIsLoading] = useState(false);

  const onSignup = async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    setIsLoading(true);

    try {
      const authenticatedData = await api.signup(data);
      return authenticatedData;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, onSignup };
};
