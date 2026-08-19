# Claude Skills Library

A shared catalog of **Claude Code skills** — small, self-contained instruction folders
that teach Claude a way of working: verify before claiming done, review before shipping,
treat user data as sacred, and design interfaces that don't look like every other AI
mock-up.

Each entry in `catalog/` is one skill: a `SKILL.md` plus whatever reference files or
scripts it needs. Drop a folder into `~/.claude/skills/` and Claude Code discovers it
automatically, in every project, from the next session on.

This repo contains **no API keys, no credentials, and no personal data** — it is pure
methodology and tooling, safe to share and safe to keep anywhere.

---

## Getting skills onto your machine

### The easy way — the Skills Hub app

**Skills Hub** is a small desktop app that reads this repo's catalog, shows you what's
available, and installs or updates the skills you pick. It handles versions, updates and
removal, so you never hand-copy a folder or wonder which copy is current.

1. **[Download Skills Hub from the releases page](https://github.com/pow3rcycle/claude-skills-hub/releases)**
   — from the newest release, download the `.exe` setup file on Windows or the `.dmg` on
   macOS, open it, and follow the prompts.
2. Browse the catalog, tick the skills you want, install.
3. Start a new Claude Code session. That's it.

> **Windows will warn you the first time.** The app is not code-signed, so SmartScreen
> shows a blue "Windows protected your PC" box. Click **More info**, then **Run anyway**.
> On macOS, right-click the app and choose **Open**, then **Open** again.

### The manual way — no app required

1. Download this repo as a zip (**Code → Download ZIP**) and unpack it.
2. Copy the folders you want out of `catalog/` into your skills directory:
   - **macOS / Linux:** `~/.claude/skills/`
   - **Windows:** `%USERPROFILE%\.claude\skills\`
   Copy the whole folder — `catalog/verify-work/` becomes `~/.claude/skills/verify-work/`.
3. Start a new Claude Code session.

To update a skill later, replace its folder. To remove one, delete its folder.

---

## What's in the catalog

| Group | Skills | What they're for |
|---|---|---|
| **Engineering practice** | `verify-work`, `pre-release-review`, `safe-data-write`, `security-pass`, `apply-richformat`, `commissioning-logger` | How work gets checked, reviewed, released, and written down. The habits, not the code. |
| **Design** | `impeccable`, `design-taste-frontend`, `design-motion-principles`, `high-end-visual-design`, `minimalist-ui`, `industrial-brutalist-ui`, `redesign-existing-projects`, `gpt-taste`, `brandkit`, `stitch-design-taste`, `image-to-code`, `imagegen-frontend-web`, `imagegen-frontend-mobile`, `full-output-enforcement`, `imagegen-shared` | Frontend craft, taste, motion, and design-reference image generation. Mostly open-source skills from the community. |
| **Research** | `last30days` | Broad multi-source social-sentiment research, with a Python engine that does the scraping so the model only synthesizes. |
| **Utility** | `agent-browser`, `defuddle` | Thin wrappers over two CLI tools — browser automation, and clean markdown extraction from web pages. |

The authoritative list, with descriptions, sizes, versions and content hashes, is
[`manifest.json`](manifest.json) — generated from `catalog/`, never hand-edited.

### A few skills need something installed

Most skills are pure instructions and need nothing at all. The exceptions are declared
in each manifest entry under `requires`:

| Skill | Needs |
|---|---|
| `agent-browser` | `npm install -g agent-browser`, then `agent-browser install` |
| `defuddle` | `npm install -g defuddle` |
| `last30days` | `python3` on PATH |
| `impeccable` | `node` on PATH |
| `commissioning-logger` | `npm install` inside its own `scripts/` folder on first use; the screenshot annotator wants Python with Pillow |

### About the design skills

Several design skills carry cross-references to a `MASTER-DESIGN.md` doctrine file that
is **not** part of this catalog — it belongs to the private setup they were curated from.
Those lines read as "an external doctrine wins on conflict"; with no such file present,
the skill's own rules simply apply. Nothing breaks, and no rule is lost.

---

## Licensing

**First-party content is MIT** — see [`LICENSE`](LICENSE), © 2026 Mehedi Hasan. That
covers this repo's tooling (`tools/`), its documentation, and the six first-party skills:
`apply-richformat`, `commissioning-logger`, `pre-release-review`, `safe-data-write`,
`security-pass`, `verify-work`. Use them, fork them, ship them — just keep the copyright
notice.

**Third-party skills keep their own upstream licenses** (MIT and Apache-2.0), which the
root LICENSE does not override. Every third-party skill folder ships its own `LICENSE`
file; the full provenance table — repo, author, license, vendored commit — is in
[`SOURCES.md`](SOURCES.md), and the Apache-2.0 attribution requirements are in
[`NOTICE.md`](NOTICE.md).

Each skill's effective license is also published per-entry in `manifest.json` under
`license` and `source`.

---

## Contributing

See [`CONTRIBUTING.md`](CONTRIBUTING.md). Short version: add a folder under `catalog/`
with a `SKILL.md`, run `node tools/build-manifest.mjs`, commit both.
