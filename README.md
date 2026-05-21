# WWG QA Team

Version: `v15-strict-cashier`

## Зміни

- прибрано маскота;
- прибрано соцмережі, QR, custom links, web-open blocks;
- строгий payment-only Cashier Desk;
- Google Pay TEST з `PAYMENT_AUTHORIZATION`;
- Apple Pay authorization shell через `ApplePaySession`;
- Apple Pay потребує merchant validation endpoint на backend;
- таймер залишено;
- payment redirects залишено як зовнішні URL.

## Перевірка

```bash
npm install
npm run check
npm run deploy
```
