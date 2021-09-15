import {css, html, LitElement} from 'lit';
import clsx from 'clsx'
import {customElement, property} from 'lit/decorators.js';

@customElement('pay-with-banq-button')
export class PayWithBanqButtonElement extends LitElement {
  static styles = css`
    .pay-with-banq-button {
      position: relative;
      background: linear-gradient(90deg, #f82507 0%, #7622a9 69.27%, #7622a9 100%);
      min-height: 50px;
      min-width: 286px;
      border: none;
      border-radius: 3px;
      cursor: pointer;
      color: #fff;
      outline: none;
      font-size: 16px;
    }

    .pay-with-banq-button::after {
      content: 'banq';
      color: #7622a9;
      background-color: #fff;
      padding: 6px;
      margin-left: 6px;
      border-radius: 8px;
    }

    .pay-with-banq-button--loading {
      text-align: left;
    }

    .pay-with-banq-button--loading::after {
      content: '';
      background-color: transparent;
      position: absolute;
      width: 16px;
      height: 16px;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      border: 4px solid transparent;
      border-top-color: #ffffff;
      border-radius: 50%;
      animation: button-loading-spinner 1s ease infinite;
    }

    .pay-with-banq-button--loading > * {
      visibility: hidden;
      opacity: 0;
    }

    .pay-with-banq-button--disabled {
      opacity: 0.5;
    }

    @keyframes button-loading-spinner {
      from {
        transform: rotate(0turn);
      }

      to {
        transform: rotate(1turn);
      }
    }
  `;

  @property({type:String})
  class: string

  @property({type:Boolean})
  loading: boolean

  @property({type:Boolean})
  disabled: boolean

  @property({type:Boolean})
  error: boolean

  // for some reason open does not re-render on property change
  attributeChangedCallback(name: string, _old: string | null, value: string | null) {
    super.attributeChangedCallback(name, _old, value);
    if (name === 'disabled' && value === 'false') {
      this.disabled = false;
      this.requestUpdate();
    }

    if (name === 'loading' && value === 'false') {
      this.loading = false;
      this.requestUpdate();
    }

    if (name === 'error' && value === 'false') {
      this.error = false;
      this.requestUpdate();
    }
  }

  render() {
    const label = this.error ? 'Something went wrong' : 'Pay with'

    return html`<button ?disabled=${this.error || this.disabled} class='${clsx('pay-with-banq-button', {
      'pay-with-banq-button--loading': this.loading,
      'pay-with-banq-button--disabled': this.disabled,
    })}' type='button'>${label}</button> `;
  }
}
