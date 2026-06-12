# for-my-love-girl — v113 server kit

This is the complete server folder overlay for the approved `v110-os-neon-header-fixed` project.

## What it contains

- `package.json`
- `wrangler.jsonc` with `PRESETS_KV`
- `public/audio.mp3`
- `.github/workflows/deploy-cloudflare-worker.yml`
- `.dev.vars.example`
- `.gitignore`
- automatic installer for Windows and Linux/macOS
- patch source references
- approved baseline manifest

## Important

This package intentionally does **not** overwrite `src/index.js` before the installer starts.
Copy these files over your existing `for-my-love-girl` project folder where the approved `src/index.js` is already present.

## Windows

Run:

```bat
apply-v113-on-server.bat
```

## Linux / macOS

Run:

```bash
chmod +x apply-v113-on-server.sh
./apply-v113-on-server.sh
```

The installer:

1. creates backups of `src/index.js` and `wrangler.jsonc`;
2. ensures the `PRESETS_KV` binding exists;
3. splits HYM presets into `desktop` and `mobile`;
4. adds iOS-aware redirects for Facebook, PhonePe UPI, and Paytm UPI;
5. installs dependencies;
6. runs `npm run check`;
7. deploys through Wrangler.

Expected health version after deploy:

```txt
v113-ios-aware-device-presets-server-ready
```
