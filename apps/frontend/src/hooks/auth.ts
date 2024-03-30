import { useState } from 'react';
import * as api from '../clients/api';
import { toast } from '../components/ui';

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
    } catch (e) {
      console.log('ERROR', e);

      toast({
        variant: 'destructive',
        title: 'Não foi possível criar uma nova conta',
      });
      throw new Error('Não foi possível criar uma nova conta');
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, onSignup };
};
