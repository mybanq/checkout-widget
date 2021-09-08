import {css, html, LitElement} from 'lit';
import qs from 'qs';
import {customElement, property, state} from 'lit/decorators.js';
import styleToCss from 'style-object-to-css-string';
import {createIframeQuery} from './createIframeQuery';
import {CheckoutAction, CheckoutEnvironment, IframeEvents, ECOMMERCE_BANQ_refreshToken} from './constants';

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
export class CheckoutWidgetDialogElement extends LitElement {
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

  connectedCallback() {
    super.connectedCallback();
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
      this.styles = action.payload as Record<string, string | number>;
    }

    if (action.type === IframeEvents.login) {
      const loginPayload = action.payload as LoginPostMessagePayload;
      if (!loginPayload.refreshToken) localStorage.removeItem(IframeEvents.settings);
      localStorage.setItem(ECOMMERCE_BANQ_refreshToken, (action.payload as LoginPostMessagePayload).refreshToken as string);
    }

    if (action?.type === IframeEvents.settings) {
      const payload = action.payload as string;
      localStorage.setItem(IframeEvents.settings, payload);
    }
  }

  render() {
    const source = environmentUrls[this.environment] + '?' + qs.stringify(createIframeQuery(this.paymentLink));

    return html`<iframe style="${styleToCss(this.styles)}" title="Banq Checkout Widget" src="${source}"></iframe> `;
  }
}
