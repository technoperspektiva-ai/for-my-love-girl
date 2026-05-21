# v36 full small telegram

Includes:
- Google Pay
- Google Sign-In with LOGGED IN status
- Telegram Login endpoint `/api/auth/telegram`
- Cashier Desk
- App Redirect Checks
- YouTube + audio asset
- Amazon Pay test checkout
- User-Agent only
- Text / Photo / Clicker

Cloudflare env:
- GOOGLE_CLIENT_ID
- TELEGRAM_BOT_TOKEN

Important:
src/index.js must be small, not 5MB.
If Cloudflare says src/index.js 5259 KiB, your repo still has old file.
