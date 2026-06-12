# v63 Telegram Unicode session fix

Fixes Telegram Login callback crashes for names containing Cyrillic or other Unicode characters.

Changes:
- Keeps Telegram HMAC `dataCheckString` joined with a real newline (`"\\n"`).
- Encodes the Telegram session cookie using UTF-8-safe Base64URL instead of plain `btoa(JSON.stringify(...))`.
- Returns a readable HTTP 500 response if session encoding fails instead of throwing an unhandled Worker exception.
- Keeps fresh Skrill SID generation on every `/api/skrill/checkout` request.


## v64 Telegram session UI logout

- Reads the signed HttpOnly Telegram session through `/api/auth/telegram/session`.
- Hides the Telegram login widget while a valid session is active.
- Shows Telegram profile and `Вийти з Telegram` button.
- Clears the session through `/api/auth/telegram/logout`.


## v67 checkout fallbacks restored
Payment redirects use Cloudflare Secrets when configured and embedded fallback URLs otherwise. Skrill still creates a fresh SID on every click.

## v70 Paysafecard fresh Skrill session
The Paysafecard button now calls `/api/payment-redirect/paysafecard`.
The Worker creates a fresh Skrill Quick Checkout SID on every click and requests `payment_methods=PSC`.
Optional secret: `SKRILL_PAY_FROM_EMAIL` for straight-through redirect support.

## v71 Stripe Express Checkout inline QA section

- Adds a `Stripe тестові платіжки` card directly to the main Worker page.
- Uses Stripe Express Checkout Element for eligible Link, Google Pay, Klarna, Amazon Pay and other sandbox buttons.
- Includes a fallback Stripe Payment Element form.
- Creates a new USD 1.00 PaymentIntent through `/api/stripe/create-payment-intent`.
- Exposes the test publishable key through `/api/stripe/config`.
- Rejects Stripe live keys: only `pk_test_...` and `sk_test_...` values are accepted.

Configure Stripe test keys before testing:

```bash
npx wrangler secret put STRIPE_PUBLISHABLE_KEY
npx wrangler secret put STRIPE_SECRET_KEY
npx wrangler deploy
```



## v72 Stripe preview + live mode
- Shows Stripe Docs-style preview buttons immediately, even before Stripe keys are configured.
- Real Express Checkout replaces the preview after `pk_test_` / `sk_test_` are configured and Stripe reports availability.
- Preview buttons are explicitly non-functional and only demonstrate layout.


## v73 Stripe real sandbox only

The Stripe section renders only the real Stripe Express Checkout Element. Fake preview buttons were removed.

```bash
npx wrangler secret put STRIPE_PUBLISHABLE_KEY
npx wrangler secret put STRIPE_SECRET_KEY
npx wrangler deploy
```

Use Stripe Sandbox keys only: `pk_test_...` and `sk_test_...`. Register the Worker domain in Stripe Dashboard → Payment method domains for the sandbox.


## v75 cleanup
- Removed Stripe fallback Payment Element card form.
- Removed Paysafecard and Bank Transfer buttons from Cashier Desk.
- Kept real Stripe Express Checkout sandbox integration.


## v76 Stripe buttons-only mode
- Stripe section shows only the real Express Checkout field.
- Removed controls, statuses, setup text and fallback card form.
- Accepts matching `pk_test_` + `sk_test_` or `pk_live_` + `sk_live_` keys from Cloudflare Secrets.
- Live mode can create real charges. Keep keys in Cloudflare Secrets only.

## v77 minimal UI cleanup
Removed the hero panel and explanatory text blocks below Payments, Support Chat and Offers. Functional buttons and Stripe Express Checkout remain unchanged.

## v78 Stable Beta 2.0 badge
- Replaces the technical header build label with `Stable "Beta 2.0"`.
- Animates the `Beta 2.0` text with a pulsing moving gradient.


## v79 Temporary mail (Mail.gw)

Adds a full-width `Тимчасова пошта` UI block. The Worker proxies the documented Mail.gw API and supports:

- create a temporary mailbox;
- copy its address;
- replace or delete the mailbox;
- refresh inbox messages;
- open a message as sanitized plain text;
- show verification codes returned by Mail.gw.

