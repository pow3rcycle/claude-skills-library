# Sources and provenance

Every skill in `catalog/` is either **first-party** (written for this catalog) or
**third-party** (vendored from an open-source repo). This file is the human-readable
record; the same facts are published per-skill in `manifest.json` under `license` and
`source`. The two must stay in step — `tools/build-manifest.mjs` holds the machine copy
in its `PROVENANCE` table.

Apache-2.0 attribution requirements are in [`NOTICE.md`](NOTICE.md).

---

## Third-party skills

### taste-skill — 13 skills, MIT

| Field | Value |
|---|---|
| Repo | https://github.com/Leonxlnx/taste-skill |
| Author | Leonxlnx |
| License | MIT (`LICENSE` copied into each skill folder) |
| Commit vendored | `98565e65bc3274ddf6eb0838734341714057178b` |
| Date cloned | 2026-07-20 |

Skills: `brandkit`, `design-taste-frontend`, `full-output-enforcement`, `gpt-taste`,
`high-end-visual-design`, `image-to-code`, `imagegen-frontend-mobile`,
`imagegen-frontend-web`, `imagegen-shared`, `industrial-brutalist-ui`, `minimalist-ui`,
`redesign-existing-projects`, `stitch-design-taste`.

Notes:

- The upstream repo's `assets/` and `examples/` (README banners, demo screenshots) were
  pruned as marketing material referenced by no skill, along with `.claude-plugin/`,
  `scripts/` (repo build tooling) and `skill.sh` (the repo's own installer) — none are
  needed to use the skills standalone.
- `imagegen-shared` is not an upstream skill folder. It is shared reference material
  (the anti-slop taxonomy and the variation engine) **extracted from the imagegen skills
  above** so the three consumers can read one copy. It is attributed to taste-skill and
  carries the same MIT license. It is marked `hidden: true` in the manifest because it is
  a dependency, not something to install on its own.
- `design-taste-frontend` and `minimalist-ui` carry small local edits (see "Local edits"
  below).
- The upstream bundle also ships `design-taste-frontend-v1`, a superseded earlier
  version. It is deliberately **not** included here.

### impeccable — Apache-2.0

| Field | Value |
|---|---|
| Repo | https://github.com/pbakaus/impeccable |
| Author | Paul Bakaus (pbakaus) |
| License | Apache License 2.0 (`LICENSE` + `NOTICE.md` in the skill folder) |
| Commit vendored | `4d849eb75f216109ea7053ed21530a11fafcc786` |
| Date cloned | 2026-07-20 |

The upstream repo ships near-identical copies of this skill for several agent harnesses.
The Claude Code variant (`.claude/skills/impeccable/`) is the one vendored here. The CLI,
browser extension, website, test fixtures and other harness copies were pruned — none are
referenced by the vendored `SKILL.md` or its `reference/` and `scripts/` subfolders.

Its own `NOTICE.md` (kept in the skill folder) records that its iOS/Android platform
reference files derive from ehmo's `platform-design-skills`, MIT.

### design-motion-principles — MIT

| Field | Value |
|---|---|
| Repo | https://github.com/kylezantos/design-motion-principles |
| Author | Kyle Zantos |
| License | MIT (`LICENSE` in the skill folder) |
| Commit vendored | `4a9ca879f24a361f4dca4174fe2da0f67b5ddee3` |
| Date cloned | 2026-07-20 |

Small single-skill repo, vendored as-is. Nothing pruned.

### last30days — MIT

| Field | Value |
|---|---|
| Repo | https://github.com/mvanhorn/last30days-skill |
| Author | Matt Van Horn (mvanhorn) |
| License | MIT (`LICENSE` in the skill folder) |
| Commit vendored | `52f53312ff2f272e16bbc1785e1c04f9d9c19b31` (v3.18.4) |
| Date adopted | 2026-08-03 |

Excluded from the vendor per the upstream `.skillignore`: a 14 MB demo `assets/` folder,
`agents/`, and dev/eval scripts. The skill bundles a further vendored dependency at
`scripts/lib/vendor/bird-search/` — MIT, © Peter Steinberger — with its `LICENSE`
alongside it.

Optional API keys (`SCRAPECREATORS_API_KEY`, `OPENAI_API_KEY`, `XAI_API_KEY` and others)
unlock additional sources; **none ship here** and the keyless sources work without them.

### agent-browser and defuddle — CLI wrappers, not vendored code

These two skill folders are thin instruction stubs. The actual tools are **npm packages
installed globally by the user** — no third-party program code is vendored into this
repo, only the `SKILL.md` that tells Claude how to drive it.

| Skill | Upstream repo | Author | License of the stub | Install |
|---|---|---|---|---|
| `agent-browser` | https://github.com/vercel-labs/agent-browser | Vercel Labs | Apache-2.0 | `npm install -g agent-browser && agent-browser install` |
| `defuddle` | https://github.com/kepano/obsidian-skills | kepano | MIT | `npm install -g defuddle` |

`agent-browser`'s stub is deliberately minimal: it points at `agent-browser skills get
core`, so the usage instructions always match the installed CLI version rather than going
stale in this repo.

---

## First-party skills

`apply-richformat`, `commissioning-logger`, `pre-release-review`, `safe-data-write`,
`security-pass`, `verify-work`.

Written for this catalog. Published in the manifest as `license: "Shared"`,
`source.type: "first-party"`. A formal open-source license is still to be decided — see
the licensing section of `README.md`.

---

## Local edits to third-party skills

Kept deliberately small, and listed here so they can be re-applied if a skill is
re-vendored from upstream.

| Skill | Edit | Why |
|---|---|---|
| `design-taste-frontend` | Emoji-policy exception reworded from a named individual to "the user" | Neutrality — this catalog is public |
| `minimalist-ui` | Brand-override sentence reworded from a named individual's products / a specific brand folder to "the project's own brand token file" | Same |
| `last30days` | Frontmatter `description` narrowed upstream-locally to make the skill opt-in (explicit `/last30days` or genuinely broad sentiment research) rather than firing on ordinary web searches | Cost control — the engine is expensive to run casually |
| several design skills | Cross-references to an external `MASTER-DESIGN.md` doctrine file | Inherited from the curation source; harmless here (see README) |

All files in `catalog/` are also normalized to LF line endings, which changes bytes but
no content. See `CONTRIBUTING.md` for why that matters.
