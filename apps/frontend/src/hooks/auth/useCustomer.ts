import { useQuery } from '@tanstack/react-query';
import * as api from '../../api';

export const useCustomer = () => {
  const { data } = useQuery({
    queryKey: ['customer'],
    queryFn: async () => {
      return api.identity.getCustomer();
    },
  })

  return { customer: data };
};