Mailbox bearer tokens are stored only in browser `sessionStorage` for the current tab. The frontend polls at most once per 15 seconds while visible. Use only for authorized QA testing.


## v80 Temporary mail fix

- Replaced failing Mail.gw Worker proxy flow with direct browser requests to the documented Mail.tm API.
- Mailbox token remains only in sessionStorage for the current browser tab.
- Added visible `Powered by mail.tm` attribution link as required by Mail.tm terms.
- No Cloudflare secret is required for temporary email.


## v81 Collapsible temporary mail block

The `Тимчасова пошта` section is now collapsed by default and expands when the section header is clicked. All existing Mail.tm actions remain unchanged.


## v82 temporary mail domain fallback
- Prefer a Mail.tm domain with `isActive === true`.
- If Mail.tm returns domains without an active flag, use the first valid returned domain.
- Retry `/domains?page=1`, `/domains?page=2`, `/domains?page=3`, then `/domains`.


## v83 temp mail saved mailboxes
- Removed persistent active-address and inbox-count text under the mailbox toolbar.
- Keeps Mail.tm attribution as a subtle visible footer link to comply with the Mail.tm API terms.
- Adds browser-local saved mailboxes with Save, Open, and Delete actions.
- Saves generated credentials only in localStorage on the current browser so a mailbox can be reopened later.

## v84 Calm temp-mail inbox

- Adds a nested collapsible `Вхідні листи` section inside `Тимчасова пошта`.
- Reduces auto-refresh polling from 15 seconds to 30 seconds.
- Auto-refresh runs only while the outer temporary-mail panel and the nested inbox panel are both open and the page is visible.
- Avoids repainting the inbox list when message IDs and metadata have not changed.
- Keeps manual `Оновити листи` available and shows the last successful check time or API error.
- Fixes the initial refresh after creating a mailbox so it is not skipped while the create flow is marked busy.



## v85 temp mail token refresh
- Renews Mail.tm bearer token on load and once after HTTP 401.
- Keeps saved mailbox password locally for token re-authentication.
- Removes stale mailbox rows locally even when Mail.tm cannot confirm remote delete.


## v86 temp mail domain rotation
- Rotates through active Mail.tm domains instead of always selecting the first one.
- After repeated empty inbox checks, suggests replacing the address to try the next domain.
- Keeps token refresh and calm inbox rendering from v85.


## Fixed Mail.tm inbox proxy

The UI includes a button `Підключити готову пошту`. Store the account credentials as Cloudflare Secrets:

```bash
npx wrangler secret put TEMP_MAIL_FIXED_ADDRESS
npx wrangler secret put TEMP_MAIL_FIXED_PASSWORD
```

The password remains server-side and is not sent to browser JavaScript. Telegram login is required before reading the fixed inbox.


## v91 Short generated mail and hidden fixed mailbox toggle
- Generated Mail.tm addresses now use a short local part such as `qa-ab12@domain`.
- Removed the visible fixed-mail connection button.
- Triple-click `Beta 2.0` to connect the embedded fixed mailbox; triple-click again to hide it locally.


## v92
Added per-message deletion for both generated Mail.tm inboxes and the hidden fixed inbox. Each message row and opened message view now has a delete button.


## v101 Edit icon, standard layout and optional server presets

- A separate subtle pencil icon in the header toggles layout editing without opening the presets modal.
- Triple-click `HYM` opens the presets dialog only.
- Restores the preferred compact desktop baseline layout.
- Local labels, layout and visibility settings stay browser-local.
- Optional shared server presets use the `PRESETS_KV` Workers KV binding.
- Creating and deleting server presets requires an active Telegram login.

See `PRESETS_KV_SETUP.md` for one-time Cloudflare KV setup.


## v103 KV presets and touch editor fix

- PRESETS_KV binding is included in `wrangler.jsonc`.
- Triple click `HYM` toggles the hidden editor.
- Tap an inner item to select it, drag to move it, and use the visible `↘` marker to resize it on desktop or mobile.
- The `✎` button opens presets only.


## v105 mobile editor toolbar
- Mobile edit mode uses a bottom control panel instead of free-form dragging as the primary interaction.
- Desktop drag and resize remain available.


## v108 mobile Stripe fix
Stripe Express Checkout uses one column on mobile and is constrained to the card width.


