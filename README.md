# v88 fixed temporary mailbox embedded auto-connect

- Fixed Mail.tm mailbox credentials are embedded as Worker fallbacks for personal use.
- `TEMP_MAIL_FIXED_ADDRESS` and `TEMP_MAIL_FIXED_PASSWORD` Cloudflare secrets remain optional overrides.
- The fixed mailbox auto-connects on page load when no local temporary mailbox is active.
- Fixed mailbox API no longer requires Telegram login.
- Inbox token is refreshed automatically after Mail.tm HTTP 401.
