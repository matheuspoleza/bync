import * as api from "../../../api";
import { useScript } from "../../utils/useScript";

declare global {
  interface Window {
    belvoSDK: any;
  }
}

export const useBelvoWidget = ({
  onSuccess,
  onExit,
  onPageLoad,
}: {
  onSuccess: (data: { link: string; institution: string }) => void;
  onExit?: () => void;
  onPageLoad?: () => void;
}) => {
  const widgetCallback = (access: string) => async () => {
    const successCallbackFunction = async (
      link: string,
      institution: string,
    ) => {
      onSuccess({ link, institution });
    };
    const config = {
      callback: (link: any, institution: any) =>
        successCallbackFunction(link, institution),
      onExit,
      onEvent: ({ eventName }: any) => {
        if (eventName === "PAGE_LOAD") {
          onPageLoad?.();
        }
      },
      locale: "pt",
      country_codes: ["BR"],
    };

    window.belvoSDK.createWidget(access, config).build();
  };

  const { loadScript } = useScript(
    "https://cdn.belvo.io/belvo-widget-1-stable.js",
  );

  const createWidget = async () => {
    const { data } = await api.belvo.createSession();

    loadScript(widgetCallback(data.access));
  };

  return { createWidget };
};
