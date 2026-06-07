# Changelog — Carnes & Sons Owner App

Versioning: vMAJOR.MINOR.PATCH. Every entry is a recoverable Git commit; roll back by reverting to a prior version's commit.

## v1.1.1 — 2026-06-07
- Fix: message timestamp rendered twice; cleaned up chat bubble rendering.

## v1.1.0 — 2026-06-07
- Refined, professional UI (clean Carnes & Sons look, light theme, subtle accent).
- NEW 'Today' home screen: time-based greeting + quick-ask chips (schedule, voicemails, who's working, estimates, fit-a-job).
- Bottom navigation: Today · Chat · Alerts (Alerts placeholder for Phase 2 push).
- Chat: Claude replies render formatting (bold, bullet/numbered lists), message timestamps, tap-to-copy.
- Hands-free mic (voice-to-text) in the composer where supported.
- Polished login + smoother view transitions.

## v1.0.0 — 2026-06-07
- Initial release. Installable Android PWA hosted on GitHub Pages.
- Phone-code login (staff phone -> texted 6-digit code -> session token).
- Chat with Claude (today's schedule, jobs, customers, voicemails) via the claude-chat brain.
- Service worker: offline shell + push-notification handler (ready for Phase 2).
