[![CI](https://github.com/ashutoshfolane/cypress-swag-labs/actions/workflows/ci.yml/badge.svg)](https://github.com/ashutoshfolane/cypress-swag-labs/actions/workflows/ci.yml)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18-brightgreen)
![Cypress](https://img.shields.io/badge/cypress-13.x-green)
![TypeScript](https://img.shields.io/badge/typescript-5.x-blue)

# cypress-swag-labs

Web automation framework built with **Cypress + TypeScript**, using the **Swag Labs** application as a reference implementation.

The framework is designed to be **scalable, maintainable, and CI-ready**, and can be easily adapted for real-world enterprise web applications.

---

## 🚀 What This Repository Provides

- End-to-end UI automation for a modern web application
- Clean Cypress + TypeScript architecture
- Environment-aware execution (local / CI / stage-ready)
- Tagged test execution (smoke vs regression)
- CI integration with reporting artifacts
- Opinionated structure aligned with real production teams

---

## 🧱 Tech Stack

- **Test Runner:** Cypress (latest stable)
- **Language:** TypeScript
- **Package Manager:** npm
- **Linting / Formatting:** ESLint + Prettier
- **Reporting:**
  - Mochawesome (HTML + JSON)
  - JUnit XML (CI-friendly)
- **CI/CD:** GitHub Actions
- **Environment Management:** dotenv (`env/.env.*` pattern)

---

## 📂 Project Structure

```text
cypress-swag-labs/
├── .github/
│   └── workflows/
│       └── ci.yml              # CI pipeline
├── cypress/
│   ├── api/                    # API helpers (e.g., auth)
│   ├── e2e/                    # Test specs
│   ├── fixtures/               # Test data
│   ├── pages/                  # Page Objects
│   └── support/
│       ├── commands.ts         # Custom Cypress commands
│       ├── e2e.ts              # Global hooks
│       ├── env.ts              # Env loader
│       └── selectors.ts        # Centralized selectors
├── env/
│   └── .env.example            # Commit-safe env template
├── reports/                    # Generated test reports (ignored)
├── cypress.config.ts           # Cypress configuration
├── package.json
├── tsconfig.json
└── README.md
```
⸻

✅ Prerequisites
	•	Node.js (version enforced via .nvmrc)
	•	npm
	•	Git

Recommended:
```
nvm install
nvm use
```

⸻

⚙️ Local Setup

1️⃣ Install dependencies
```
npm ci
```
2️⃣ Configure environment variables

Create a local env file:
```
cp env/.env.example env/.env.local
```
Update values in env/.env.local as needed.

⚠️ Never commit real .env files — they are git-ignored by design.

⸻

▶️ Running Tests Locally

Open Cypress Test Runner (interactive)
```
npm run cy:open
```
Run all tests (headless)
```
npm run cy:run
```
Run smoke tests only
```
npm run cy:run:smoke
```
Run regression tests only
```
npm run cy:run:regression
```
Tests are tagged using @smoke and @regression and filtered via Cypress env configuration.

⸻

🧪 Test Tagging Strategy
```
it('loads the application @smoke', () => {
  cy.visit('/');
});

it('logs in successfully @regression', () => {
  cy.loginBySession();
});
```
This allows:
	•	Fast smoke runs on every PR
	•	Full regression runs on demand or scheduled CI

⸻

📊 Reporting

Local
	•	Mochawesome HTML reports generated after runs
	•	Stored under reports/ (git-ignored)

CI
	•	JUnit XML for CI systems
	•	Screenshots & videos captured on failures
	•	Artifacts uploaded for debugging

⸻

🤖 Continuous Integration
	•	GitHub Actions pipeline runs on:
	•	Pull Requests
	•	Pushes to main
	•	Enforces:
	•	Dependency installation
	•	Cypress execution
	•	Report generation
	•	CI must be green before merge (branch protection enabled)

⸻

🔒 Git & Repo Hygiene
	•	Secrets managed via .env files (never committed)
	•	Generated artifacts ignored via .gitignore
	•	main branch protected
	•	CI required before merge

⸻

🧭 Design Principles
	•	Maintainability first (clear structure, typed helpers)
	•	Fast feedback loops (smoke vs regression separation)
	•	Production realism (CI, reports, env isolation)
	•	Scalable patterns (Page Objects, API helpers, custom commands)

⸻

📈 Possible Extensions

This framework is intentionally designed to support:
	•	Parallel execution
	•	Visual testing (Percy / Applitools)
	•	API-only test suites
	•	Network stubbing & contract testing
	•	Cross-browser scaling

---
