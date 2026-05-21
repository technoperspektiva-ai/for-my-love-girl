# v42 Telegram file token priority

Fix for Telegram `hash mismatch` when Cloudflare Dashboard has an old/wrong TELEGRAM_BOT_TOKEN.

Changes:
- Telegram widget is explicitly `wwg_adaptive_bot`.
- Telegram auth uses file fallback token first.
- Cloudflare env token is used only if file fallback is empty.
- `/api/debug/env` now shows:
  - `telegramTokenSource`
  - `telegramBotUsername`

Expected debug:
```json
{
  "hasTelegramBotToken": true,
  "telegramTokenSource": "file-fallback",
  "telegramBotUsername": "wwg_adaptive_bot"
}
```

Security note:
Token is embedded because requested. Long-term, rotate it and use Cloudflare Secret only.
