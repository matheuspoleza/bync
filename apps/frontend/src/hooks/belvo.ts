import { useScript } from './scripts';

declare global {
  interface Window {
    belvoSDK: any;
  }
}

export const createBankingSession = () => {
  return fetch('http://localhost:3000/banking/session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.error('Error:', error));
};

export const useBelvo = () => {
  const widgetCallback = async () => {
    const callback = () => {};
    const successCallbackFunction = (link: any, institution: any) => {
      // Do something with the link and institution,
      // such as associate it with your registered user in your database.
      console.log({ link, institution });
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
      // Add your startup configuration here.

      callback: (link: any, institution: any) =>
        successCallbackFunction(link, institution),
      onExit: (data: any) => onExitCallbackFunction(data),
      onEvent: (data: any) => onEventCallbackFunction(data),
    };

    const { access } = await createBankingSession();

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
