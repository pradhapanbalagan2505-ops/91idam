# Troubleshooting

## End-user issues

### OTP not received

1. Wait 60 seconds, then click **Resend OTP**.
2. Check spam / promotions / "All mail" in Gmail.
3. Confirm the email address is typed correctly.
4. Ask your IT to whitelist the sender domain (`@91idam.com`).
5. If still nothing, contact support — there may be an SMTP outage.

### "Account locked" message

After 5 failed OTPs you're locked for 24 h. Wait it out or contact support.

### Forgot-password link expired

Reset links are valid for 24 h and bound to the IP that requested them. Request a new one. If you're still on a different network, switch back or contact support.

### Property not showing after submission

Wait for super-admin approval (typically 24–48 h). You'll be emailed once it's live or rejected.

### Map not loading on property details

The map uses the Google Maps URL submitted by the seller. If it's missing or malformed, no map will render. Sellers can edit the URL from **My Listings**.

### Image upload fails

- Max 10 images per listing.
- Each image must be ≤5 MB.
- Allowed formats: JPG, PNG.
- Try one image at a time if a batch upload fails — surfaces the offending file.

## Developer issues

### `npm run dev_only` doesn't start

Make sure Node 18+ and npm 9+ are installed. Run `node --version`. If port 3000 is busy, change it via Vite's `--port` flag.

### Build outputs to the wrong directory

Vite has dual modes — see `vite.config.js`. Dev mode uses base path `/vrpumps/app/`, production uses `/app/`. Both write to `../src/main/webapp/app`.

### Auth never resolves (infinite loading spinner)

`App.jsx` blocks the app on `authAPI.checkAuthAndFetchUser()`. If it hangs, the backend's `ustat` endpoint is likely unreachable. Check:

- Backend is running and reachable from the dev machine.
- CORS is configured to allow `http://localhost:3000`.
- No browser extension is blocking cookies (auth depends on cookies).

### Lint errors after a clean install

Run `npm run lint`. The config is in `eslint.config.js`. Common issue: importing default from a module that exports named only — Vite's resolve is more permissive than ESLint's checker.

## Server-side issues

### Tomcat won't start after a deploy

```
tail -f /opt/tomcat/latest/logs/catalina.out
```

Most failures are:
- WAR explode failure → drop a clean WAR.
- Port conflict → another Java process holding 8080.
- DB connection → check the JDBC URL in the deployed `web.xml` / app config.

### "Email send failed" in logs

1. Check SMTP creds.
2. Confirm port 587 (or 25) is open from the Tomcat host.
3. The mail template may have unbalanced HTML — open it in a browser to verify.

### Property approval emails not firing

- Confirm the approve action actually committed (check the property table).
- Confirm the template file exists at `/opt/tomcat/latest/webapps/<app>/WEB-INF/classes/mail_templates/idam/`.
- Check rate limiting — frequent test approvals may hit the 3-per-15-min cap.
