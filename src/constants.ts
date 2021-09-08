export const ECOMMERCE_BANQ_refreshToken = '__ECOMMERCE_BANQ_refreshToken';

export enum IframeEvents {
  styles = 'styles',
  close = 'close',
  login = 'login',
  redirect = 'redirect',
  successPayment = 'successPayment',
  settings = 'settings',
}

export enum CheckoutEnvironment {
  development = 'development',
  integration = 'integration',
  sandbox = 'sandbox',
  production = 'production',
}

export interface CheckoutAction<P = unknown> {
  type: IframeEvents;
  payload: P;
}
