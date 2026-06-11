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
