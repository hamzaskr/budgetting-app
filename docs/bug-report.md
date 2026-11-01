# QA bug report

## Fixed during this QA pass

### QA-001 — Hostile backup identifiers could reach HTML attributes

- **Severity:** High
- **Status:** Fixed
- **Area:** Import validation and rendering boundary
- **Impact:** A crafted backup could inject markup through an identifier or unsupported enum value and execute script when the UI re-rendered.
- **Fix:** Strict identifier, source type, transaction type, reference, amount, and text validation in `store.importState()`.
- **Regression:** `tests/import-validation.test.js`

### QA-002 — Archived sources could accept new transactions

- **Severity:** Medium
- **Status:** Fixed
- **Area:** Transaction mutation
- **Impact:** Archived accounts were still selectable through direct store calls and could receive new activity.
- **Fix:** `addTransaction()` now requires a valid active source.
- **Regression:** `tests/import-validation.test.js`

### QA-003 — Goal contributions could not represent overfunding

- **Severity:** Medium
- **Status:** Fixed
- **Area:** Goal movements
- **Impact:** Contributions were clamped to the target, losing the relationship between recorded movements and the goal's actual funded amount.
- **Fix:** Contributions now preserve the full positive amount, allowing explicit overfunded goals.
- **Regression:** `tests/import-validation.test.js`

## Open risks

- The application has no server-side authentication or encryption; localStorage is accessible to scripts running in the same origin.
- Import validation is structural rather than a complete versioned schema validator for every optional entity.
- Browser accessibility and visual regression need dedicated automation and manual assistive-technology review.
