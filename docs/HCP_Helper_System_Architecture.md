---
type: reference
project: HCP Helper
created: 2026-06-14
---

# HCP Helper — System Architecture (the whole stack)

The single map that ties everything together. Detailed references:
- API: **HCP_API_Endpoint_Map.md** + HCP_API_Contracts_* (Housecall endpoints).
- Backend: **HCP_Helper_Backend_Map.md** (74 edge functions).
- Front ends: **HCP_Helper_PWA_Map.md** (owner phone app), **HCP_Helper_Extension_Map.md** (Chrome side panel).
- Data: **HCP_Helper_Data_Model.md** (39 Supabase tables).

## The shape of it
```
  Owner PHONE app (PWA, cs-claude, GitHub Pages)  ─┐
  Chrome EXTENSION (MV3 side panel on HCP pages)  ─┤
                                                   ├─►  Supabase EDGE FUNCTIONS (74)  ─►  Housecall Pro API
  Twilio (calls/SMS webhooks) ─────────────────────┤        (the brain + workers)        Twilio / Deepgram /
  Housecall Pro webhooks ──────────────────────────┤              │                       ElevenLabs / Gmail /
  pg_cron (every minute / morning / 10-min) ───────┘              ▼                       Google Maps / Anthropic
                                                        Supabase POSTGRES (39 tables)
```

## How the pieces talk
- **Both front ends call edge functions** (never the database or HCP directly). Base: `https://bqsjbwwkjhrthqxgybht.supabase.co/functions/v1/`. They authenticate with a **staff session token** (`extension_tokens`) obtained via phone-code login (`staff-auth-request` → `extension-otp-verify`).
- **The brain = `claude-chat`**. Both front ends send chat turns to it; it runs an agentic tool loop and calls the Housecall API (and Twilio, Maps) to actually do things. Risky/bulk actions are STAGED into `inbox_items` (approval cards) or queued in `hcp_op_queue`; questions/notes go to the Inbox.
- **Background = workers on pg_cron** (`op-queue` durable outbox, `claude-jobs` detached brain tasks, `appt-reminders`, `missed-call-sweep`, `health-check`, gmail/email couriers, membership/estimate sync). Internal calls authenticate with `chain_key`.
- **Inbound events:** Twilio webhooks (calls/SMS, signature-verified) and Housecall/marketing webhooks (shared-secret) feed `twilio-*`, `hcp-webhook`, `hcp-events`, `leads-webhook`.
- **The extension additionally SCRAPES the HCP DOM** (the Sendbird customer chat has no API) via `content.js` and pastes drafts back — the one capability that isn't API-backed.

## How "Claude" learns to use Housecall (important)
The brain does NOT read docs/vault/DB at runtime — it acts only through built, tested TOOLS in `claude-chat` (create_job, reschedule, send_sms, etc.) with the contract coded in. The contract docs (in this vault + in `edge-functions/docs/`) exist to make BUILDING those tools fast. To give the brain a new HCP ability: add a tool using the contract from HCP_API_Contracts_*.

## ⚠️ Security finding (2026-06-14): 11 tables have RLS disabled
`agent_chat_log, agent_memory, rule_flags, hcp_event_sms, appt_reminders, auto_sms_config, sms_opt_outs, hcp_filed_photos, price_change_log, claude_jobs, tag_cleanup_runs` have Row Level Security OFF — anyone with the project's public anon key could read/write them directly via PostgREST. The edge functions use the SERVICE_ROLE key (which BYPASSES RLS), so enabling RLS on these tables (deny-by-default, no policies) should NOT break the app — it just closes off direct anon access. Recommended: enable RLS on all 11. (Not auto-applied; Clint's call.) The big customer-data tables (customers, sms_messages, etc.) already have RLS on.
