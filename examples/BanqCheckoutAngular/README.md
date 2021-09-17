# BanqCheckoutAngular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


# Integration with the banq-checkout custom element using Angular 

You can integrate your app with a banq-checkout in a few simple steps. For this banq provides custom element <checkout-widget-dialog /> .For more details about custom elements, you can visit

First of all, you need o install banq-checkout. For this purpose, you can use npm

npm install @banq/checkout-widget

or yarn

yarn add @banq/checkout-widget

#### **!!! Important !!!**

To work with custom elements in angular, you need to do a couple of simple steps.

For your custom element to work on all browsers, you’ll have to include the polyfills for it. The simplest way is to include webcomponentsjs into your project:

```$ yarn add @webcomponents/webcomponentsjs```

or, using npm:
```$ npm install @webcomponents/webcomponentsjs```

Then the only Angular-specific step we need to take to make Angular play well with Web Components is to add the CUSTOM_ELEMENTS_SCHEMA to our app module. Here you’ll see that we’re also importing our custom element:

Example

```
// app.module.ts
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import  "@banq/checkout-widget";

@NgModule({
declarations: [
AppComponent
],
schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
imports: [
BrowserModule,
AppRoutingModule
],
providers: [],
bootstrap: [AppComponent]
})
export class AppModule { }
```

for more details about using custom elements in Angular, you can visit

Now you are ready o use the banq checkout widget.

`<checkout-widget-dialog/>`   takes 4 arguments 

`open<Boolean>` - says when it should be open

`environment<String>` - says which environment it should use

`paymentLink<String>` - get payment link, detailed instruction can be found below

`mode<String>` -available modes: payment-flow | pre-register-flow

`<checkout-widget-dialog/>`   returns 2 events

`close `- will be triggered on close

`paymentSuccess` - will be triggered after success payment

Example of integration

app.component.html

        <checkout-widget-dialog
          [open]="isBanqWidgetOpen"
          [environment]="getEnv()"
          [paymentLink]="getPaymentLink()"
          [mode]='"pre-register-flow"'
          (close)="closeBanqWidget()"
          (paymentSuccess)="onPaymentSuccess()"
        >
        </checkout-widget-dialog>

        <button class="banqButton"  (click)="openBanqWidget()">Pay with Banq</button>


app.component.ts

```export class AppComponent {
isBanqWidgetOpen: boolean;

constructor() {
this.isBanqWidgetOpen = false;
}

openBanqWidget() {
this.isBanqWidgetOpen = true
}

closeBanqWidget() {
this.isBanqWidgetOpen = false
}

getPaymentLink() {
return 'https://link.banq.com/xM1CV6e3Eib'
}

getEnv() {
return 'development'
}

onPaymentSuccess() {
alert('success')
}

}
```

#Generate Payment Link

Using the mobile app (Static link generation)

Pay Button

Open Banq App.

Tap the Pay button with a dollar sign.

Select the “Get Paid” option

Select business banq account

Tap “Request Money With a Link”

Enter the amount of money you want to charge from your customer

Copy generated link. And replace `<YOUR-PAYMENT-LINK>` with your link

Dynamic Link Integration

You’ll need this type of integration if you run a store, for example, and you need to charge different amounts of money for each product. Then you will have to generate a payment link on the fly.

Place the “pay with banq” button anywhere on your page.

```
<script src="https://sandbox.banq.com/widget/ecommerce.js"></script>
<div id="pay-with-banq"></div>
```

Copy embedded code to your website that will obtain a payment link from your backend.

	<script>
	const app = new window.ecommerceBanqWidget({
		selector: '#pay-with-banq',
		getPaymentInfo: () => {
			return Promise.resolve(<YOUR-PAYMENT-LINK>) // Should return payment link
		},
		onPopUpClose: () => {
			console.log('pop up is closed');
		},
		onPaymentSuccess: () => {
			// If payment was handled by Mobile App onPaymentSuccess won't be triggered. Has to be implemented separatly.
			// See Pay with QR Code Integration section below
			console.log('this triggers after payment completed successfully');
		}
	});
	app.bootstrapApp();
	</script>

Generate Payment Link

Contact Banq Team to obtain `YOUR-CLIENT-ID`, YOUR-OPEN-API-USERNAME, `YOUR-OPEN-API-PASSWORD`.

From your Backend, make a POST request to ` https://banq-staging.auth0.com/oauth/token.` This will generate an access token that will be needed for /payments/get-paid-link requests.

// POST https://banq-staging.auth0.com/oauth/token
`{
"client_id":"YOUR-CLIENT-ID",
"username":"YOUR-OPEN-API-USERNAME",
"password":"YOUR-OPEN-API-PASSWORD",
"audience":"https://banq.com/open/api/",
"grant_type":"password"
}
`
To generate payment link. See BANQ API Docs

https://sandbox.banq.com/api/index.html. Make a request POST https://sandbox.banq.com/api/v1/payments/get-paid-link. With access token obtained from /auth/token request above

`// POST https://banq-staging.auth0.com/oauth/token
// Headers: Authorization
{
"destination": {
"banqGuid": "<MERCHANT-BANQ-GUID>"// Destination Banq Acccount guid.
},
"comment": "string", // Shows in the Banq App on payment screen (example: Title of your product)
"funds": 100, // Amount of money you want to charge
"externalOrderCode": "<YOUR-ORDER-ID>", // This is orderId from your database
"frequency": "once", // Check BANQ API Docs for recurrent payment options
"startDate": "2021-06-15", // You don't need to specify startDate
"endDate": "2021-06-15" // or endDate if payment is not recurrent
}`

Obtain a BANQ account guid(

`<MERCHANT-BANQ-GUID>`). Make a GET request in Swagger https://sandbox.banq.com/api/v1/users/me?include=accountSpaces,banqAccounts. With access token obtained from /auth/token request below

`// POST https://banq-staging.auth0.com/oauth/token
{
audience: 'https://banq.com/api',
scope: 'offline_access',
client_id: 'kFLEhEsxxBWCf0X19hAIjbzYaSyn2cim', // This should always be static. This is client ID of BANQ API
grant_type: 'password',
username: '<YOUR_MERCHANT_USER_CREDENTIALS@mail.com>',
password: '<YOUR_MERCHANT_PASSWORD>'
};`

Find banq guid -

`MERCHANT-BANQ-GUID` of account you want to use as destination Banq Account

And add this

`MERCHANT-BANQ-GUID` to step 2 (https://sandbox.banq.com/api/v1/payments/get-paid-link )

