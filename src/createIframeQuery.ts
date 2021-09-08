import {ECOMMERCE_BANQ_refreshToken, IframeEvents} from './constants';

export const createIframeQuery = (paymentLink: string) => ({
  refreshToken: localStorage.getItem(ECOMMERCE_BANQ_refreshToken),
  settings: localStorage.getItem(IframeEvents.settings),
  origin: window.location.origin,
  windowWidth: window.innerWidth,
  windowHeight: window.innerHeight,
  paymentLink
});