## v111 hidden HYM admin panel

Adds a server-side protected hidden admin panel, lightweight anonymous traffic analytics and public HYM template selection.

### Required Cloudflare secret

```bash
npx wrangler secret put ADMIN_SECRET_KEY
```

Open the admin panel after deployment using the secret only in the path:

```text
https://<your-worker-domain>/hym-admin/<ADMIN_SECRET_KEY>
```

The panel removes the secret from the visible browser address after successful loading and uses it only for admin API requests in that browser tab. The server still validates the key for every admin operation.

### Admin functions

- active users online during the last 150 seconds;
- unique browser visitors for the current Kyiv calendar day;
- select the public HYM server preset for mobile devices;
- select the public HYM server preset for Windows desktop;
- clear an assigned template to fall back to the built-in standard layout.

Analytics uses an anonymous random browser identifier. The existing `PRESETS_KV` namespace is reused, so no additional Cloudflare binding is required.


## v112 standard template wording

- The admin selections are explicitly named `Стандартний шаблон телефону` and `Стандартний шаблон Windows`.
- Choosing a server HYM preset makes it the standard public template for the selected device group.
- The built-in baseline remains available as `вбудований стандартний шаблон`.


## v113 hidden HYM presets trigger

- The public `HYM presets` button is hidden by default.
- Triple-tap or triple-click the `HYM` word in the header to enable layout editing.
- The `HYM presets` button appears in the header only while editing mode is enabled.
- Click the visible `HYM presets` button to open presets.
- Triple-tap `HYM` again to leave editing mode; the button disappears and any open presets modal closes.


## v114 Test - Cokies🍪

- Adds a HYM-styled `Test - Cokies🍪` QA card to the dashboard.
- `Випадковий` creates a random first-party test cookie for the current domain with `Path=/`, `SameSite=Lax`, and a one-day lifetime. HTTPS deployments also use `Secure`.
- `Отримати список` displays cookies visible to browser JavaScript for the current domain and path.
- `Видалити` expires visible cookies across common path and current-domain variants.
- Browser JavaScript cannot display or delete `HttpOnly` cookies; the card states this when the visible list is empty.
- The card participates in HYM layouts and presets like the existing dashboard cards.


## v115 Cookies test-only cleanup

- The `Test - Cokies🍪` card no longer exposes unrelated site cookies such as payment or Google session cookies.
- `Отримати список` now shows only HYM test cookies created by this block (`hym_test_*`).
- The raw cookie values are no longer displayed. Only test-cookie names are shown.
- The visible status line under the card was removed.
- `Видалити` now removes only HYM test cookies created through this QA block.


## v116 Collapsible Test - Cokies🍪

- Converts the `Test - Cokies🍪` card into a collapsible `<details>` section.
- The section is collapsed by default and opens by clicking its title.
- The HYM-styled `[+]` / `[-]` indicator matches the temporary-mail panel behavior.
- All v115 privacy cleanup remains unchanged: only `hym_test_*` names are shown and only HYM test cookies are deleted.


## v117 Cookie list sync

- Fixes the `Випадковий` action in `Test - Cokies🍪`: after a new test cookie is created, the interface immediately keeps the existing visible HYM test cookies and adds the new one.
- Re-synchronizes the list from `document.cookie` after a short delay for browsers that expose a newly written cookie one tick later.
- Resets the list scroll position to the beginning after refresh.


## v118 Full-width opened Test - Cokies🍪

- Keeps `Test - Cokies🍪` compact while collapsed.
- When expanded, the cookie QA section stretches across the complete dashboard grid width, matching the opened temporary-mail section.
- Uses `!important` for the opened state so a saved HYM layout preset cannot force the expanded cookie section back into a narrow column.


## v119 Separate collapsed / expanded cookie layouts

- Removes the forced full-width CSS override from `Test - Cokies🍪`; the section returns to its base compact size.
- Adds independent HYM editor layouts for the collapsed `[+]` and expanded `[-]` states of the cookie section.
- Each state stores its own card width, grid span, height, alignment, and dashboard order.
- Switching the cookie section between collapsed and expanded states automatically loads the matching saved layout.
- Existing older HYM presets remain compatible through a legacy fallback.
