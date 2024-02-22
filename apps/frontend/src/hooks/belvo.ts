import { createBankLinkSession } from '../clients/api';
import { useScript } from './scripts';

declare global {
  interface Window {
    belvoSDK: any;
  }
}

export const useBelvo = ({
  onSuccess,
}: {
  onSuccess: (data: { link: string; institution: string }) => void;
}) => {
  const widgetCallback = async () => {
    const successCallbackFunction = async (
      link: string,
      institution: string
    ) => {
      onSuccess({ link, institution });
    };
    const onExitCallbackFunction = (data: any) => {
      // Do something with the exit data.
      console.log({ data });
    };
    const onEventCallbackFunction = (data: any) => {
      // Do something with the exit data.
      console.log({ data });
    };
    const config = {
      callback: (link: any, institution: any) =>
        successCallbackFunction(link, institution),
      onExit: (data: any) => onExitCallbackFunction(data),
      onEvent: (data: any) => onEventCallbackFunction(data),
      locale: 'pt',
      country_codes: ['BR'],
    };

    const { access } = await createBankLinkSession();

    window.belvoSDK.createWidget(access, config).build();
  };

  const { loadScript } = useScript(
    'https://cdn.belvo.io/belvo-widget-1-stable.js'
  );

  const createWidget = () => {
    loadScript(widgetCallback);
  };

  return { createWidget };
};
