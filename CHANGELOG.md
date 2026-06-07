# Changelog — Carnes & Sons Owner App

Versioning: vMAJOR.MINOR.PATCH. Every entry is a recoverable Git commit; roll back by reverting to a prior version's commit.

## v1.1.4 — 2026-06-07
- Bottom safe-area floor raised to 56px (matches Android gesture-nav height) so the nav/chat clears the Galaxy S25 gesture bar.

## v1.1.3 — 2026-06-07
- Raised bottom safe-area floor to 48px. Fixes bottom nav/chat too tight on S25-class phones when the OS reports no inset.

## v1.1.2 — 2026-06-07
- Added safe-area bottom padding so the Android gesture/nav bar no longer covers the nav/chat.

## v1.1.1 — 2026-06-07
- Fix: message timestamp rendered twice; cleaned up chat bubble rendering.

## v1.1.0 — 2026-06-07
- Refined UI. 'Today' home + quick-ask chips. Bottom nav. Formatted replies, timestamps, tap-to-copy, mic.

## v1.0.0 — 2026-06-07
- Initial release: installable Android PWA, phone-code login, chat with Claude, service worker.
