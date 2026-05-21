# WWG QA Team Redirect Dashboard

Version: `v9-structured-redirects`

## Зміни

- прибрано loader-кнопки;
- кожен редірект структурований окремо;
- платіжні провайдери окремими картками:
  - Google Pay UPI
  - UPI generic
  - PhonePe UPI
  - PayTM UPI
  - Play ID
  - KBC Mobile
  - CBC Mobile
- у кожній платіжній картці є App/deeplink/intent URL, Web fallback і Copy;
- URL можна редагувати на сторінці.

## Важливо по package.json

Якщо Cloudflare пише `1 | node_modules`, значить `package.json` у GitHub зіпсований і містить `.gitignore`.
Правильний `package.json` починається з `{`.

## Перевірка

```bash
npm install
npm run check
npm run deploy
```
