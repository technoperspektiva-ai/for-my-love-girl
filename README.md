# WWG QA Team

Version: `v14-googlepay-api-test`

## Що додано

- Cashier's Desk style: `#app`, mobile viewport, cashier layout.
- Google Pay API TEST button через `https://pay.google.com/gp/p/js/pay.js`.
- Google Pay відкриває payment sheet у `environment: TEST`.
- Tokenization gateway: `example`, `exampleGatewayMerchantId`.
- Link веде на `https://pay.gopay-wallet.com/payment-200?orderNo=RSbeashqk3da&payType=1`.
- PayTM / PhonePe ведуть на `https://pay.gopay-wallet.com/payment-200?orderNo=RSbeashqkg2b&payType=1`.
- Таймер рахує вниз.

## Важливо

Google Pay TEST не списує гроші. Для production потрібні реальні `merchantId`, gateway і backend processing.

## Перевірка

```bash
npm install
npm run check
npm run deploy
```
