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
