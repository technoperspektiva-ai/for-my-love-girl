# WWG QA Team

Version: `v18-black-minimal`

## Що змінено

- прибрано QA log
- прибрано таймер
- прибрано Google Pay authorize
- прибрано Apple Pay authorize
- прибрано merchant validator block
- payment buttons без видимих URL
- app redirects без web version
- YouTube link: Champagne Coast (Intence)
- Audio link: Мертвая планета wrierbrake
- Google Sign-In через Google Identity Services
- прибрано HTTP resource check
- додано clicker
- головне фото: WWG QA TEAM
- чорний фон
- прямокутні форми

## Важливо

Щоб увійти через Google, треба задати `GOOGLE_CLIENT_ID` у Cloudflare env / secret.

## Перевірка

```bash
npm install
npm run check
npm run deploy
```
