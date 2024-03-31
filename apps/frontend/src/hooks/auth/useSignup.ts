import { useState } from 'react';
import * as api from '../../api';
import { toast } from '../../components/ui';

export const useSignup = () => {
  const [isLoading, setIsLoading] = useState(false);

  const onSignup = async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    setIsLoading(true);

    try {
      const response = await api.auth.signup({
        ...data,
        fullName: data.name,
      });
      return response.data;
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
