# UPC eCommerce Connect TEST patch

This patch adds a separate UPC QA module and does not replace Stripe, Google Pay, Skrill, redirects, or other existing modules.

## Cloudflare secrets

Required for real UPC test-gateway runs:

- `UPC_MERCHANT_ID`
- `UPC_TERMINAL_ID`
- `UPC_PRIVATE_KEY_PEM` — merchant PKCS#8 private key generated for the UPC test merchant.

Optional variables:

- `UPC_SIGNATURE_HASH` — defaults to `SHA-1` for the classic Shop Gateway signature flow. Change only if UPC assigns a different scheme.
- `UPC_GATEWAY_URL` — defaults to `https://ecg.test.upc.ua/go/enter`.
- `UPC_STATUS_URL` — defaults to `https://ecg.test.upc.ua/go/service/01`.
- `UPC_REFUND_URL` — defaults to `https://ecg.test.upc.ua/go/repayment`.
- `UPC_CURRENCY` — default `980` (UAH).
- `UPC_AMOUNT` — default `100` minor units.
- `UPC_PURCHASE_DESC`.

Example secret commands:

```bash
npx wrangler secret put UPC_MERCHANT_ID
npx wrangler secret put UPC_TERMINAL_ID
npx wrangler secret put UPC_PRIVATE_KEY_PEM
```

## UPC merchant-console URLs

Register these URLs for the test terminal, using your deployed Worker origin:

- success: `/api/upc/return/success`
- failure: `/api/upc/return/failure`
- notify: `/api/upc/notify`

## QA controls added

- CARD / 3DS
- PREAUTH (`Delay=1`)
- STATUS
- REFUND (asks for ApprovalCode and RRN from an approved test transaction)

Stable `data-qa` selectors were added for automation. Without credentials the card stays in READY / NEED CREDS mode and existing payment modules continue to work unchanged.
