---
type: reference
project: HCP Helper
created: 2026-06-14
source: cs-claude/index.html + sw.js (verified)
---

# HCP Helper — PWA (cs-claude) Front-End Map

## Overview
**cs-claude** is the owner/staff phone app (installable PWA, portrait, standalone) — AI assistant, customer texting, team chat, call history, softphone, and the approval Inbox in the owner's pocket. Mobile counterpart to the Chrome extension; same Supabase backend.
- **Version:** `VERSION='2.42.2'` (index.html ~L197); mirrored in Alerts pill + login footer. **sw.js** `V='2.42.2'` (cache `cs-2.42.2`), kept in lockstep.
- **Hosting/deploy:** static files on **GitHub Pages** under `/cs-claude/` (repo Draxneo/cs-claude). Files: index.html (whole app), sw.js, manifest.webmanifest, quoter.html, icons. No build step. Deploy = edit → bump VERSION + sw.js V → git push → Pages redeploys (~1 min) → app self-updates.
- **Auth:** two-step SMS code login → `staff-auth-request` (send 6-digit) then `extension-otp-verify` (returns token + name). Token in localStorage `cs_token` (`cs_name`), sent as `token` on every call. Logout clears + reloads.

## Backend endpoints it calls (via `api(path, body)` → BASE `…/functions/v1/`)
- `staff-auth-request`, `extension-otp-verify` — login.
- `claude-chat` — the AI (Today chips + Claude tab); sends {messages, token, pageContext, mode}.
- `inbox` (via `inboxApi(action,…)`) — approval/notification Inbox (counts, list, approve_booking, approve_reschedule, handle, todo, etc.).
- `hcp-extension-threads` — SMS conversation list + thread detail.
- `hcp-extension-sms` — send SMS/MMS reply. `mms-upload` — upload photo for MMS.
- `hcp-extension-calls` — Calls tab history. `call-recording?url=…` — stream recording audio.
- `twilio-token` — softphone Voice access token (identity pwa-owner).
- `voice-dictate` — Deepgram mic dictation. `elevenlabs-tts` — truck-mode TTS.
- `push-subscribe` / `push-send` — Web Push register / test.
- (quoter.html) `quoter` — instant-quote submit/lead.

## Views/tabs (`setView`, `#bnav`)
- **Today** (view-today) — home; greeting + "quick question" chips → claude-chat.
- **Texts** (view-sms) — customer SMS list + search + unread badge.
- **Team** (view-team) — internal team/sub conversations.
- **SMS Thread** (view-smsthread) — open conversation; header name/number + Call, Draft/Summarize/Book chips, composer (text/MMS), new-message pill.
- **Inbox** (view-inbox) — approval/notification queue (booking, reschedule, Claude questions, done notices); drives app icon badge.
- **Calls** (view-calls) — call cards (Call/Text/Book, recording playback).
- **Claude** (view-chat) — full AI chat, starter chips, thinking indicator, tap chips.
- **Alerts** (view-alerts) — settings: notifications + test push, battery tip, Version + Force update, Account/logout.
- Hidden **#callscreen** overlay during an active softphone call.

## Key features
- **Inbox approvals** (loadInbox/inboxApi/renderInbox): booking (✓ Book) + reschedule (🔁 ✓ Move) cards use **two-tap inline confirm** (tap → amber "Tap to confirm" → tap commits; reverts after ~4s); Claude ❓ question cards with one-tap answer chips; 🔔 done notices. All survive navigation.
- **Claude chat** (sendChat): posts history to claude-chat with CHIP_HINT; parses trailing `::CHIPS:: A | B | C` into tap chips; context-aware starters.
- **Truck mode** (autoSpeak/speakText/ttsClean): auto-reads replies via elevenlabs-tts, strips chips/URLs/markdown; passes mode:'voice'; mic auto-sends.
- **Softphone** (getVoiceToken/ensureDevice/placeCall): Twilio Voice JS SDK (window.Twilio.Device, opus/pcmu); token from twilio-token (auto-refresh); #callscreen UI (mute/hang/timer).
- **SMS thread/MMS** (sendSms): text + photo MMS (mms-upload→hcp-extension-sms), AI Draft, delivery ticks, date separators, retry, long-press copy.
- **Web push** (subscribePush): SW + VAPID; register via push-subscribe; test via push-send.
- **Mic dictation** (MediaRecorder→voice-dictate): webm → Deepgram → composer.
- **Self-update** (appRefresh/hardRefresh + SW reg): reg.update() hourly; controllerchange reload; Force-update purges caches + unregisters SW.

## Service worker (sw.js)
- Versioned cache `cs-<V>`; precache index.html + manifest + icon. install→skipWaiting; activate→purge old caches + claim.
- **Network-first, same-origin**; only caches GOOD responses (ok+200+basic) — guard against poisoned shell; offline fallback to index.html ONLY for navigations (images/audio fail cleanly).
- **push** → showNotification; **notificationclick** → focus `/cs-claude/` window or open url. Bump V to roll the cache.

## quoter.html
Standalone field-sales instant-quote wizard (own API base `…/functions/v1/quoter`): brand/tier → heat → tonnage → customer; shows financing; "Send to office for approval" → posts {action:submit, payload} to `quoter` (lands in Proposals queue + can capture a lead). Not part of the owner app nav.
