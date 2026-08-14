Telegram login recovery patch

Причина поломки:
- у src/index.js залишився новий OIDC Telegram Login через oauth.telegram.org;
- попередній revert не повернув legacy Telegram Widget у фактичний Worker entrypoint.

Що виправлено:
- повернуто https://telegram.org/js/telegram-widget.js?22;
- bot username береться з TELEGRAM_BOT_USERNAME (WWG_MY_HOME_BOT);
- callback: https://for-my-love-girl.black-sci-official.workers.dev/api/auth/telegram;
- видалено фронтенд OIDC id_token callback;
- серверний legacy hash-check, 7-day session і owner notification залишені.

Накласти поверх поточного проекту із заміною src/index.js і redeploy Worker.
