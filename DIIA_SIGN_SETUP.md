# Diia.Signature QA flow

The existing **Дія** redirect button now starts a server-side signing-session request instead of opening bare `diia://`.

## What it does

1. Browser calls `POST /api/diia/sign-request`.
2. Cloudflare Worker calls the signing-session endpoint configured in `DIIA_SIGN_CREATE_URL`.
3. Worker extracts a `deepLink`/URL from the upstream response.
4. Browser opens that link so the Diia app can show the real request.
5. For QA you may stop as soon as the request screen appears; the site does not require a successful signature callback.

## Required Cloudflare secrets / vars

- `DIIA_SIGN_CREATE_URL` — signing-session creation endpoint provided for your Diia integration/test environment.
- `DIIA_SIGN_AUTH_VALUE` — full authorization header value if required, for example the exact value issued by the provider.
- `DIIA_SIGN_AUTH_HEADER` — defaults to `Authorization`.
- `DIIA_SIGN_API_KEY` / `DIIA_SIGN_API_KEY_HEADER` — optional API-key style credential.
- `DIIA_SIGN_REQUEST_TEMPLATE` — JSON request body expected by your integration.

Template placeholders: `__REQUEST_ID__`, `__CALLBACK_URL__`, `__RETURN_URL__`, `__PURPOSE__`.

The project deliberately does **not** fabricate a Diia session token or hard-code another company's credentials. A real prompt requires credentials/configuration issued for an authorized integration.
