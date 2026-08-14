# Верифікація — QES + Дія.Підпис

## QES
Кнопка `Верифікація → QES` відкриває:

`https://forms.kycaid.com/2011145f002907418b29aa80940ef12e4544`

## Дія
Кнопка `Верифікація → Дія` викликає `POST /api/diia/sign-request`. Worker створює signing-session через endpoint вашої інтеграції, знаходить deep link у відповіді та відкриває його, щоб перейти в застосунок Дія.

Cloudflare Worker variables:
- `DIIA_SIGN_CREATE_URL`
- `DIIA_SIGN_AUTH_HEADER` (опційно, default `Authorization`)
- `DIIA_SIGN_AUTH_VALUE` (опційно)
- `DIIA_SIGN_API_KEY_HEADER` (опційно, default `X-API-Key`)
- `DIIA_SIGN_API_KEY` (опційно)
- `DIIA_SIGN_CALLBACK_URL` (опційно)
- `DIIA_SIGN_RETURN_URL` (опційно)
- `DIIA_SIGN_REQUEST_TEMPLATE` (опційно JSON)

Без валідних інтеграційних параметрів кнопка Дія покаже помилку конфігурації; фіктивний deep link не генерується.
