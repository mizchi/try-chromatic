# My Chromatic Playground for VRT

Storybook with Chromatic VRT (My) Workflow example.

## Stack

- Vite+React
- storybook
  - addons-coverage
- chromatic
  - VRT

## Setup

```bash
$ git clone https://github.com/mizchi/try-chromatic
$ cd try-chromatic
$ corepack enable pnpm
$ pnpm install
```

## Try (your) chrmatic

- Create your chromatic account https://www.chromatic.com/
- Local
  - Put `.env`: `CHROMATIC_PROJECT_TOKEN=<your-key>`
- CI
  - `gh secret set CHROMATIC_PROJECT_TOKEN` and enter your key

## VRT on PR

Example

```yaml
# .github/workflows/chromatic.yaml
name: "Chromatic"
on:
  pull_request:
    types: [opened, reopened, synchronize, ready_for_review]
    paths:
      - 'src/**/*.css'
      - 'src/**/*.tsx'
      - 'src/**/*.stories.tsx'
jobs:
  build:
    runs-on: ubuntu-22.04
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
          ref: ${{ github.event.pull_request.head.ref }}
      - name: Install pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 9.9.0+sha256.7a4261e50d9a44d9240baf6c9d6e10089dcf0a79d0007f2a26985a6927324177
      - name: Use Node.js v22
        uses: actions/setup-node@v4
        with:
          node-version: v22
          cache: 'pnpm'
      - name: Install dependencies
        run: pnpm install
      - name: Run Chromatic
        uses: chromaui/action@latest
        with:
          projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
          # Enable turbosnap to detect changed components
          onlyChanged: true
          exitZeroOnChanges: true
          # autoAcceptChanges: true
```

`git push origin your-branch`

To reduce VRT check counts (to keep 5000/month), I reccomend `onlyChanged` options.

## VRT with coverage (Local)

```bash
# Setup coverage
$ pnpm exec playwright install
$ pnpm exec playwright install-deps

# Run local storybook
$ pnpm dev:storybook
# -----
$ pnpm test:storybook:cov

> test-storybook --url http://127.0.0.1:9009 --coverage

 PASS   browser: chromium  src/Button.stories.tsx
 PASS   browser: chromium  src/App.stories.tsx

Test Suites: 2 passed, 2 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        1.08 s
Ran all test suites.
Coverage file (7219 bytes) written to .nyc_output/coverage.json
------------|---------|----------|---------|---------|-------------------
File        | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
------------|---------|----------|---------|---------|-------------------
All files   |   81.81 |      100 |      60 |   88.88 |                   
 App.tsx    |      75 |      100 |      50 |   83.33 | 11                
 Button.tsx |     100 |      100 |     100 |     100 |                   
------------|---------|----------|---------|---------|-------------------
```

## LICENSE

MIT