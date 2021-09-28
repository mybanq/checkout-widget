import {ECOMMERCE_BANQ_refreshToken, IframeEvents, WidgetFlow} from './constants';

export const createIframeQuery = (paymentLink: string, mode: WidgetFlow, name: string) => ({
  refreshToken: localStorage.getItem(ECOMMERCE_BANQ_refreshToken),
  settings: localStorage.getItem(IframeEvents.settings),
  origin: window.location.origin,
  windowWidth: window.innerWidth,
  windowHeight: window.innerHeight,
  appConfig: JSON.stringify({
    name,
    mode,
  }),
  paymentLink,
});
