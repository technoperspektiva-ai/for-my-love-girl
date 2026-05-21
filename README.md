# for-my-love-girl

Cloudflare Worker landing у форматі Worker-проєкту.

```txt
for-my-love-girl/
├─ package.json
├─ wrangler.jsonc
├─ .dev.vars.example
├─ src/
│  └─ index.js
├─ .github/
│  └─ workflows/
│     └─ deploy-cloudflare-worker.yml
├─ README.md
└─ .gitignore
```

Очікуваний URL після деплою:

```txt
https://for-my-love-girl.black-sci-official.workers.dev
```

## Локальний запуск

```bash
npm install
npm run dev
```

## Деплой з ПК

```bash
npx wrangler login
npm run deploy
```

## GitHub

```bash
git init
git add .
git commit -m "Initial landing"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/for-my-love-girl.git
git push -u origin main
```

## GitHub Actions

У репозиторії додай secrets:

```txt
CLOUDFLARE_API_TOKEN
CLOUDFLARE_ACCOUNT_ID
```

## Безпека

У ZIP немає приватного Google service account key. Такі ключі не можна комітити в GitHub.
