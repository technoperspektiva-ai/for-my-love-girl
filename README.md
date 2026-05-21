# WWG QA Team

Version: `v20-embedded-media`

## Що змінено

- YouTube тепер вбудований як player на сайті
- Champagne Coast player: Blood Orange - Champagne Coast Official Video
- Audio тепер можна відтворити на сайті:
  - через прямий audio URL mp3/ogg/wav
  - або завантажити локальний audio-файл
- Google Pay TEST authorization залишено
- Apple Pay / Klarna / Amazon не повертав
- чорний мінімальний стиль

## Google Sign-In

Щоб увійти у свій Google акаунт, треба задати `GOOGLE_CLIENT_ID` у Cloudflare env.

## Перевірка

```bash
npm install
npm run check
npm run deploy
```
