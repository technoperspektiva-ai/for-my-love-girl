# WWG QA Team Redirect Checker

Version: `v4-google-login`

## Нове у v4

- додано легкий блок авторизації:
  - Google Sign-In, якщо задано `GOOGLE_CLIENT_ID`
  - guest/demo режим, якщо Google Client ID не заданий
- функціонал сайту доступний у будь-якому випадку: і з Google login, і без входу
- статус користувача зберігається у `localStorage`
- `/api/health` показує `google_login: true/false`

## Як увімкнути реальний Google Sign-In

1. Google Cloud Console → APIs & Services → Credentials.
2. Create Credentials → OAuth client ID.
3. Application type: Web application.
4. Authorized JavaScript origins додай:

```txt
https://for-my-love-girl.black-sci-official.workers.dev
```

5. У Cloudflare Worker → Settings → Variables додай:

```txt
GOOGLE_CLIENT_ID=твій_google_oauth_client_id
```

Або локально в `.dev.vars`:

```txt
GOOGLE_CLIENT_ID="твій_google_oauth_client_id"
```

Якщо `GOOGLE_CLIENT_ID` порожній — сайт працює у demo/guest режимі.

## Перевірка перед деплоєм

```bash
npm install
npm run check
npm run deploy
```

## Функції

- Telegram HTTPS: `https://t.me/nsqmarket`
- Telegram tg://: `tg://resolve?domain=nsqmarket`
- Viber: `viber://`
- WhatsApp: `whatsapp://send?abid=serg&text=hello`
- Blogspot HTTP: `http://veb-page.blogspot.com/`
- Дія web/app placeholder
- Instagram / TikTok / Facebook
- власна зовнішня лінка
- prefix перемикач
- безкінечна загрузка
- QR генератор
- WebQR / Ninja support chat
- upload фото з preview
- перевірка клавіатури
- mock support chat
- mock платіжки Play ID / CBC KBC / PayTM / PhonePe
- `/api/health`

## Безпека

Платіжні блоки тільки mock/test. Сайт не збирає реальні картки, CVV, OTP, банківські логіни або паролі.
Google login тут використовується лише як легка ідентифікація на фронті, без блокування QA-функціоналу.
