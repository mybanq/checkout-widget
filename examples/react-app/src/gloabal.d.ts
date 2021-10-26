declare global {
  interface Window {
    ecommerceBanqWidget: any;
  }
}

declare interface CheckoutWidgetDialogElement extends HTMLDivElement {}

interface PayWithBanqButtonAttributes extends React.HTMLAttributes<HTMLButtonElement> {
  class?: string;
  loading?: boolean;
  disabled?: boolean;
  error?: boolean;
  environment?: 'development' | 'integration' | 'sandbox' | 'production';
}

interface CheckoutWidgetDialogAttributes extends React.HTMLAttributes<CheckoutWidgetDialogElement> {
  ref?: RefObject<CheckoutWidgetDialogElement>;
  paymentLink?: string;
  open?: boolean;
  environment?: 'development' | 'integration' | 'sandbox' | 'production';
  theme?: 'light' | 'dark';
}

declare namespace JSX {
  interface IntrinsicElements {
    'checkout-widget-dialog': CheckoutWidgetDialogAttributes;
    'pay-with-banq-button': PayWithBanqButtonAttributes;
    'my-element': any;
  }
}

declare namespace global {
  interface HTMLElementTagNameMap {
    'checkout-widget-dialog': any;
    'pay-with-banq-button': any;
  }
}
