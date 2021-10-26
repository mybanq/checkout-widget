import React, {useCallback, useRef} from 'react';
import {useEventEffect} from './hooks';

export enum CheckoutEnvironment {
  development = 'development',
  integration = 'integration',
  sandbox = 'sandbox',
  production = 'production',
}

export enum CheckoutThemeMode {
  Light = 'light',
  Dark = 'dark',
}

interface Props {
  isOpen?: boolean;
  paymentLink: string;
  environment: keyof typeof CheckoutEnvironment;
  onClose?: () => void;
  onPaymentSuccess?: () => void;
  theme?: CheckoutThemeMode;
}

export const CheckoutWidgetDialog = ({
  isOpen,
  environment,
  onClose,
  paymentLink,
  onPaymentSuccess,
  theme,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => onClose?.(), [onClose]);

  const handlePaymentSuccess = useCallback(() => onPaymentSuccess?.(), [onPaymentSuccess]);

  useEventEffect(ref, 'close', handleClose);

  useEventEffect(ref, 'paymentSuccess', handlePaymentSuccess);

  return (
    <checkout-widget-dialog
      ref={ref}
      open={isOpen}
      environment={environment}
      paymentLink={paymentLink}
      theme={theme}
    />
  );
};
