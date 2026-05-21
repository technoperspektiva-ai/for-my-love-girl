# v38 Stripe Express Checkout Amazon Pay

Old Amazon test modal has been replaced with Stripe Express Checkout Element.

## Required Cloudflare env

```env
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_AMOUNT=1099
STRIPE_CURRENCY=usd
```

Existing:

```env
GOOGLE_CLIENT_ID=221396849433-0f5ktd8ao72kf7qvrgi7sk7v9lpn698o.apps.googleusercontent.com
TELEGRAM_BOT_TOKEN=...
```

## Stripe Dashboard

- Enable Amazon Pay in Payment methods.
- Register your domain in Payment method domains.
- Use HTTPS.
- Use test keys for test mode.

## Worker endpoint

```txt
POST /create-intent
```

Creates a Stripe PaymentIntent with:

```txt
payment_method_types[]=amazon_pay
```
