# v63 Telegram Unicode session fix

Fixes Telegram Login callback crashes for names containing Cyrillic or other Unicode characters.

Changes:
- Keeps Telegram HMAC `dataCheckString` joined with a real newline (`"\\n"`).
- Encodes the Telegram session cookie using UTF-8-safe Base64URL instead of plain `btoa(JSON.stringify(...))`.
- Returns a readable HTTP 500 response if session encoding fails instead of throwing an unhandled Worker exception.
- Keeps fresh Skrill SID generation on every `/api/skrill/checkout` request.


## v64 Telegram session UI logout

- Reads the signed HttpOnly Telegram session through `/api/auth/telegram/session`.
- Hides the Telegram login widget while a valid session is active.
- Shows Telegram profile and `Вийти з Telegram` button.
- Clears the session through `/api/auth/telegram/logout`.


## v67 checkout fallbacks restored
Payment redirects use Cloudflare Secrets when configured and embedded fallback URLs otherwise. Skrill still creates a fresh SID on every click.

## v70 Paysafecard fresh Skrill session
The Paysafecard button now calls `/api/payment-redirect/paysafecard`.
The Worker creates a fresh Skrill Quick Checkout SID on every click and requests `payment_methods=PSC`.
Optional secret: `SKRILL_PAY_FROM_EMAIL` for straight-through redirect support.

## v71 Stripe Express Checkout inline QA section

- Adds a `Stripe тестові платіжки` card directly to the main Worker page.
- Uses Stripe Express Checkout Element for eligible Link, Google Pay, Klarna, Amazon Pay and other sandbox buttons.
- Includes a fallback Stripe Payment Element form.
- Creates a new USD 1.00 PaymentIntent through `/api/stripe/create-payment-intent`.
- Exposes the test publishable key through `/api/stripe/config`.
- Rejects Stripe live keys: only `pk_test_...` and `sk_test_...` values are accepted.

Configure Stripe test keys before testing:

```bash
npx wrangler secret put STRIPE_PUBLISHABLE_KEY
npx wrangler secret put STRIPE_SECRET_KEY
npx wrangler deploy
```



## v72 Stripe preview + live mode
- Shows Stripe Docs-style preview buttons immediately, even before Stripe keys are configured.
- Real Express Checkout replaces the preview after `pk_test_` / `sk_test_` are configured and Stripe reports availability.
- Preview buttons are explicitly non-functional and only demonstrate layout.


## v73 Stripe real sandbox only

The Stripe section renders only the real Stripe Express Checkout Element. Fake preview buttons were removed.

```bash
npx wrangler secret put STRIPE_PUBLISHABLE_KEY
npx wrangler secret put STRIPE_SECRET_KEY
npx wrangler deploy
```

Use Stripe Sandbox keys only: `pk_test_...` and `sk_test_...`. Register the Worker domain in Stripe Dashboard → Payment method domains for the sandbox.


## v75 cleanup
- Removed Stripe fallback Payment Element card form.
- Removed Paysafecard and Bank Transfer buttons from Cashier Desk.
- Kept real Stripe Express Checkout sandbox integration.
