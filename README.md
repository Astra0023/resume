# Software engineer portfolio

A React + TypeScript portfolio built with Vite and an interactive Three.js scene.

## Local development

Use Node.js 24 to match the GitHub Actions workflow and Vercel project.

```powershell
npm.cmd ci
npm.cmd run dev
```

```powershell
npm.cmd run lint
npm.cmd run build
```

On systems where PowerShell script execution is allowed, or on Linux/macOS,
use `npm` instead of `npm.cmd`.

## Editing the portfolio

- Update profile details, experience, education, skills, and projects in
  [src/data.ts](./src/data.ts).
- Replace each project's sample `liveUrl` with its deployed HTTPS URL.
- Update the layout in [src/App.tsx](./src/App.tsx) and styling in
  [src/index.css](./src/index.css).
- Update the page title and description in [index.html](./index.html).

## GitHub Actions deployment to Vercel

The [workflow](./.github/workflows/vercel.yml) runs lint and build checks for
pull requests targeting `main` and pushes to `main`. After checks pass, pushes
to `main` deploy production to Vercel. You can also run it manually from the
GitHub Actions tab; only a run on `main` deploys. Pull requests never deploy or
use Vercel credentials.

### One-time setup

1. Put this project in a GitHub repository with a `main` branch. Commit
   `package-lock.json` and the workflow along with the app.
2. Create a Vercel project for this repository. Set:

   | Setting | Value |
   | --- | --- |
   | Framework preset | Vite |
   | Root directory | Repository root |
   | Build command | `npm run build` |
   | Output directory | `dist` |
   | Node.js version | 24.x |

3. Link your local folder to that Vercel project:

   ```powershell
   npx.cmd vercel@latest login
   npx.cmd vercel@latest link
   ```

   Read `orgId` and `projectId` from the generated `.vercel/project.json`.
   The `.vercel` folder is ignored by Git.

4. Create a token in your Vercel account's **Settings > Tokens**, scoped to
   the account or team that owns the project.
5. In the GitHub repository, open **Settings > Secrets and variables >
   Actions** and add these repository secrets:

   | Secret | Value |
   | --- | --- |
   | `VERCEL_TOKEN` | Your Vercel token |
   | `VERCEL_ORG_ID` | The linked project's `orgId` |
   | `VERCEL_PROJECT_ID` | The linked project's `projectId` |

   Do not commit tokens or paste them into the workflow.
6. In GitHub **Settings > Environments**, configure the `production`
   environment. Optionally require reviewer approval and restrict deployments
   to `main`.
7. Disable automatic Git deployments for this Vercel project if you want
   GitHub Actions to be the only deployment path. Otherwise Vercel's Git
   integration can deploy independently, before these checks pass.
8. Push to `main` and check the workflow run. The deployment job builds
   Vercel output locally and deploys it with `--prebuilt`; the production URL
   appears in the run summary.

The initial CI build validates the application separately from Vercel's
production build, which includes the project's production settings.
If your production branch is not `main`, change both the workflow's branch
filters and its deployment condition.

Deployment cannot be verified locally without your Vercel project and
GitHub secrets. See [Vercel's GitHub Actions guide](https://vercel.com/guides/how-can-i-use-github-actions-with-vercel)
for the CLI deployment flow.
