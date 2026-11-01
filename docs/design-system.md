# Ledger design system

Ledger uses a quiet, system-native visual language inspired by Apple first-party apps.

## Tokens

`styles/tokens.css` is the source of truth for spacing, typography, color, radius, elevation, motion, and stacking order. Spacing follows a 4px base unit and an 8px rhythm. New UI should use tokens rather than one-off values.

## Hierarchy

Each screen has one page heading, a prominent primary financial value, subordinate section headings, and quieter metadata. Financial values use tabular numerals and currency-aware `Intl.NumberFormat`.

## Components

Primary actions use `.primary-button`; supporting actions use `.secondary-button`; destructive actions use `.danger-button`. Inputs use persistent labels, a minimum 44px touch height, visible focus, and grouped helper/error text. Sheets are constrained and internally scrollable.

## Motion

Interaction motion is short and interruptible. Press feedback is immediate, sheet entrance uses transform/opacity, and `prefers-reduced-motion` removes nonessential movement.

## Deviations

The application remains dependency-free and uses native HTML controls enhanced with styled listbox menus. This preserves form semantics and offline operation while matching the visual system.
