# QA coverage report

## Current automated coverage map

| Feature | Automated status | Evidence |
|---|---|---|
| Money parsing/formatting | Implemented and tested | `tests/money.test.js` |
| Currency precision/conversion | Implemented and tested | `tests/currency.test.js` |
| FX adapter validation/cache due checks | Implemented and tested | `tests/exchange-rates.test.js` |
| Source balances/transfers/cash adjustments | Implemented and tested | `tests/ledger.test.js` |
| Goals/allocations/budgets | Implemented and tested for target/spending invariants | `tests/planning.test.js`, `tests/store-integration.test.js` |
| Monthly snapshots | Implemented and tested | `tests/snapshots.test.js` |
| Import boundary/security regression | Implemented and tested | `tests/import-validation.test.js` |
| Deterministic data and fixed clock helpers | Implemented and tested | `tests/helpers/seeded.js`, `tests/fixtures/` |
| Browser launch/source/expense/reload | Manual Chromium smoke passed | `docs/test-results.md` |
| Responsive overflow | Manual Chromium viewport smoke passed | `docs/test-results.md` |
| Accessibility automation | Not implemented in this pass | Follow-up |
| Visual regression | Not implemented in this pass | Follow-up |
| Firefox/WebKit/native Safari | Not performed in this pass | Follow-up |
| 2k/10k/50k ledger benchmark | Implemented and tested with a 1-second threshold | `tests/performance.test.js` |

## Interpretation

The passing count is a regression-suite count. Large JSON import/export timing and multi-tab conflict testing should still be repeated on target deployment hardware.
