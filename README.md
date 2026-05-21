# v41 Telegram token fallback

Changes:
- Telegram bot token is embedded as Worker fallback.
- Telegram auth uses env TELEGRAM_BOT_TOKEN if present, otherwise fallback token in code.
- Amazon is removed.
- Text + Photo is moved up.
- Clicker is removed.
- keep_vars is enabled in wrangler.jsonc.

Security note:
The bot token was embedded because requested. Long-term, rotate the token in BotFather and store it as Cloudflare Secret instead.
