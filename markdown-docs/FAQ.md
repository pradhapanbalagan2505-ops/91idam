# FAQ

## For end users

**Q: Why am I asked for an OTP every time I log in?**
A: 91 IDAM uses MFA — email password is the first factor, OTP is the second. This is required by default; there is currently no opt-out.

**Q: My OTP didn't arrive.**
A: Check spam. If it's still missing after 60 seconds, click *Resend OTP* (max 3 sends per 15 minutes). If the third send still doesn't arrive, see [TROUBLESHOOTING.md](./TROUBLESHOOTING.md#otp-not-received).

**Q: I forgot my password.**
A: Click **Forgot password** on the login modal. A 24-hour reset link is sent to your email. The link is tied to your IP for brute-force protection — open it from the same network you requested it on.

**Q: My account is locked. How do I unlock?**
A: After 5 failed OTPs the account locks for 24 hours automatically. You'll receive a notification email. After 24 h, login resumes normally. To unlock sooner, contact support.

**Q: How long until my submitted property goes live?**
A: All listings go through super-admin approval. Typical turnaround is 24–48 hours. You'll be emailed once it's live or rejected.

**Q: Can I edit a published listing?**
A: Yes. Go to **Profile → My Listings**, click your property, edit and resubmit. Edits also need re-approval but usually clear faster.

**Q: How do I withdraw a listing?**
A: **Profile → My Listings → Delete**. The listing is removed from public search; the record stays in the DB for audit.

**Q: Why are some agents/properties not showing?**
A: The public site only shows records with status = Active. Pending and Rejected records are hidden by design.

## For admins

**Q: Can I bulk-approve listings?**
A: Not in the current UI — approvals are one-at-a-time under **Profile → Manage**. If you need bulk, run a server-side update on the property table directly.

**Q: How do I reset a user's password without email access?**
A: Use the server-side admin endpoint or update the password hash directly in the user table. Inform the user out-of-band.

**Q: Where do mail templates live?**
A:
```
/opt/tomcat/latest/webapps/<app>/WEB-INF/classes/mail_templates/idam/
```
Edit in place; changes apply on the next send.

**Q: How do I create a new franchise org?**
A: Super-admin → Manage → Franchise Orgs (or via the back-office endpoint if not yet exposed in UI). Each org gets its own role setup and admin.

## For developers

**Q: How is auth state stored?**
A: Server-side session cookie + Redux slice (`authSlice`). On app launch, `App.jsx` calls `authAPI.checkAuthAndFetchUser()` and rehydrates Redux. localStorage is *not* used for auth.

**Q: Where are routes defined?**
A: `src/routes/routeConfig.js`. Each entry has `path`, `element`, and `layout` (true = wrap with `Layout` which includes Header + Footer).

**Q: How do I run Playwright screenshots?**
A: Start the dev server (`npm run dev_only`) on port 3000, then `node scripts/screenshots/capture.js` from this user-guide folder. Output lands in `docs-portal/assets/screenshots/`. See `scripts/screenshots/README.md` for full setup.
