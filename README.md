# WWG QA Team Redirect Dashboard

Version: `v8-payment-redirects`

## Головне

Цей ZIP root-clean: файли лежать одразу в корені архіву.

## Якщо знову бачиш помилку package.json

Помилка:

```txt
ParserError parsing package.json
1 | node_modules
```

означає, що в GitHub файл `package.json` містить текст `.gitignore`.

Правильний `package.json` має починатися з:

```json
{
  "name": "for-my-love-girl",
```

## Нове у v8

- платіжні блоки тепер не `mock success`, а redirect поля:
  - Google Pay
  - Play ID
  - CBC KBC
  - PayTM
  - PhonePe
- у кожну платіжку можна вставити URL/deeplink
- кнопка `Відкрити редірект` відкриває зовнішній ресурс
- кнопка `∞ loader` показує нескінченну загрузку для цього URL
- кнопка `Копіювати` копіює URL

## Перевірка

```bash
npm install
npm run check
npm run deploy
```
