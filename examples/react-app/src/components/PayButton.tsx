import React, {useState} from 'react';
import {CheckoutWidgetDialog, PayWithBanqButton} from './banq-checkout-widget';

export const PayButton = () => {
  const [isOpen, setOpen] = useState<boolean>();

  return (
    <>
      <PayWithBanqButton disabled={isOpen} onClick={() => setOpen(true)} />
      <CheckoutWidgetDialog
        isOpen={isOpen}
        paymentLink="https://link.banq.com/qxU6gO79Ajb"
        environment="sandbox"
        onClose={() => setOpen(false)}
        onPaymentSuccess={() => setOpen(false)}
      />
    </>
  );
};
