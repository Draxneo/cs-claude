## v2.25.0 (2026-06-11)
- Conversation list now flags unread threads (accent bar + bold name + count) and marks landline numbers (call-only), matching the desktop side panel.

## v2.24.0 (2026-06-11)
- Claude chat now shows context-aware starter buttons: open a text thread first and the chips become Draft reply / Summarize / Book / History for that person; otherwise the general quick actions. Fewer taps, less typing.

## v2.23.0 (2026-06-11)
- Customer info now shows the phone line type (mobile = textable, landline = call only) so you know before you try to text.

## v2.22.0 (2026-06-11)
- Leads now show a 🎯 icon in the Inbox; tap one to open the conversation and text or call them.

## v2.21.0 (2026-06-11)
- Tap a voicemail in the Inbox to jump to the Calls tab and play it; voicemail summaries now wrap fully in the Inbox.

## v2.20.0 (2026-06-11)
- Voicemails now show a purple VOICEMAIL badge in the Calls tab so they stand out from answered calls (they also land in the Inbox with a push).

## v2.19.0 (2026-06-10)
- Claude can now fix customer details (name, email, phone) on request — added a 'Fix a customer detail' suggestion. Confirms the change before saving.

## v2.18.0 (2026-06-10)
- More Claude suggestions on the Home tab (look up a customer, book a job, renewals due) and a broader chat greeting, so the newer abilities are discoverable.

## v2.17.0 (2026-06-10)
- Draft & Summarize now share the same line as the 'In Housecall Pro' tag instead of taking their own row — shorter header, more room for messages.

## v2.16.0 (2026-06-10)
- Cleaner screens: the 'Carnes & Sons' top bar now only appears on the Home tab. Moved Log out to the Alerts/settings page (Account section). Other tabs get the full height with no header.

## v2.15.0 (2026-06-10)
- Compacted the text-thread header: tighter name/avatar bar, slimmer 'In Housecall Pro' row, and smaller Draft/Summarize buttons — more room for the actual conversation.

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
