# WWG QA Team Redirect Checker

Cloudflare Worker landing для QA-перевірок.

URL після деплою:

```txt
https://for-my-love-girl.black-sci-official.workers.dev
```

## Що додано

- функціональні редіректи:
  - Telegram HTTPS: `https://t.me/nsqmarket`
  - Telegram tg://: `tg://resolve?domain=nsqmarket`
  - Viber: `viber://`
  - WhatsApp: `whatsapp://send?abid=serg&text=hello`
  - Blogspot HTTP: `http://veb-page.blogspot.com/`
  - Дія web: `https://diia.gov.ua/`
  - Дія app placeholder: `diia://`
  - Instagram
  - TikTok
  - Facebook
- Web fallback для кожного пункту
- власна зовнішня лінка
- prefix перемикач: `https://`, `http://`, `tg://`, `viber://`, `whatsapp://`, `diia://`
- режим `Безкінечна загрузка` для будь-якого ресурсу
- QR генератор
- швидкі кнопки:
  - `https://webqr.com/`
  - `https://ninja-chat-a6f8f.web.app/`
- upload фото з preview
- перевірка клавіатури
- mock support chat
- mock платіжки:
  - Play ID
  - CBC KBC
  - PayTM
  - PhonePe
- `/api/health`

## Запуск

```bash
npm install
npm run dev
```

## Деплой

```bash
npx wrangler login
npm run deploy
```

## GitHub

```bash
git init
git add .
git commit -m "Update WWG redirect checker"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/for-my-love-girl.git
git push -u origin main
```

## GitHub Actions

Додай repository secrets:

```txt
CLOUDFLARE_API_TOKEN
CLOUDFLARE_ACCOUNT_ID
```

## Безпека

Платіжні блоки тільки mock/test. Сайт не збирає реальні картки, CVV, OTP, банківські логіни або паролі.
