# Deploying this app to GitHub Pages (without GitHub Actions)

This repository hosts multiple apps under the same Pages site:

- https://aymaneonline.github.io/frontendmentor/app1
- https://aymaneonline.github.io/frontendmentor/app2
- https://aymaneonline.github.io/frontendmentor/rest-countries-api-with-color-theme-switcher-master  ← this app

This app is configured to build for the subpath above and to be deployed locally using the `gh-pages` CLI.

## One-time setup

1) Ensure GitHub Pages is enabled for this repo:
   - Repo Settings → Pages
   - Build and deployment: Source = "Deploy from a branch"
   - Branch = `gh-pages`, folder = `/ (root)`

2) Make sure your local git is authenticated to push to the repo (SSH or HTTPS).

## Deploy steps

From the app folder (`rest-countries-api-with-color-theme-switcher-master`):

1) Install deps

```bash
npm install
```

2) Build the app (Vite uses the correct base for this subpath)

```bash
npm run build
```

3) Publish the built files to the `gh-pages` branch under this app's subdirectory. The script now also creates a `404.html` (copy of `index.html`) to improve compatibility with tools (like Frontend Mentor screenshot) and optional future switch to BrowserRouter.

```bash
npm run deploy
```

This runs:

```bash
npm run build && cp dist/index.html dist/404.html && gh-pages -d dist --dest rest-countries-api-with-color-theme-switcher-master --add
```

## Resulting URL

- https://aymaneonline.github.io/frontendmentor/rest-countries-api-with-color-theme-switcher-master/

## Notes

- Router: The app uses `createHashRouter` so deep links work on Pages without custom rewrites. Some automated screenshot tools may ignore the hash portion; providing `404.html` helps if you later switch to `BrowserRouter`.
- Asset paths: `vite.config.js` sets `base` to `/frontendmentor/rest-countries-api-with-color-theme-switcher-master/` in production.
- Multi-app safety: always include `--dest <app-folder>` and `--add` to avoid overwriting other apps on the `gh-pages` branch.
- Frontend Mentor screenshot tip: If their tool still shows a blank view, try temporarily switching to `createBrowserRouter` and deploy again (404.html will serve the SPA for deep paths). Revert to hash router afterwards if you prefer.
