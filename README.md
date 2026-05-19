# Enterprise Playwright Framework

Simple, scalable, enterprise-ready Playwright automation framework built with TypeScript and Playwright Test for ecommerce-style web applications.

This project is intentionally designed to stay easy to read, easy to debug, and easy for new QA engineers to extend. It avoids heavy abstraction, unnecessary design patterns, and hard-to-maintain framework code.

## What this framework includes

- Playwright + TypeScript + Playwright Test Runner
- Lightweight Page Object Model
- JSON-based test data
- Environment management with `.env` files
- Reusable authentication with storage state
- Parallel execution support
- Built-in Playwright reporting only
- CI/CD examples for GitHub Actions and Azure DevOps
- ESLint, Prettier, and clean npm scripts

## Project structure

```text
.
|-- .github/
|   `-- workflows/
|       `-- playwright.yml
|-- config/
|   |-- environment.ts
|   |-- messages.ts
|   `-- routes.ts
|-- fixtures/
|   `-- test.fixture.ts
|-- helpers/
|   |-- logger.ts
|   `-- test-tags.ts
|-- pages/
|   |-- base.page.ts
|   |-- cart.page.ts
|   |-- header.page.ts
|   |-- home.page.ts
|   |-- login.page.ts
|   `-- product.page.ts
|-- reports/
|-- test-data/
|   |-- auth/
|   |   `-- users.json
|   |-- categories/
|   |   `-- categories.json
|   |-- products/
|   |   `-- products.json
|   `-- search/
|       `-- search-terms.json
|-- tests/
|   |-- auth/
|   |   |-- auth.setup.ts
|   |   `-- login.spec.ts
|   |-- cart/
|   |   `-- add-to-cart.spec.ts
|   |-- navigation/
|   |   `-- category-navigation.spec.ts
|   `-- search/
|       |-- search-empty-state.spec.ts
|       `-- search-validation.spec.ts
|-- utils/
|   |-- path-utils.ts
|   |-- test-data-loader.ts
|   `-- wait-utils.ts
|-- .env.example
|-- .env.prod
|-- .env.qa
|-- .env.staging
|-- .eslintrc.cjs
|-- .prettierrc
|-- azure-pipelines.yml
|-- package.json
|-- playwright.config.ts
|-- README.md
`-- tsconfig.json
```

## Design principles

- Keep tests readable for beginner and senior engineers alike.
- Prefer clear business actions over framework cleverness.
- Use Playwright auto-waiting instead of hard waits.
- Keep page objects lightweight and focused on user interactions.
- Keep test data separate from test logic.
- Make failures easy to understand from assertions, traces, screenshots, and videos.

## Environment management

The framework supports multiple environments through `.env` files:

- `.env.qa`
- `.env.staging`
- `.env.prod`

Set the target environment with `TEST_ENV`.

Examples:

```bash
npm run test:qa
npm run test:staging
npm run test:prodlike
```

You can also override values from the shell or CI:

```bash
TEST_ENV=qa BASE_URL=https://qa.your-store.com npm test
```

## Authentication approach

Authentication is kept simple:

- `tests/auth/auth.setup.ts` logs in once per project run
- storage state is saved to `.auth/user.json`
- browser projects reuse that state for faster execution
- login tests explicitly disable storage state so the real login UI is still validated

Why this is useful:

- reduces repeated UI logins
- speeds up suites in parallel
- keeps authenticated tests isolated from login test coverage

## Parallel execution strategy

Parallel execution is enabled in `playwright.config.ts` with:

- `fullyParallel: true`
- `workers: 4` in CI
- isolated browser contexts per test
- reusable storage state for authenticated flows

Guidelines for safe scaling:

- every test should manage its own state
- avoid depending on test order
- avoid shared mutable test data
- use unique accounts or seed data when your application requires strict isolation

## Locator strategy

Preferred selectors in this framework:

- `getByRole()`
- `getByLabel()`
- `getByText()`
- `getByTestId()`

Avoid:

- brittle XPath
- deeply chained CSS selectors
- hardcoded waits

## Reporting and debugging

Only Playwright built-in reporting is used:

- HTML report
- traces on failure
- screenshots on failure
- videos on failure
- JUnit XML for CI systems

Useful commands:

```bash
npm run test:report
npm run test:debug
npm run test:ui
```

Debugging flow:

1. Run the failed suite with `--headed` or `--debug`.
2. Open the HTML report and inspect the failure steps.
3. Open the trace for the failed test.
4. Check screenshots and video for UI timing or selector issues.

## Setup

### 1. Install dependencies

```bash
npm ci
```

### 2. Install Playwright browsers

```bash
npx playwright install
```

### 3. Configure environment values

Copy `.env.example` values into your environment-specific `.env` files and update:

- `BASE_URL`
- `USERNAME`
- `PASSWORD`

### 4. Run the full suite

```bash
npm test
```

## Execution commands

```bash
npm test
npm run test:headed
npm run test:debug
npm run test:ui
npm run test:smoke
npm run test:auth
npm run test:cart
npm run test:search
npm run test:navigation
npm run test:chrome
npm run test:firefox
npm run lint
npm run typecheck
npm run format:check
```

Run one file:

```bash
npx playwright test tests/cart/add-to-cart.spec.ts
```

Run one test by name:

```bash
npx playwright test -g "shopper can add an item to cart"
```

## How to add a new test

1. Create a new spec file under the right business area in `tests/`.
2. Reuse existing page objects from `pages/`.
3. Add missing business actions to a page object only when they will be reused.
4. Keep assertions in the test so the behavior stays obvious.
5. Move reusable input data into `test-data/` JSON files.

## How to add a new page object

1. Create a focused class in `pages/`.
2. Add only the locators and actions that belong to that page.
3. Prefer accessible locators and `data-testid`.
4. Register it in `fixtures/test.fixture.ts` if many tests will share it.

## Notes for real application teams

This sample uses generic ecommerce selectors to keep the framework reusable across storefronts. In a real project, update the following first:

- `.env.*` base URLs and credentials
- locator mappings inside page objects
- route paths in `config/routes.ts`
- test data values in `test-data/`

If your application has API support for test data creation, add that as a helper rather than pushing complexity into the UI layer.

## CI/CD

Included pipeline examples:

- GitHub Actions: `.github/workflows/playwright.yml`
- Azure DevOps: `azure-pipelines.yml`

Both examples:

- install dependencies
- install Playwright browsers
- run tests in parallel-friendly browser matrix jobs
- publish Playwright reports as artifacts

## Long-term maintainability tips

- Keep page objects small.
- Prefer adding helpers only when repetition becomes real.
- Keep assertions near tests.
- Standardize `data-testid` usage with developers.
- Review flaky tests quickly before they spread.
- Do not hide browser behavior behind deep framework layers.

## Final recommendation

Use this framework as a strong starter template, then tune selectors and environment values to your actual ecommerce application. The structure is built to scale across teams while staying approachable for new QA engineers.
