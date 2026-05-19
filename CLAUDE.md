# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Personal portfolio site for Victor Andrade (https://victorandra.de). Single-page React 18 + TypeScript app bootstrapped with Create React App (`react-scripts` 5), deployed to GitHub Pages.

## Commands

- `npm start` — dev server at http://localhost:3000
- `npm run build` — production build into `build/`
- `npm test` — Jest in interactive watch mode (CRA's test runner)
- `npm test -- --watchAll=false` — single CI-style run
- `npm test -- --watchAll=false src/components/__tests__/Footer.test.tsx` — run a single test file
- `npm test -- -t "renders all social links"` — run tests matching a name
- `npm run lint` — ESLint over `src/**/*.ts` (config: `react-app` + `react-app/jest` from `package.json`)
- `npm run deploy` — `gh-pages -d build` (note: usual deploys happen via GitHub Actions, see below)

Node `>=18` is required (`engines` in [package.json](package.json)).

## Architecture

### Data-driven sections from JSON in `public/`

[src/App.tsx](src/App.tsx) is the orchestrator. On mount it does two axios requests against files served from `public/`:

- `portfolio_shared_data.json` — language-independent data: name, social links, profile image, skill icon classes. Held in `sharedData` state.
- `res_primaryLanguage.json` (pt) or `res_secondaryLanguage.json` (en) — localized copy: section titles, about text, projects, experience entries. Held in `resumeData` state and re-fetched whenever the user toggles language via the flag icons in the header strip.

Each section component (`About`, `Projects`, `Skills`, `Experience`, `Footer`) is a presentation layer that receives slices of `sharedData` and `resumeData` as props (`sharedBasicInfo`, `resumeBasicInfo`, etc.) and renders from them inside a `useEffect`. The components do not fetch their own data — all I/O happens in `App.tsx`. When adding a new section, follow that pattern: add the data to the JSON files, slice it in `App.tsx`, and pass it down as props.

### Theming

Theme is toggled by mutating the `data-theme` attribute on `document.body` from inside [src/components/Header.tsx](src/components/Header.tsx) (`setTheme`). Light/dark variants live in [src/scss/themes/](src/scss/themes/) and are both imported by [src/App.scss](src/App.scss); selectors are scoped by `[data-theme="dark"]` / `[data-theme="light"]`. The `ProjectDetailsModal` slider has its own dark/light SCSS modules ([src/scss/dark-slider.scss](src/scss/dark-slider.scss), [src/scss/light-slider.scss](src/scss/light-slider.scss)) passed via `cssModule` to `react-awesome-slider`. The ambient module declaration for `*.scss` is in [declaration.d.ts](declaration.d.ts).

### Animation/UI dependencies

- `typed.js` wraps in [src/components/TypedText.tsx](src/components/TypedText.tsx). The Typed instance is created in `useEffect` and disposed in the cleanup — always go through this component instead of instantiating `Typed` directly.
- `react-vertical-timeline-component` renders the experience timeline.
- `react-awesome-slider` + `react-bootstrap` `Modal` render the project gallery in `ProjectDetailsModal`.
- `@iconify/react` is used for inline icons; legacy `devicon` / `fontawesome` class names also appear (e.g. `fab fa-github`) because they come from the JSON data files.

## Testing

Tests live in [src/components/__tests__/](src/components/__tests__/) using `@testing-library/react` + `jest-dom`. [src/setupTests.ts](src/setupTests.ts) silences the `ReactDOMTestUtils.act` deprecation warning that the test renderer emits with React 18 — don't remove that suppression or the test output gets noisy.

Components receive their data as props, so tests construct mock `sharedBasicInfo` / `resumeBasicInfo` objects locally (see [Footer.test.tsx](src/components/__tests__/Footer.test.tsx)) rather than mocking axios.

## CI/CD

[.github/workflows/deploy.yml](.github/workflows/deploy.yml) runs `install → lint → test (with coverage) → build → deploy` on pushes and PRs to `master`/`main`. The `deploy` job only runs on `master`/`main` and publishes to GitHub Pages via `actions/deploy-pages`. Lint and test are gating — a failure in either blocks the build/deploy.

## TypeScript notes

`tsconfig.json` targets ES5, `strict: true`, `jsx: react-jsx`. Many props are still typed `any` (e.g. `sharedBasicInfo: any`, `resumeProjects: any`) because they come from untyped JSON; preserve this rather than introducing partial types that don't match the JSON shape.
