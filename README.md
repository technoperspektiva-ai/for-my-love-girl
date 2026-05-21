# v34 GitHub-ready Google Pay + Google Sign-In

Only:
- Google Pay button
- Google Sign-In button
- logged-in status with name, email, avatar

`GOOGLE_CLIENT_ID` is already included as fallback:

```txt
221396849433-0f5ktd8ao72kf7qvrgi7sk7v9lpn698o.apps.googleusercontent.com
```

You can still override it with Cloudflare env:

```env
GOOGLE_CLIENT_ID=221396849433-0f5ktd8ao72kf7qvrgi7sk7v9lpn698o.apps.googleusercontent.com
```

## GitHub deploy secrets

Repository Settings → Secrets and variables → Actions → New repository secret:

```txt
CLOUDFLARE_API_TOKEN
CLOUDFLARE_ACCOUNT_ID
```

Then push to `main`, GitHub Actions will deploy.
