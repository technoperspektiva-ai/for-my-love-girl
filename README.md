# for-my-love-girl — v173 admin presets index fix

Cloudflare Workers / GitHub-ready bundle.

## Що виправлено

- Адмін-панель тепер читає HYM presets з основного KV index `hym:presets:index:v2`, а не тільки зі старих legacy ключів `hym:preset:*`.
- Вибір стандартного шаблону Phone / Tablet / Windows тепер перевіряє preset через той самий index, який використовує головна панель presets.
- Public endpoint `/api/hym-active-template` тепер також дістає активний preset з index, тому вибраний в адмінці шаблон реально застосовується на сайті.
- Версія health endpoint оновлена до `v173-admin-presets-index-fix`.

## Deploy

```bash
npm install
npm run check
npx wrangler deploy
```

KV binding вже вказаний у `wrangler.jsonc`:

```json
{
  "binding": "PRESETS_KV",
  "id": "31636d7d6b7444a1a7f2f22e0a2fa251"
}
```

Адмін-панель:

```text
https://<your-worker-domain>/hym-admin/<ADMIN_SECRET_KEY>
```
