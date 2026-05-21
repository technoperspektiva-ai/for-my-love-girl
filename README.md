# WWG QA Team Redirect Dashboard

Version: `v7-polished-dashboard`

Красивий root-clean Worker dashboard з логотипом WWG QA TEAM і QA-стікером.

## ВАЖЛИВО

ZIP root-clean: файли лежать одразу в корені архіву.

Якщо Cloudflare пише:

```txt
ParserError parsing package.json
1 | node_modules
```

значить у GitHub файл `package.json` зіпсований і містить текст `.gitignore`.
Видали `package.json` у GitHub і залий правильний з цього ZIP.

## Перевірка

```bash
npm install
npm run check
npm run deploy
```

## Функції

- красивий WWG QA Team dashboard
- логотип + QA mascot
- Google demo / optional real Google login через `GOOGLE_CLIENT_ID`
- Guest login
- Telegram/Viber/WhatsApp/Blogspot/Дія/Instagram/TikTok/Facebook редіректи
- Web fallback
- infinite loader
- custom link checker
- QR generator
- photo preview
- keyboard test
- mock support chat
- mock payment status: Play ID / CBC KBC / PayTM / PhonePe
- `/api/health`
