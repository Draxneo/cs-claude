# Changelog — Carnes & Sons Owner App

Versioning: vMAJOR.MINOR.PATCH. Every entry is a recoverable Git commit; roll back by reverting to a prior version's commit.

## v1.0.0 — 2026-06-07
- Initial release. Installable Android PWA hosted on GitHub Pages.
- Phone-code login (staff phone -> texted 6-digit code -> session token).
- Chat with Claude (today's schedule, jobs, customers, voicemails) via the claude-chat brain.
- Service worker: offline shell + push-notification handler (ready for Phase 2).
