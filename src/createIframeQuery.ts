import {ECOMMERCE_BANQ_refreshToken, IframeEvents, WidgetFlow, WidgetThemeMode} from './constants';

export const createIframeQuery = ({
  paymentLink,
  mode,
  name,
  themeMode,
}: {
  paymentLink: string;
  mode: WidgetFlow;
  name: string;
  themeMode?: WidgetThemeMode;
}) => ({
  refreshToken: localStorage.getItem(ECOMMERCE_BANQ_refreshToken),
  settings: localStorage.getItem(IframeEvents.settings),
  origin: window.location.origin,
  windowWidth: window.innerWidth,
  windowHeight: window.innerHeight,
  appConfig: JSON.stringify({
    name,
    mode,
    themeMode,
  }),
  paymentLink,
});
