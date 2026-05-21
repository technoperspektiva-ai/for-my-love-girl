# for-my-love-girl

Cloudflare Worker landing у Worker-форматі.

Очікуваний URL після деплою:

```txt
https://for-my-love-girl.black-sci-official.workers.dev
```

## Локальний запуск

```bash
npm install
npm run dev
```

## Деплой

```bash
npx wrangler login
npm run deploy
```

## GitHub Actions

Додай repository secrets:

```txt
CLOUDFLARE_API_TOKEN
CLOUDFLARE_ACCOUNT_ID
```

Після push у `main` workflow зробить deploy.
