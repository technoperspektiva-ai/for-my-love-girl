# Optional server presets (Cloudflare Workers KV)

Local presets work immediately and remain in the current browser only.
To enable shared server presets, create and bind a Workers KV namespace.

## 1. Create namespace

```bash
npx wrangler kv namespace create PRESETS_KV
```

Wrangler returns a generated namespace ID.

## 2. Add the binding to `wrangler.jsonc`

Add this top-level property next to `assets` and `vars`:

```jsonc
"kv_namespaces": [
  {
    "binding": "PRESETS_KV",
    "id": "PASTE_GENERATED_NAMESPACE_ID_HERE"
  }
]
```

## 3. Deploy

```bash
npx wrangler deploy
```

Reading server presets is public. Creating and deleting server presets requires an active Telegram login on the dashboard.
