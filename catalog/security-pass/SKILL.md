---
name: security-pass
description: Use when touching auth, API keys, secrets, RLS/policies, payment or personal data, any new endpoint that writes, or live backends — and before any release. Security and secrets checklist; every rule traces to a real production finding.
---

# Security Pass

Security passes are one of the few places where spending extra model budget is always
justified. Run as a focused pass (mid model; **strong** when the diff touches data
migration, auth, or payment/personal data).

## Secrets hygiene

- **Secrets never live in code or committed files.** Use git-ignored secret files
  with a committed `*.example` twin, CI repository secrets, or environment variables.
- **Grep the diff before every commit and every status doc** for key-shaped strings:
  `sk-`, `eyJ`, `-----BEGIN`, `AKIA`, URLs with embedded tokens. Project docs are
  long-lived and often synced — reference keys by name, never by value.
- **Keys don't belong in cloud-synced folders.** Loose `.p8`/license/API-key files in
  a cloud-synced folder are one sync-share away from exposure — flag them with a
  recommended move (Keychain, `~/.keys/`, password manager); don't move credentials
  yourself without confirmation.
- **Clients get publishable/anon keys only.** If a flow seems to need a service-role
  key client-side, the design is wrong.

## Backend security (Supabase / any hosted DB)

- **RLS on every table**, isolating by `auth.uid()` where real auth exists. Where it
  doesn't yet, enumerate exactly which operations stay open and write the residual
  risk down as a deliberate decision with an owner and revisit condition.
- **Run the security advisors after EVERY schema change** — production once had
  unrestricted anonymous DELETE on user tables and nothing errored.
- **Re-run advisors to confirm fixes stuck** — a privilege revoke silently failed to
  apply once. A fix isn't applied until the advisor confirms it.
- **Check policy completeness, not just presence** — RLS enabled with a missing
  policy fails silently in whichever direction you didn't test. A "delete my
  account" flow once deleted nothing server-side with no error raised.
- **Test destructive/privacy flows end-to-end against the live backend.**

## Permission & privacy boundaries (client apps)

- **Never trigger an OS permission prompt the user didn't ask for** — prompts fire
  only from an explicit user action. Suggested settings are surfaced, never
  auto-enabled.
- AI features: on-device or clearly disclosed; state what leaves the device.
- Tools reading sensitive stores (email, finance files) are **read-only by default**;
  write capability is a separately gated opt-in that degrades honestly. Enumerate
  what the tool can NEVER do and enforce it server-side, not just in the UI.
- Autonomous tools get workspace confinement: explicit allowed roots, protected
  extensions/directories refused at the enforcement layer.

## Checklist

- [ ] Advisors run on touched backends; findings fixed; **re-run confirms applied**
- [ ] No secrets in code, diffs, or docs; example/secret file pairs intact
- [ ] Client contains publishable keys only
- [ ] Every new/changed endpoint: authz checked; rejection paths tested, not just happy path
- [ ] Destructive flows verified end-to-end against the real backend
- [ ] No new unsolicited permission prompts; gated features degrade honestly
- [ ] Residual risks written down as decisions, with owner and revisit condition
