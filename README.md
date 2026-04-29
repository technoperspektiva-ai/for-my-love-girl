# Crossword Hint Cloudflare Ready

This repo layout works with Cloudflare Workers Static Assets using `npx wrangler deploy`.

Files:
- public/index.html - the crossword page
- wrangler.jsonc - tells Wrangler where static files are

Cloudflare settings for this layout:
- Build command: leave blank or `echo no build`
- Deploy command: `npx wrangler deploy`
- Root directory: blank / repository root

For Cloudflare Pages instead, you can move public/index.html to the repo root as index.html and use:
- Build command: `exit 0`
- Build output directory: `.` or `/`
