## v2.32.1 (2026-06-12)
- Audio players (Calls view, voice notes in threads) now render dark to match the theme — Chrome's native controls ignore dark-mode hints, so they're inverted via CSS filter.

## v2.32.0 (2026-06-12) — full phone-width comb of every view
- Audited all 8 views + thread detail at a true 390px phone width with an automated overflow/tap-target detector. No layout overflow found anywhere after v2.31 — remaining issues were all small touch targets, now fixed:
- Bigger thumb targets everywhere: thread Back button (30→42px) and Call button (34→42px), all action chips (Draft/Summarize/Book, draft tweaks, chat starters) now ≥34-38px tall, Inbox ✓/Book/✗ row buttons padded up, "Refresh" and "+ To-do" header buttons are real targets instead of 17px text.
- The Draft/Summarize/Book chip row's background band now spans the full width when it wraps below the customer info.
- Native controls (audio players on Calls, scrollbars) now render in dark mode (`color-scheme: dark`) instead of clashing white.

## v2.31.0 (2026-06-12) — phone layout fixes
- Thread header: customer info no longer gets crushed into a one-word-per-line left sliver on phones — the Draft/Summarize/Book chips now wrap below the info box when the screen is too narrow (side-by-side stays on wide screens).
- Removed the hardcoded 56px dead space under the bottom nav — bottom padding now only appears on phones that actually have a gesture/home-indicator bar.

## v2.30.0 (2026-06-12) — audit fixes round 1
- **Flicker fixed**: the 20s poller no longer rebuilds the open text thread (the 3s change-detecting poller owns it), the Texts/Team lists no longer flash "Loading…" every 20 seconds, and lists only repaint when something actually changed.
- **Bottom nav can no longer get stuck hidden**: the keyboard-detector now only hides the nav while you're actually typing in a text box, and it's force-cleared when you leave a chat/thread. Landscape keeps its navigation.
- **Android back button works**: back now goes thread → list → previous tab instead of closing the app.
- **Compose box**: auto-grows cleanly without an inner scrollbar until it hits max height; a draft typed in a text thread no longer leaks into the Claude chat box (and vice versa).
- **Security**: esc() now escapes quotes (a hostile caller name can no longer inject HTML via attributes); the image lightbox is DOM-built instead of innerHTML.
- **Service worker**: only caches good (200) responses — a transient GitHub Pages error can no longer get cached and leave you stuck on a broken screen; offline fallback to the app shell now only applies to page loads, not images/audio.
- Slimmer styled scrollbars on desktop; view switches reset scroll position to the top.

## v2.29.0 (2026-06-12)
- New **Team** tab in the bottom nav. Messages from your techs and subcontractors (AP Hernandez, etc.) now live in their own tab, separated out of the customer SMS list so the two never get mixed up. Same single fetch powers both lists, so switching tabs is instant.

## v2.28.0 (2026-06-12)
- Texts list now shows the team member's name (with their role) for threads with a tech — matching the Chrome extension — instead of falling back to a raw phone number.

## v2.27.0 (2026-06-12)
- Added a 📅 Book button to the SMS thread, and the Calls list Book button now always shows (not just when a call has an AI summary).

## v2.26.0 (2026-06-11)
- Truck mode is now full hands-free: in the Claude chat, finish talking and it sends automatically, then reads the reply aloud — no tapping. (SMS still requires a tap to send, on purpose.)

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
