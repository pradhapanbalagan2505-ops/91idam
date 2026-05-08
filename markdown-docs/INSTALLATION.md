# Installation & Deployment

## Prerequisites

| Tool | Version |
|---|---|
| Node.js | 18 or higher |
| npm | 9 or higher |
| Java | 11 or higher |
| Apache Tomcat | 9.x |
| Database | (see backend README — typically MySQL/Postgres) |

## Frontend — local development

```bash
cd 91idam-react
npm install
npm run dev_only          # Vite dev server on http://localhost:3000
```

### Other build modes

```bash
npm run dev               # Watch build into ../src/main/webapp/app (dev base path /vrpumps/app/)
npm run build             # Watch build into ../src/main/webapp/app (prod base path /app/)
npm run lint              # ESLint
npm run preview           # Preview production build
```

The build emits JS into `js/` and CSS into `css/` subdirectories so it slots cleanly into the WAR under `WEB-INF/`.

## Backend

The Java Struts2 backend lives alongside the React frontend in this repository (`src/`, `WebContent/`, `.classpath`, `.project`). Build the WAR with your IDE (Eclipse project files are checked in) or via Ant/Maven if a build file is present, then drop it into Tomcat's `webapps/`.

## Production deployment

Production server: `91idam.com`.

```
root@91idam.com:/opt/tomcat/latest        # Tomcat install
                /opt/tomcat/latest/webapps # WAR drop point
                WEB-INF/classes/mail_templates/idam/  # mail templates
```

Common deploy steps:

1. Build the React bundle into `src/main/webapp/app` (`npm run build`).
2. Build the WAR.
3. SCP the WAR to `/opt/tomcat/latest/webapps/`.
4. Tomcat hot-deploys; if not, restart with `systemctl restart tomcat` (verify your service unit name).
5. Tail `catalina.out` for boot errors.

## Environment

- **Dev API base** — `http://localhost:8080/vrpumps`
- **Prod API base** — `https://api.vrpumps.com/vrpumps` (see `src/functions/Utils.js`)
- **Hash routing** — the frontend uses `HashRouter`, so deep links look like `https://91idam.com/#/search-property`

