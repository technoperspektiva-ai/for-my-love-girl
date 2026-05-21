# WWG QA Team

Version: `v25-size-fixed-assets`

## Fix Cloudflare 3 MiB limit

Попередня версія впала, бо MP3 був вбудований у `src/index.js` як base64.
Через це Worker став більшим за 3 MiB.

У цій версії:

- `src/index.js` маленький
- аудіо лежить окремо: `public/audio.mp3`
- `wrangler.jsonc` має assets config:
  ```json
  "assets": {
    "directory": "./public",
    "binding": "ASSETS"
  }
  ```
- audio player використовує:
  ```html
  /audio.mp3
  ```

## Google Sign-In

Щоб увійти у свій Google акаунт, треба задати:

```env
GOOGLE_CLIENT_ID=your_client_id.apps.googleusercontent.com
```

## Перевірка

```bash
npm install
npm run check
npm run deploy
```
