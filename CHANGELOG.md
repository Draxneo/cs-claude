# Changelog — Carnes & Sons Owner App

Versioning: vMAJOR.MINOR.PATCH. Every entry is a recoverable Git commit; roll back by reverting to a prior version's commit.

## v1.1.5 — 2026-06-07
- Real fix for the scrolling: locked the app to the screen height (html/body/#shell overflow hidden, 100dvh with 100vh fallback, no overscroll). Now the app fits the phone and ONLY the chat list / Today content scrolls — no more whole-page drift. Safe-area bottom clearance kept.

## v1.1.4 — 2026-06-07
- Bottom safe-area floor 56px (Android gesture-nav height).
## v1.1.3 — 2026-06-07
- Bottom safe-area floor 48px.
## v1.1.2 — 2026-06-07
- Added safe-area bottom padding (gesture/nav bar).
## v1.1.1 — 2026-06-07
- Fix duplicate message timestamp.
## v1.1.0 — 2026-06-07
- Refined UI. 'Today' home + quick-ask chips. Bottom nav. Formatted replies, timestamps, tap-to-copy, mic.
## v1.0.0 — 2026-06-07
- Initial release: installable Android PWA, phone-code login, chat with Claude, service worker.
