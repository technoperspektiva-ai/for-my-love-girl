# v29 hard reset small worker

This ZIP is created to fix Cloudflare 3 MiB Worker size error.

Upload ALL files to repository root and replace old files:
- src/index.js
- wrangler.jsonc
- package.json
- public/audio.mp3

Correct src/index.js must be small, not 5 MB.
