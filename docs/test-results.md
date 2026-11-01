# QA test results

## Test clock

The deterministic fixtures use `2026-11-01T12:00:00+05:00`. Browser smoke used a clean local origin and did not modify production storage.

## Automated results

- Command: `npm test`
- **25 passed, 0 failed, 0 skipped**
- Duration of final run: approximately 1.19 seconds.
- Coverage includes money, currency, FX response validation, seeded fixture reproducibility, ledger invariants, snapshots, import validation, archived-source rejection, and overfunded goals.

## Browser smoke results

Chromium on `http://127.0.0.1:8000`:

1. Empty overview loaded without a fatal error.
2. A synthetic source was created.
3. A simple expense reduced the displayed balance correctly.
4. Reload preserved the balance and the versioned localStorage key.
5. Viewports 320x568, 375x812, 768x1024, 1024x768, and 1440x900 reported no horizontal overflow.
6. Modal focus stayed contained during Tab navigation, Escape dismissed the sheet, and focus returned to the opener.
7. Visible buttons and form controls had accessible names or labels in the smoke DOM audit.

## Security

The security review identified and the implementation fixed one high-confidence stored-XSS issue: imported IDs and transaction fields were insufficiently validated before being used in HTML templates. Import now rejects unsafe identifiers, unsupported source/transaction types, invalid references, non-safe amounts, and malformed transaction text.

This fix is covered by `tests/import-validation.test.js`.

The expanded suite includes reconciliation/import integration, planning calculations, and 2,000/10,000/50,000-record performance thresholds.

## Not performed

Native Safari, Firefox, WebKit, physical devices, axe-core automated scans, screenshot baseline comparison, and live exchange-provider smoke testing were not performed in this run.
