# PRESETS_KV already connected

This build already includes the Workers KV binding:

```json
"kv_namespaces": [
  {
    "binding": "PRESETS_KV",
    "id": "31636d7d6b7444a1a7f2f22e0a2fa251"
  }
]
```

Deploy normally:

```bash
npm install
npx wrangler deploy
```

Server preset creation and deletion still require an active Telegram login on the site.


## v130
- Compact Mood status block: only emoji + select, based on stable v128 with chat support restored.
