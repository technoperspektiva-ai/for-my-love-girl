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


## v76 Stripe buttons-only mode
- Stripe section shows only the real Express Checkout field.
- Removed controls, statuses, setup text and fallback card form.
- Accepts matching `pk_test_` + `sk_test_` or `pk_live_` + `sk_live_` keys from Cloudflare Secrets.
- Live mode can create real charges. Keep keys in Cloudflare Secrets only.

## v77 minimal UI cleanup
Removed the hero panel and explanatory text blocks below Payments, Support Chat and Offers. Functional buttons and Stripe Express Checkout remain unchanged.

## v78 Stable Beta 2.0 badge
- Replaces the technical header build label with `Stable "Beta 2.0"`.
- Animates the `Beta 2.0` text with a pulsing moving gradient.


## v79 Temporary mail (Mail.gw)

Adds a full-width `Тимчасова пошта` UI block. The Worker proxies the documented Mail.gw API and supports:

- create a temporary mailbox;
- copy its address;
- replace or delete the mailbox;
- refresh inbox messages;
- open a message as sanitized plain text;
- show verification codes returned by Mail.gw.

Mailbox bearer tokens are stored only in browser `sessionStorage` for the current tab. The frontend polls at most once per 15 seconds while visible. Use only for authorized QA testing.


## v80 Temporary mail fix

- Replaced failing Mail.gw Worker proxy flow with direct browser requests to the documented Mail.tm API.
- Mailbox token remains only in sessionStorage for the current browser tab.
- Added visible `Powered by mail.tm` attribution link as required by Mail.tm terms.
- No Cloudflare secret is required for temporary email.


## v81 Collapsible temporary mail block

The `Тимчасова пошта` section is now collapsed by default and expands when the section header is clicked. All existing Mail.tm actions remain unchanged.


## v82 temporary mail domain fallback
- Prefer a Mail.tm domain with `isActive === true`.
- If Mail.tm returns domains without an active flag, use the first valid returned domain.
- Retry `/domains?page=1`, `/domains?page=2`, `/domains?page=3`, then `/domains`.


## v83 temp mail saved mailboxes
- Removed persistent active-address and inbox-count text under the mailbox toolbar.
- Keeps Mail.tm attribution as a subtle visible footer link to comply with the Mail.tm API terms.
- Adds browser-local saved mailboxes with Save, Open, and Delete actions.
- Saves generated credentials only in localStorage on the current browser so a mailbox can be reopened later.

## v84 Calm temp-mail inbox

- Adds a nested collapsible `Вхідні листи` section inside `Тимчасова пошта`.
- Reduces auto-refresh polling from 15 seconds to 30 seconds.
- Auto-refresh runs only while the outer temporary-mail panel and the nested inbox panel are both open and the page is visible.
- Avoids repainting the inbox list when message IDs and metadata have not changed.
- Keeps manual `Оновити листи` available and shows the last successful check time or API error.
- Fixes the initial refresh after creating a mailbox so it is not skipped while the create flow is marked busy.

