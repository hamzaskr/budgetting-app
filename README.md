# Ledger

Ledger is a local-first personal finance application built with HTML, CSS, and native JavaScript ES modules. It uses `localStorage` only and makes no network requests during normal operation.

## Run locally

From this directory, run `start.bat` on Windows or `./start.sh` on macOS/Linux, then open <http://localhost:8000>.

## Deploy to GitHub Pages

This repository is configured to deploy automatically from `main` through GitHub Actions.

1. Push the project to `https://github.com/hamzaskr/budgetting-app`.
2. In GitHub, open **Settings → Pages**.
3. Under **Build and deployment**, choose **GitHub Actions**.
4. Push to `main` or run **Deploy Ledger to GitHub Pages** from the **Actions** tab.
5. Open `https://hamzaskr.github.io/budgetting-app/`.

The app is installable from supported mobile browsers and caches its static application shell for offline use. Financial records remain in each device's localStorage; hosting does not synchronize records between devices. Export a JSON backup from **Settings → Data** before moving data to another device.

## Current functionality

- Cash and digital source opening balances
- Integer minor-unit money calculations with ISO currency precision
- Recorded expenses, income, and transfers with insufficient-funds checks
- Digital reconciliation checkpoints and physical cash count adjustments
- Overview, activity, source details, goals, budgets, allocations, settings, and reports
- JSON backup/restore and spreadsheet-safe transaction CSV export
- Category management, default source preferences, archiving, and goal contributions
- Activity search/filter/editing, spending calendar, monthly snapshots, reminders, and reusable templates
- Custom accessible dropdown menus with contextual hover guidance and live thousands-separated amount entry
- Adaptive navigation: collapsible desktop sidebar, compact laptop rail, and bottom navigation for tablet and mobile
- Icon-led navigation with accessible labels, responsive sheets, and viewport-safe dropdown menus
- Centralized design tokens, motion states, reduced-motion support, resilient form submission, and accessibility/UX specifications in `docs/`
- Multi-currency display and input support with cached PKR-based reference rates, locked transaction conversions, foreign-currency goals, offline fallback, and optional automatic refresh
- Privacy masking and responsive light/dark-ready design tokens
- Local persistence and cross-tab revision refresh

The application intentionally does not connect to banks or wallets. External activity is represented only when manually recorded or reconciled. The optional exchange-rate refresh requests only a public rate table; no account names, balances, transaction amounts, notes, or financial history leave the device.

## Tests

Run `npm test` for the full deterministic regression suite, `npm run test:coverage` for Node coverage, and `npm run test:stress` for 2,000/10,000/50,000-record ledger checks. Browser interactions should be smoke-tested from the local server.

## Data safety

Use **Settings → Data** to export a complete JSON backup or a transaction CSV. JSON import validates the schema before replacing local state and asks for confirmation. Reset requires explicit confirmation. No bank or wallet credentials are collected, and no external synchronization is attempted.

Reports intentionally distinguish recorded activity from external digital activity that has not been entered individually. Reminders and templates never post a transaction without explicit confirmation.
