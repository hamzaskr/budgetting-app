# Accessibility checklist

- [x] Persistent labels are used for monetary and settings inputs.
- [x] Navigation controls have accessible names and SVG icons marked decorative.
- [x] Keyboard focus is visible.
- [x] Sheets expose `role="dialog"`, `aria-modal`, and a labelled heading.
- [x] Escape closes open sheets.
- [x] Native selects remain in the DOM for semantics and form serialization.
- [x] Touch controls target at least 44px where practical.
- [x] Reduced motion and reduced transparency preferences are respected.
- [x] Errors remain adjacent to the active sheet and use `role="alert"`.
- [x] Horizontal overflow is checked at compact, tablet, and desktop widths.

Manual QA should additionally verify keyboard tab order, screen-reader announcements, contrast with the active theme, and 200% text zoom.
