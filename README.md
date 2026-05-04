# nordicmedialab.dk

Marketing site for Nordic Media Lab. Built with React + Vite, styled with Tailwind, with i18next for translations (Danish/English).

## Development

```bash
npm install
npm run dev      # start dev server with HMR
npm run lint     # run ESLint
npm run build    # production build to dist/
npm run preview  # preview the production build locally
```

## Deployment

Pushes to `main` deploy automatically to Netlify. Pull requests get preview deploys via the same Netlify GitHub integration.

## CI

GitHub Actions runs lint and build on every push and pull request — see `.github/workflows/ci.yml`.
