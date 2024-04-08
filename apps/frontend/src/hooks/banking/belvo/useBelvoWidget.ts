type OnSuccess = (linkId: string, institution: string) => void;

type ConnectionError = {
  code: BelvoErrorCode;
  message: string;
};

type Options = {
  onSuccess: OnSuccess;
  onError?: (errors: ConnectionError[]) => void;
};

export const useBelvoWidget = ({ onSuccess, onError }: Options) => {
  const createWidget = (accessToken: string) => {
    window.belvoSDK
      .createWidget(accessToken, {
        access_mode: 'recurrent',
        callback: onSuccess,
        onEvent: (data) => {
          console.log(`Belvo onEvent:`, data);
        },
        onExit: (data) => {
          console.log(`Belvo onExit:`, data);
          if (onError) {
          }
          const hasError = data.some((event) => event.last_encountered_error);
          if (hasError && onError) {
            onError(data.map((event) => event.last_encountered_error));
          }
        },
        locale: 'pt',
        country_codes: ['BR'],
      })
      .build();
  };

  return { createWidget };
};
