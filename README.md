# v43 Telegram getMe debug

Adds endpoint:

```txt
/api/debug/telegram-bot
```

It calls Telegram Bot API `getMe` server-side and returns:
- configured widget username
- actual bot username from token
- whether they match

Expected for working login:

```json
{
  "ok": true,
  "configuredWidgetUsername": "wwg_adaptive_bot",
  "actualBotUsernameFromToken": "wwg_adaptive_bot",
  "matchesWidget": true
}
```

If `matchesWidget` is false, the token belongs to another bot.
