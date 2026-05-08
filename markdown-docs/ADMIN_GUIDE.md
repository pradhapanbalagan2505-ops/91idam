# Admin Guide

For Super Admins and Franchise Admins of 91 IDAM.

## 1. Roles

| Role | Scope |
|---|---|
| **Super Admin** | Platform-wide. Approves properties, manages users, creates franchise orgs. |
| **Franchise Admin** | One franchise org. Manages users and properties under that org. |
| **Agent** | Create + view properties (no edit/delete on others). |
| **Admin (Org)** | CRUD inside their org. |
| **User (Org)** | Create + read inside their org. |

Permissions are enforced server-side on every request via the security filter, not by the UI.

## 2. The Manage tab

Visible only to super-admins. Located at **Profile → Manage**.

It lets you:

- Review pending agents — approve or reject each.
- Review pending properties — approve, reject or delete.
- Drill into individual records to inspect submitted data.

The same flow is wired into Zoho CRM — when an agent registers via the public site, a CRM lead is created and surfaced here for human approval.

## 3. The Requests tab

Super-admin only. Shows pending registration requests submitted via the **Individuals** and **Franchise Partners** modals on the public site. Each row links back to the originating Zoho lead.

## 4. Property approval flow

```
Owner submits via /start-selling
        │
        ▼
Property created in "Pending" status
        │
        ▼
Super-admin reviews under Profile → Manage
        │
        ├── Approve  → status = "Active", visible in /search-property
        └── Reject   → status = "Rejected", owner notified by email
```

Mail templates for each transition live at:

```
/opt/tomcat/latest/webapps/<app>/WEB-INF/classes/mail_templates/idam/
```

Editing a template on the production server takes effect on the next email send (no restart needed unless you've changed packaged classes).

## 5. Agent approval flow

The agent signup flow runs through the CRM. The unified approve/reject endpoint also decrypts the agent's stored name when surfacing to the admin.

1. Public agent signup → CRM lead created.
2. Super-admin opens the Manage tab → sees the lead.
3. Approve → agent record activated, mapped URLs and contacts populated.
4. Reject → lead closed; the public page shows a generic "Application closed" message.

## 6. Session & lockout management

- Sessions are tracked per device/location. View them under **Profile → Profile**.
- Force-logout a session via the row's menu.
- After 5 failed OTP attempts the account is auto-locked for 24 h. To unlock manually before that, clear the lockout flag in the user record (server-side query).

## 7. Email deliverability

If users report not receiving OTP/notification emails:

1. Check Tomcat `catalina.out` for SMTP errors.
2. Verify SMTP credentials in the application config (server-side).
3. Confirm the template is well-formed HTML — broken markup will cause some clients to silently drop the message.
4. Check rate limiting — max 3 OTP sends per 15 minutes per user.

## 8. Data hygiene

- Properties marked Rejected stay in the DB but are filtered from the public search.
- Mobile numbers in registration responses are stripped server-side before being shown to admins (privacy guard added on `0f6f77b2`).
- Duplicate email submissions on the public registration form are blocked at the API layer.

## 9. Ops cheat sheet

| Action | Where |
|---|---|
| Restart Tomcat | `systemctl restart tomcat` (verify your unit name) |
| Tail logs | `tail -f /opt/tomcat/latest/logs/catalina.out` |
| Edit mail template | `/opt/tomcat/latest/webapps/<app>/WEB-INF/classes/mail_templates/idam/` |
| Hot redeploy WAR | drop the new WAR into `/opt/tomcat/latest/webapps/` |
