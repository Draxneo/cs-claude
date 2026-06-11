## v2.14.0 (2026-06-10)
- Keyboard now hides the bottom tab bar while you're typing, so the conversation isn't crushed into a sliver and the message box sits right on top of the keyboard. Auto-scrolls to the newest message when the keyboard opens.

## v2.13.0 (2026-06-10)
- Listen to replies aloud: every Claude answer (and the thread highlights) now has a Listen button with play/pause and a stop button — great for hands-free over the truck's Bluetooth. Added an Auto-read 'truck mode' toggle in the message bar: turn it on and new replies play automatically.

## v2.12.0 (2026-06-10)
- Mobile keyboard fix: the on-screen keyboard now overlays the bottom of the app instead of shoving the whole screen up off-view. Added viewport `interactive-widget=resizes-content` so the layout shrinks to the visible area (header stays put, conversation stays readable, message box sits right above the keyboard). Bumped message box font to 16px to stop the iOS focus zoom-jump.

## v2.11.0 (2026-06-09)
- Open SMS thread now refreshes every 3s (dedicated poller w/ change-check, no flicker) to match the extension.
- Confirmed ::CHIPS:: tap-buttons already parsed/rendered in Claude tab (parity verified).

# Changelog — Carnes & Sons Owner App

## v2.3.0 — 2026-06-07
- Outbound calling: tap the phone button in any text thread to call from the business line (caller ID +1 210 600 5091). In-call screen with mute + end. Uses the Twilio Voice SDK; mic permission required.
- twilio-token now requires login.

## v2.2.0 — push notifications (subscribe on enable + send-test) + endpoints require login.
## v2.1.1 — bottom clearance 56px. ## v2.1.0 — self-updating + Settings. ## v2.0.0 — dark redesign. ## v1.x — SMS, Today, viewport lock, initial.
