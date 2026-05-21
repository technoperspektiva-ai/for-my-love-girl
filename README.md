# v39 file config fallbacks

This build adds Google Client ID directly into files.

## Included in files

`GOOGLE_CLIENT_ID` is set in:

- `src/index.js` fallback
- `wrangler.jsonc` vars

```txt
221396849433-0f5ktd8ao72kf7qvrgi7sk7v9lpn698o.apps.googleusercontent.com
```

## Telegram

Telegram auth still needs the real bot token from @BotFather for `@wwg_adaptive_bot`.

Add it in Cloudflare env/secret:

```env
TELEGRAM_BOT_TOKEN=your_bot_token
```

Or, if you intentionally want to hardcode it, paste it in `src/index.js`:

```js
const DEFAULT_TELEGRAM_BOT_TOKEN = "";
```

## Stripe

Stripe secret cannot be safely committed to GitHub. Add it as Cloudflare secret:

```env
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

## Debug

Open:

```txt
/api/debug/env
```

Google should now show true even without Cloudflare env. Telegram will be true only after adding token.
