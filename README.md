# Overview

Our Checkout widget enables platforms to quickly process payments from cards, ACH, and banq user's balance by loading a javascript widget which contains the end to end payment flow.
The payment processed by the checkout widget is configured from a backend API call and funds are settled into the merchant's banq business account.
##Types of Payments
The Open API supports a flexible set payments including:

- One time real-time payments
- Recurring payments
- Scheduled payments

##Payment Sources
End users can make payments from their:

- banq balance
- checking account
- debit & credit cards (depending on the merchants industry)

#Installation
To install the stable version:

```
npm install --save @banq/checkout-widget
```

or using yarn:

```
yarn add @banq/checkout-widget
```

# Usage

Add this to starting point of your project such as: index.js or index.ts files

```ts
import '@banq/checkout-widget';
```

Create a `<checkout-widget-dialog/>` element with required attributes mentioned below.

```html
<checkout-widget-dialog
  open="true"
  mode="payment-flow"
  environment="sandbox"
  paymentLink="https://link.banq.com/qxU6gO79Ajb"
/>
```

###Attributes:

| name            | Required |                                                                                                                                                                                                                                        Description |
| --------------- | :------: | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| open            |          |                                                                                                                                                                                                                  Shows checkout widget when truthy |
| mode            |          | If you have some anticipated sales material, it's beneficial to allow your end-users to `pre-register` with banq and add payment methods before the sales material is available for purchase. Possible values: `payment-flow`, `pre-register-flow` |
| environment     |    ✔     |                                                                                                                                        Environment you want to use. If you want test widget use `sandbox`. Possible values: `sandbox`,`production` |
| paymentLink     |          |                                          Payment link required to enable payments. When mode:`pre-register` is set `paymentLink` attribute is not required. See [Generate Payment Link Docs](./docs/GENERATE_PAYMENT_LINK.md) for more information |

###Events:
| name            | Description |                                                                                                                                                                                                                                   
| --------------- | ------: | 
| close           | Fires after widget closes   |                                                                                                                                                                                                                
| paymentSuccess  | Fires when user creates payment |  

Create a `<pay-with-banq-button/>` element with required attributes mentioned below.

```html
<pay-with-banq-button
  disabled="false"
  loading="false"
  error="false"
  mode="payment-flow"
  name="Messi Drop"
/>
```

###Attributes:

| name            | Required |                                                                                                                                                                                                                                        Description |
| --------------- | :------: | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| disabled        |          | Disables pay with banq button                                                                                                                                                                                                                 Shows checkout widget when truthy |
| loading         |          | Shows loading indicator |
| error           |          | Shows error indicator   |
| mode            |          | If you have some anticipated sales material, it's beneficial to allow your end-users to pre-register with banq and add payment methods before the sales material is available for purchase. Possible values: payment-flow, pre-register-flow                                         Payment link required to enable payments. When mode:`pre-register` is set `paymentLink` attribute is not required. See [Generate Payment Link Docs](./docs/GENERATE_PAYMENT_LINK.md) for more information |
| name            |          | Widget placement name for analytics. Possible values: name of the drop  |

###Events:
| name            | Description |                                                                                                                                                                                                                                   
| --------------- | ------: | 
| click           | Fires on button click   |                                                                                                                                                                                                                

`<pay-with-banq-button>` extends all button events
