import {ECOMMERCE_BANQ_refreshToken, IframeEvents} from './constants';
import {WidgetFlow} from "./CheckoutWidget";

export const createIframeQuery = (paymentLink: string, mode: WidgetFlow) => ({
  refreshToken: localStorage.getItem(ECOMMERCE_BANQ_refreshToken),
  settings: localStorage.getItem(IframeEvents.settings),
  origin: window.location.origin,
  windowWidth: window.innerWidth,
  windowHeight: window.innerHeight,
  appConfig: JSON.stringify({
    mode,
  }),
  paymentLink
});
