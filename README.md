# v31 under 3MB

This build is made to avoid Cloudflare size problems.

Changes:
- `src/index.js` is small
- `public/audio.mp3` is compressed
- no base64 MP3 inside Worker code
- full user info removed; only User-Agent remains
- Google Pay has no visible parameters
- music has only default audio player
- Amazon Pay opens sandbox test checkout modal

Upload ALL files to repo root and replace old files:
- src/index.js
- wrangler.jsonc
- package.json
- public/audio.mp3

Check in GitHub:
- `src/index.js` must NOT be 5 MB.
