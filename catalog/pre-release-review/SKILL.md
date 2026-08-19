---
name: pre-release-review
description: Use when the user says "ship it", "release", "submit", "deploy", "push to production", before any production push, or after any large diff. Mandatory independent review pass — never skip because "the diff looks fine".
---

# Pre-Release Review Pass

An independent fresh-eyes review before anything ships. This is the cheapest bug-fix
window that exists — every time it has run it has caught real shipping bugs
(unsolicited permission prompts, silent data mutation); every time it was skipped,
something escaped. **The author is blind to their own bugs — the review must be a
separate agent, not the same context re-reading its diff.**

## Procedure

1. **Determine scope: the FULL changed surface since the last review** — not the last
   diff. List the commits/features included so nothing rides along unreviewed.
2. **Spawn a review agent** (fresh context, no shared assumptions):
   - Model tier: **the strongest model you have access to** — release-critical review
     is one of the few tasks that genuinely earns the frontier tier. (Everyday,
     non-release review runs fine on your default tier.) Review is judgment work.
   - Read-only — the reviewer proposes, never fixes.
3. **Brief the agent** (agents start cold — the brief must be self-contained):

```
ROLE: Reviewer — independent pre-release pass.
CONTEXT: <project + one-liner + root path; what is being released; the commit range /
file list constituting the full changed surface since the last review>
TASK: Hunt REAL bugs with concrete failure scenarios (inputs/state → wrong behavior),
not style opinions. Prioritize classes of past escapes:
- unsolicited OS permission prompts (anything that can fire without a user action)
- silent data mutation / migration risk to existing user data
- dead code paths that pretend to succeed (stubs, swallowed errors, fake fallbacks)
- destructive flows that fail silently (missing DELETE policy, no-op server calls)
- secrets or keys in the diff
VERDICT per finding: CONFIRMED (reproduced/traced to a mechanism) vs PLAUSIBLE
(needs a check).
REPORT BACK: findings with file:line evidence; explicit "areas I could not verify".
```

4. **Conductor re-verifies before acting** — reviewer output is input, not law:
   - [ ] Evidence present for every claim (no evidence → treat as unverified)
   - [ ] Reproduce/trace each CONFIRMED finding yourself before fixing
   - [ ] Triage PLAUSIBLE findings: check them or consciously accept the risk in writing
5. **Fix, then re-verify the fixes** (run the thing, not just the build). When a
   finding is a PATTERN, fix the class and grep for siblings — a fix applied only
   to the reported sites leaves the same bug alive next door.
6. **Write the review down**: what was reviewed, the findings, and the disposition of
   each — in the release notes, the PR, or whatever doc carries project state.

## Release checklist (run alongside the review)

- [ ] Verified / NOT-verified ledger written
- [ ] Data migration path tested (fresh install AND upgrade-with-existing-data)
- [ ] Security advisors run on any touched live backend — re-run to confirm fixes stuck
- [ ] No test/sample data left behind
- [ ] Version/build numbers bumped (an uploaded build number is burned forever)
- [ ] User-facing copy checked against copy rules
- [ ] Project state doc updated; working tree clean or explained

**Never push/publish/submit without the user's explicit go-ahead.**
