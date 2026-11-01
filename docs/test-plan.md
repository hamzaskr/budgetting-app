# QA test plan

## Scope

This plan covers the local-first ledger, integer minor-unit accounting, source balances, transactions, transfers, reconciliation, goals, allocations, budgets, snapshots, FX integration, import/export, persistence, responsive UI, accessibility heuristics, security boundaries, and local performance.

## Test environments

- **Unit/integration:** Node.js built-in `node:test`, deterministic fixtures, no network.
- **Browser smoke:** Chromium via the local HTTP server and a fresh localStorage context.
- **Data isolation:** synthetic fixtures only; browser smoke starts by clearing the test origin's `personal-finance.ledger.v1` key. Production storage is never opened by the tests.
- **Clock/randomness:** `tests/helpers/seeded.js` provides a fixed LCG and fixed clock helpers.

## Required suites

| Area | Positive | Negative/boundary | Integration |
|---|---|---|---|
| Money/currency | parsing, formatting, conversion | malformed values, missing/invalid rates, JPY/BHD precision | transaction conversion metadata |
| Ledger | income, expense, transfer, cash adjustment | insufficient funds, archived sources, invalid types | source totals and conservation |
| Planning | goal, allocation, budget fixture shape | overfunded goal and optional values | goal movement persistence |
| Snapshots | monthly totals | month boundaries and revisions | persistence-triggered generation |
| FX | valid provider payload | HTTP, wrong base, malformed rates, offline path | cached/manual refresh |
| Data | backup-shaped fixture | hostile IDs and invalid references | import persistence round-trip |
| UI | launch, add source, expense, reload | narrow viewport and empty states | route/navigation smoke |

Visual regression, axe-core scanning, Firefox/WebKit projects, and physical-device testing remain separate follow-up work.
