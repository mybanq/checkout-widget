#Dynamic Integration
The dynamic payments integration allows you to pass in dynamic payment information (amounts, frequencies, etc) into the Checkout widget and is best for applications like e-commerce where end users are purchasing variable amounts and the integrator is maintaining some sort or cart and order system.

This integration has three pieces:
1. A backend integration with banq's [Open API for Inbound Payments](https://developers.banq.com/docs/inbound-payments-overview) to create the specific payment that needs to be processed.
1. Subscribing to our web hooks to receive notifications that the payment succeeded.
1. A front end integration of the Checkout widget for the end to end flow the end user can use to pay.
Contact Banq Team to obtain YOUR-CLIENT-ID, YOUR-CLIENT-USERNAME/PASSWORD

![Overview](docs/overview.png)


> ###### Intermediary Endpoint
> Note that while it's technically possible to call banq's Open API directly from the widget, we highly recommend creating an intermediary endpoint on your backend so that you can pass in fields like Order Id, Customer Id, etc from the widget to your backend and then use your backend to configure the payment and return it to the widget.
>
> This is the specific integration that's described in the example below.

## Generate Payment Link
Contact Banq Team to obtain `YOUR-CLIENT-ID`, `YOUR-CLIENT-USERNAME/PASSWORD`

1. From your Backend, make a POST request to `https://banq-staging.auth0.com/oauth/token`. This will generate an access token that will be needed for `/payments/get-paid-link` requests.

```json
// POST https://banq-staging.auth0.com/oauth/token
{
    "client_id":"YOUR-CLIENT-ID",
    "client_username":"YOUR-CLIENT-USERNAME",
    "client_password":"YOUR-CLIENT-PASSWORD",
    "audience":"https://banq.com/open/api/",
    "grant_type":"password"
}
```

2. To generate payment link.  See BANQ API [Docs Swagger](https://sandbox.banq.com/core/index.html). Make a request POST `https://sandbox.banq.com/api/v1/payments/get-paid-link`. With access token obtained from */auth/token* request

```json
// Request params to https://sandbox.banq.com/api/v1/payments/get-paid-link
// Headers: Authorization, X-Company-Id
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
}
```
4. Find banq guid **MERCHANT-BANQ-GUID** of account you want to use as destination Banq Account

5. And add this **MERCHANT-BANQ-GUID** to step 2 `https://sandbox.banq.com/api/v1/payments/get-paid-link`

![Get Payment Link Diagram](docs/get_payment_link_diagram.png)

## Subscribing to Webhooks
1. You need to create an endpoint that will receive POST `https://PATH-TO-YOUR-WEBSITE/your-web-hooks/payment-status` With a webHook event as Stream.

2. Convert webhook event steam to JSON. And if `action == completed` and `resourceType == Payment` make GET request to  `https://sandbox.banq.com/api/v1/payments/${resourceId}`,  `resourceId` - from webHook event, 
```json
// GET https://sandbox.banq.com/api/v1/payments/${resourceId}
// Headers: Authorization, X-Company-Id
```
3. Obtain ACCOUNT-SPACE-ID. Make a GET request in [Swagger](https://sandbox.banq.com/core/index.html)  `https://sandbox.banq.com/api/v1/users/me?include=accountSpaces,banqAccounts`. With access token obtained from /auth/token request below

```json
// POST https://banq-staging.auth0.com/oauth/token
{
	audience: 'https://banq.com/api',
	scope: 'offline_access',
	client_id: 'kFLEhEsxxBWCf0X19hAIjbzYaSyn2cim', // This should always be static. This is client ID of BANQ API
	grant_type: 'password',
	username: '<YOUR_MERCHANT_USER_CREDENTIALS@mail.com>',
	password: '<YOUR_MERCHANT_PASSWORD>'
} 
```

Find your merchant banq and find a property `accountSpaceId`

4. Register your endpoint using POST to `https://sandbox.banq.com/api/v1/account-spaces/ACCOUNT-SPACE-ID/webhook-config`
```json
// POST https://sandbox.banq.com/api/v1/account-spaces/ACCOUNT-SPACE-ID/webhook-config
// Headers: Authorization, X-Company-Id
{
   url: 'https://PATH-TO-YOUR-WEBSITE/your-web-hooks/payment-status',
   enabled: true,
   retryCount: 5,
   webHookTypes: ['payment', 'transaction'],
}
```
