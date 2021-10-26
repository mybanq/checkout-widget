import React, { useState } from 'react';
import { CheckoutThemeMode, CheckoutWidgetDialog, PayWithBanqButton } from './banq-checkout-widget';

export const PayButton = () => {
  const [isOpen, setOpen] = useState<boolean>();

  return (
    <>
      <PayWithBanqButton disabled={isOpen} onClick={() => setOpen(true)} />
      <CheckoutWidgetDialog
        isOpen={isOpen}
        theme={CheckoutThemeMode.Light}
        paymentLink="https://link.banq.com/4x1t09WiOjb"
        environment="sandbox"
        onClose={() => setOpen(false)}
        onPaymentSuccess={() => setOpen(false)}
      />
    </>
  );
};
