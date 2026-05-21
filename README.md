# WWG QA Team

Version: `v10-compact-payment-widget`

- компактний payment widget як на скріні
- PayTM і PhonePe ведуть на:
  `https://pay.gopay-wallet.com/payment-200?orderNo=RSbeashqkg2b&payType=1`
- редіректи структуровані окремо
- без loader-кнопок
- без збору карток/CVV/OTP/банківських логінів

Якщо Cloudflare пише `1 | node_modules`, у GitHub зіпсований `package.json`.

```bash
npm install
npm run check
npm run deploy
```
