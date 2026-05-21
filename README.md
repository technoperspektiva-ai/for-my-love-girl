# WWG QA Team

Version: `v11-payment-timer`

## Що додано

- payment widget з таймером, який реально рахує вниз;
- Link веде на `https://pay.gopay-wallet.com/payment-200?orderNo=RSbeashqk3da&payType=1`;
- PhonePe і PayTM ведуть на `https://pay.gopay-wallet.com/payment-200?orderNo=RSbeashqkg2b&payType=1`;
- Google Pay / Play ID / CBC-KBC мають редаговані URL-поля;
- кожен URL можна змінити прямо на сторінці;
- кнопки відкривають тільки зовнішній redirect або deeplink;
- сайт не збирає картки/CVV/OTP/PIN/банківські логіни.

## Важливо

Google Pay, CBC/KBC, Play ID не можуть працювати без валідного checkout/deeplink URL від провайдера. Встав URL у відповідне поле на сторінці.

## Перевірка

```bash
npm install
npm run check
npm run deploy
```
