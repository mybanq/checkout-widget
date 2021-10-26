import { ECOMMERCE_BANQ_refreshToken, IframeEvents, SignUpFlowType, WidgetFlow, WidgetTheme } from './constants';

export const createIframeQuery = ({
  paymentLink,
  mode,
  name,
  themeMode,
  signUpFlowType,
  tips,
}: {
  paymentLink: string;
  mode: WidgetFlow;
  name: string;
  themeMode?: WidgetTheme;
  signUpFlowType?:SignUpFlowType,
  tips: boolean
}) => ({
  refreshToken: localStorage.getItem(ECOMMERCE_BANQ_refreshToken),
  settings: localStorage.getItem(IframeEvents.settings),
  origin: window.location.origin,
  windowWidth: window.innerWidth,
  windowHeight: window.innerHeight,
  appConfig: JSON.stringify({
    name,
    mode,
    signUpFlowType,
    themeMode,
    tips,
  }),
  tips,
  paymentLink,
});
