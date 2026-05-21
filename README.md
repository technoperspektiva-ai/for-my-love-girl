# WWG QA Team

Version: `v12-googlepay-official-demo`

## Зміни

- прибрано текст, що кнопка Google Pay "не працює";
- Google Pay тепер веде на офіційний Google Pay live demo:
  `https://developers.google.com/pay/api/web/guides/resources/demos`
- Link веде на:
  `https://pay.gopay-wallet.com/payment-200?orderNo=RSbeashqk3da&payType=1`
- PayTM і PhonePe ведуть на:
  `https://pay.gopay-wallet.com/payment-200?orderNo=RSbeashqkg2b&payType=1`
- Play ID / CBC-KBC лишені як редаговані URL-поля, бо для них потрібні реальні checkout/deeplink URL.

## Важливо

Я не підключаю "чужий провайдер" без дозволу. Для реальної оплати потрібен твій PSP checkout URL або офіційна інтеграція.

## Перевірка

```bash
npm install
npm run check
npm run deploy
```
