# WWG QA Team

Version: `v28-google-clientid-safe`

## Fix Google error: Missing required parameter client_id

У попередній версії Google кнопка могла рендеритись із пустим:

```html
data-client_id=""
```

Через це Google показував:

```txt
Missing required parameter: client_id
```

У v28 Google Sign-In рендериться тільки якщо `GOOGLE_CLIENT_ID` заданий і схожий на:

```txt
xxxx.apps.googleusercontent.com
```

## Що треба зробити

У Cloudflare додай env variable:

```env
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
```

У Google Cloud Console додай Authorized JavaScript origin:

```txt
https://for-my-love-girl.black-sci-official.workers.dev
```

Якщо маєш кастомний домен — додай і його теж.

## Deploy

```bash
npm install
npm run check
npm run deploy
```
