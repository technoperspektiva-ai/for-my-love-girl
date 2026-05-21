# WWG QA Team

Version: `v24-google-signin-fixed`

## Google Sign-In fixed

Виправлено Google Sign-In під офіційний Google Identity Services:

```html
<script src="https://accounts.google.com/gsi/client" async defer></script>
```

Додано:

- `g_id_onload`
- `g_id_signin`
- `handleCredentialResponse(response)`
- JWT decode
- показ:
  - name
  - email
  - avatar

## Cloudflare env

Щоб кнопка працювала, треба задати:

```env
GOOGLE_CLIENT_ID=your_client_id.apps.googleusercontent.com
```

У Google Cloud Console додай Authorized JavaScript origin:

```txt
https://for-my-love-girl.black-sci-official.workers.dev
```

## Перевірка

```bash
npm install
npm run check
npm run deploy
```
