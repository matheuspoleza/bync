import { useState } from "react";
import * as api from "../../api";
import { useBelvoWidget } from "../belvo/useBelvoWidget";

export const useConnectionLink = () => {
  const [isCreatingConnection, setIsCreatingConnection] = useState(false);

  const { createWidget } = useBelvoWidget({
    onSuccess: async ({ link, institution }) => {
      if (isCreatingConnection) return;
      setIsCreatingConnection(true);
      try {
        await api.banking.createConnection({ linkId: link, institution });

        await api.queryClient.refetchQueries({
          queryKey: ["bank-accounts"],
          exact: true,
        });
      } finally {
        setIsCreatingConnection(false);
      }
    },
  });

  return { connect: createWidget, isCreatingConnection };
};
