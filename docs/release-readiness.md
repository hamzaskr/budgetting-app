# Release readiness

## Decision

**Ready for local-first production use with documented platform limitations.** The core ledger, import boundary, planning calculations, persistence round trips, responsive behavior, accessibility heuristics, and local performance checks now have executable regression coverage.

## Evidence

- Automated regression suite: **25/25 passing**.
- Chromium smoke flow: launch, source creation, expense, reload persistence, and narrow-to-desktop overflow checks passed.
- One high-confidence stored-XSS import vulnerability was found and fixed, with a regression test.
- Deterministic standard, edge-case, and large-transaction fixture generators are present.

## Remaining validation limitations

1. Native Safari and physical devices were not available; Chromium responsive emulation is not a substitute.
2. Formal axe-core scanning and screenshot baseline comparison are not bundled because the app remains dependency-free; manual accessibility heuristics and browser smoke checks passed.
3. Large JSON import/export timing and multi-tab conflict testing should be repeated on target deployment hardware.

## Explicit limitations

Native Safari and physical devices were not tested. WebKit testing, when added, must not be described as Safari certification. The app has no server authentication and localStorage should be treated as user-controlled local data, not encrypted storage.
