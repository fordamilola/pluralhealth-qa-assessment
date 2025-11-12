
# Plural Health — QA Engineer Assessment

Cypress + Cucumber (BDD) automation for [SauceDemo](https://www.saucedemo.com/).  
Covers login flows for `standard_user`, `locked_out_user`, and `problem_user` using Page Objects, reusable commands, and a CI pipeline.

## Stack
- Cypress **13.6.4**
- @badeball/cypress-cucumber-preprocessor **18.0.4**
- @bahmutov/cypress-esbuild-preprocessor **2.2.7**
- esbuild **0.19.11**

## Install & Run
```bash
npm i
npm run cy:open   # open interactive runner
npm test          # headless run
```

## Project Structure
```
cypress/
  e2e/
    features/           # .feature (Gherkin)
  pageObjects/
  support/
    step_definitions/   # step definitions
    commands.js        # custom commands
.github/workflows/      # CI pipeline
```

## Credentials
- Usernames: `standard_user`, `locked_out_user`, `problem_user`
- Password: `secret_sauce`

## BDD Scenarios
- ✅ **standard_user** → logs in and lands on /inventory.html
- ❌ **locked_out_user** → error message visible
- ⚠️ **problem_user** → logs in; heuristic checks attempt to detect UI inconsistencies

## Reporting Expected vs Actual

| Scenario | Expected Result | Actual Result | Notes |
|---|---|---|---|
| standard_user | Redirected to products; title "Products" visible | ✅ Redirected to /inventory.html; "Products" title visible | Test passed successfully |
| locked_out_user | Error banner with text shown | ✅ Error message "Epic sadface: Sorry, this user has been locked out." displayed | Test passed successfully |
| problem_user | Logged in; potential UI issues detected by heuristics | ✅ Logged in successfully; detected 1 unique product image (expected 6+), indicating duplicate images | Heuristic successfully detected UI inconsistency |

## CI (GitHub Actions)
- Headless Cypress run on ubuntu-latest
- Caches npm deps for faster builds
- Artifacts (videos/screenshots) are disabled by default; you can enable via `video: true` in config

## Tips
- Keep step text descriptive and consistent (Given/When/Then).
- Prefer Page Objects & custom commands to avoid duplication.
- Add more `@tags` to filter runs, e.g., you can conditionally run scenarios by tag using plugin options if desired.
