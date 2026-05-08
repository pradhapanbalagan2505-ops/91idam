# 91 IDAM — Documentation

> Tech-enabled real estate platform. React 18 + Java Struts2 + Tomcat + Zoho CRM.
> Live: https://91idam.com

This directory holds the written user-and-admin documentation for 91 IDAM. The HTML portal at `../docs-portal/` renders these files with sidebar navigation and search. The screenshot script at `../scripts/screenshots/` can capture annotated walkthrough images against a running dev build.

## Map

| Document | What it covers |
|---|---|
| [INSTALLATION.md](./INSTALLATION.md) | Local setup, builds, deployment to Tomcat |
| [USER_GUIDE.md](./USER_GUIDE.md) | End-user workflows: search, contact, list a property, manage account |
| [ADMIN_GUIDE.md](./ADMIN_GUIDE.md) | Super-admin and franchise-admin operations |
| [FEATURES.md](./FEATURES.md) | Master feature list (curated from `91IDAM_Project_Features.md`) |
| [FAQ.md](./FAQ.md) | Common user and admin questions |
| [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) | Known issues, fixes, debug tips |
| [CHANGELOG.md](./CHANGELOG.md) | Release history |

### Module guides

Per-screen reference under `modules/`:

- [Home](./modules/home.md)
- [Search Property](./modules/search-property.md)
- [Property Details](./modules/property-details.md)
- [Our Agents](./modules/our-agents.md)
- [Agent Detail](./modules/agent-detail.md)
- [User Profile](./modules/user-profile.md)
- [Start Selling](./modules/start-selling.md)
- [Authentication](./modules/authentication.md)
- [About](./modules/about.md)
- [Why IDAM](./modules/whyidam.md)
- [How It Works](./modules/howitworks.md)
- [Careers](./modules/careers.md)
- [Contact](./modules/contact.md)

## Roles at a glance

| Role | Can |
|---|---|
| **Super Admin** | Approve properties, manage users, create franchise orgs, full access |
| **Franchise Admin** | Manage own franchise org, users and properties |
| **Agent** | Create and view properties only |
| **Admin (Org)** | CRUD within their org |
| **User (Org)** | Create and read within their org |

## Tech stack

- **Frontend** — React 18, Vite 5, Redux Toolkit, React Router v6, Tailwind v4
- **Backend** — Java Struts2 on Apache Tomcat 9
- **CRM** — Zoho (lead/agent flow)
- **Mail** — SMTP with templated layouts under `WEB-INF/classes/mail_templates/idam/`
- **Hosting** — Production at `root@91idam.com`, Tomcat at `/opt/tomcat/latest`
