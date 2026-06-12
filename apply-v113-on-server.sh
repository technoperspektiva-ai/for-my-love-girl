#!/usr/bin/env sh
set -eu
node tools/apply-v113-on-server.mjs
npm install
npm run check
npx wrangler deploy
