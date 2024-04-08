import * as api from '../../api';
import { useBelvoWidget } from './belvo';
import { useMutation } from '@tanstack/react-query';

export const useConnectionLink = () => {
  const { mutateAsync: createConnection, isPending } = useMutation({
    mutationKey: ['createConnection'],
    mutationFn: api.banking.createConnection,
  });

  const { createWidget } = useBelvoWidget({
    onSuccess: async (link, institution) => {
      await createConnection({ linkId: link, institution });
    },
  });

  async function connectBanking() {
    createWidget();
  }

  return { connectBanking, isCreatingConnection: isPending };
};
