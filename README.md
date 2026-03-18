# Anime Explorer

Anime Explorer is a small frontend built with Next.js and GraphQL. It lists anime from a GraphQL API and provides a detail page for each anime.

## Key features

- Built with Next.js (app router) and TypeScript
- Fetches data from a GraphQL API
- List view (overview) and detail page for each anime
- Unit tests for components (Jest + React Testing Library)
- End-to-end tests using Playwright
- Husky pre-commit hook that runs lint-staged and Playwright headless before commits
- Enforced Conventional Commits for commit messages

## Project structure (top-level)

- `src/app` — Next.js app routes and pages
- `src/components` — UI components including `AnimeCard`
- `src/lib` — helper utilities (e.g. GraphQL fetcher)
- `src/graphql` — GraphQL queries
- `src/types` — shared TypeScript types
- `e2e` — Playwright tests

## Getting started

1. Install dependencies

```bash
npm install
# or
pnpm install
# or
yarn install
```

2. (Optional) Install Playwright browsers for local E2E runs

```bash
npx playwright install
```

3. Run the dev server

```bash
npm run dev
```

Open http://localhost:3000 to view the app.

### Quick examples

- Run unit tests only:

```bash
npm run test
```

- Run Playwright E2E tests (headless by default):

```bash
npm run test-e2e
```

- Run Playwright UI mode (opens the Playwright test runner UI):

```bash
npm run test-e2e-ui
```

- Run unit + E2E together:

```bash
npm run test-all
```

## Testing details

### Unit tests

This project uses Jest and React Testing Library for unit testing. Tests live next to the components (for example `src/components/AnimeCard/AnimeCard.test.tsx`). Run unit tests with:

```bash
npm run test
```

### End-to-end tests (Playwright)

Playwright tests to run using UI:

```bash
npm run test-e2e-ui
```

For CI or headless runs:

```bash
npm run test-e2e
```


## Deployment

The app is deployed on Vercel at:

https://frontend-assessment-phi.vercel.app/
