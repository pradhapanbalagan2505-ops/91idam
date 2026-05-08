# Module — Authentication

**Source:** `src/components/auth/`, `src/store/slices/authSlice.js`
**Components:** `AuthModal`, `LoginModal`, `OtpVerificationModal`, `ForgotPasswordModal`, `PartnerRegistrationModal`

## Overview

All auth interactions happen in modals layered over the current page. There is no dedicated `/login` route — calling `dispatch(toggleLoginModal(true))` from anywhere in the app opens the flow.

## Flows

### Login

```
LoginModal → submit
  ↓
[email + password]
  ↓
OTP triggered server-side, email sent
  ↓
OtpVerificationModal
  ↓
[6-digit code]
  ↓
session cookie set, Redux authSlice updated
```

- "Remember me" extends the session to 30 days.
- Real-time email format validation (green checkmark when valid).
- Max 3 OTP sends per 15 min, 5 failed attempts → 24 h account lockout.

### Forgot password

```
LoginModal → "Forgot password"
  ↓
ForgotPasswordModal
  ↓
[email]
  ↓
24 h IP-bound digest link emailed
  ↓
User opens link → /resetpassword
  ↓
ResetPassword page (no header/footer)
```

### Signup

The "Sign up" link in `LoginModal` opens the signup variant of `AuthModal`. Same OTP confirmation flow as login.

### Partner registration

`PartnerRegistrationModal` is a different beast — used by the **Individuals** and **Franchise Partners** dropdowns on the public site. It captures interest leads and forwards to Zoho CRM. Not a true auth flow.

## App-launch auth check

`App.jsx` runs `authAPI.checkAuthAndFetchUser()` once on mount:

```js
if (authResult.isAuthenticated) {
  dispatch(setAuthStatus(true));
  if (authResult.user) dispatch(setUserInfo(authResult.user));
} else {
  dispatch(clearAuth());
}
```

While this runs, a full-screen spinner blocks the UI (`selectAuthLoading`). Don't add long-running work to this code path — it's the first-paint blocker.

## Redux selectors

| Selector | What it returns |
|---|---|
| `selectIsAuthenticated` | boolean |
| `selectUser` | full user object (or null) |
| `selectAuthLoading` | boolean — true during initial auth check |

## Roles in the user object

The user object carries role info that the UI uses to gate menus (e.g. `isSuperAdmin()` decides the Manage / Requests sidebar items in `ProfileSidebar`).

## Security notes

- Session is cookie-based, http-only — JS cannot read it.
- Sessions can be enumerated and remotely terminated from **Profile → Profile → Active sessions**.
- Email change re-triggers verification.
- Password change requires the old password.
