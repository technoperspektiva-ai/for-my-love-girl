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


## Checkout URL configuration

Provider-issued checkout URLs are configured as Cloudflare Secrets instead of being embedded in public frontend JavaScript.

```bash
npx wrangler secret put PLAY_ID_CHECKOUT_URL
npx wrangler secret put CBC_CHECKOUT_URL
npx wrangler secret put KBC_CHECKOUT_URL
npx wrangler secret put REVOLUT_CHECKOUT_URL
npx wrangler secret put PAYSAFECARD_CHECKOUT_URL
npx wrangler secret put BANK_TRANSFER_CHECKOUT_URL
```

Provider checkout URLs may be short-lived. Replacing a secret updates the redirect destination without source-code changes. Permanent renewal requires the official provider API that creates a fresh checkout session.
