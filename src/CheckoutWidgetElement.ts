import {css, html, LitElement} from 'lit';
import qs from 'qs';
import {customElement, property, query, state} from 'lit/decorators.js';
import {createIframeQuery} from './createIframeQuery';
import {
  CheckoutAction,
  CheckoutEnvironment,
  IframeEvents,
  ECOMMERCE_BANQ_refreshToken,
  WidgetFlow,
  ECOMMERCE_BANQ_settings,
} from './constants';
import {appendStyle} from './utils';

export type LoginPostMessagePayload = {
  refreshToken: string;
};

const environmentUrls = {
  development: 'https://aks-banq-dev-01.eastus.cloudapp.azure.com/widget',
  integration: 'https://aks-banq-int-01.eastus.cloudapp.azure.com/widget',
  sandbox: 'https://aks-banq-stage-01.eastus.cloudapp.azure.com/widget',
  production: 'https://aks-banq-prod-01.eastus.cloudapp.azure.com/widget',
};

@customElement('checkout-widget')
export class CheckoutWidgetElement extends LitElement {
  static styles = css`
    iframe {
      border: none;
    }
  `;
  @state()
  styles: Record<string, string | number> = {
    width: '841px',
    height: '494px',
    border: 'none',
  };

  @property()
  environment: CheckoutEnvironment = CheckoutEnvironment.sandbox;

  @property()
  paymentLink: string;

  @property()
  mode: WidgetFlow = WidgetFlow.PaymentFlow;

  @property()
  name: string;

  connectedCallback() {
    super.connectedCallback();
    if (this.mode === WidgetFlow.PaymentFlow && !this.paymentLink)
      throw new Error("paymentLink is required attribute in 'payment-flow' mode");

    window.addEventListener('message', (event) => this.handleMessage(event));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('message', this.handleMessage);
  }

  handleMessage(event: MessageEvent<CheckoutAction>) {
    const action = event.data;
    this.dispatchEvent(new CustomEvent(action.type, {detail: event.data, bubbles: true, composed: true}));

    if (action.type === IframeEvents.styles) {
      appendStyle(this.iframe, action.payload as Record<string, string>);
    }

    if (action.type === IframeEvents.login) {
      const loginPayload = action.payload as LoginPostMessagePayload;
      if (!loginPayload.refreshToken) {
        localStorage.removeItem(IframeEvents.settings);
        localStorage.removeItem(ECOMMERCE_BANQ_refreshToken);
        this.dispatchEvent(new CustomEvent('close', {detail: event.data, bubbles: true, composed: true}));
        this.requestUpdate();
      } else {
        localStorage.setItem(ECOMMERCE_BANQ_refreshToken, (action.payload as LoginPostMessagePayload).refreshToken);
      }
    }

    if (action?.type === IframeEvents.settings) {
      const payload = action.payload as string;
      localStorage.setItem(ECOMMERCE_BANQ_settings, payload);
    }

    if (action?.type === IframeEvents.close) {
      localStorage.removeItem(ECOMMERCE_BANQ_refreshToken);
      this.requestUpdate();
    }
  }

  @query('#checkout-iframe')
  iframe!: HTMLIFrameElement;

  render() {
    const query = createIframeQuery(this.paymentLink, this.mode, this.name);
    const source = environmentUrls[this.environment] + '?' + qs.stringify(query);
    return html`<iframe id="checkout-iframe" title="Banq Checkout Widget" src="${source}"></iframe> `;
  }
}
