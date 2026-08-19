# Contributing

## Adding a skill

1. **Create the folder** — `catalog/<id>/`. The folder name is the skill's id: lowercase,
   hyphenated, stable forever (the Skills Hub app keys installed skills by it, and a
   rename reads as "removed one, added another").

2. **Write `SKILL.md`** — YAML frontmatter, then the body:

   ```markdown
   ---
   name: my-skill
   description: One or two sentences. This is what Claude reads every session to decide whether the skill applies, and what the catalog shows on the card. Say when to use it, not just what it is.
   version: "1.0.0"
   ---

   # My Skill

   The first prose paragraph becomes `longDescription` in the manifest — make it a real
   summary rather than a warning or a preamble.
   ```

   Only flat `key: value` frontmatter fields are read by the manifest builder:
   `name`, `description`, `version`, and an optional `displayName`. Anything else is
   ignored (harmlessly) — nested blocks and list values are skipped, not guessed at.

3. **Keep the folder shippable.** It gets downloaded and dropped into a user's
   `~/.claude/skills/` verbatim, so it must not contain:
   - `node_modules/`, `__pycache__/`, `.venv/`, build output
   - dev-only `tests/` fixtures
   - anything secret — keys, tokens, cookies, internal hostnames, customer names
   - anything personal — real names, machine paths, private project references

   Reference files and `LICENSE` files stay. A committed `package-lock.json` is fine.

4. **Register anything the skill needs to run.** If it depends on a CLI, a binary, or an
   install step, add it to the `REQUIRES` table in `tools/build-manifest.mjs` so the app
   can warn the user before installing. Same for `HIDDEN` (skills that exist only as a
   dependency of another) and `DEPENDS_ON`.

5. **Record provenance.** Third-party skills: add a row to `SOURCES.md`, copy the
   upstream `LICENSE` into the skill folder, and add an entry to the `PROVENANCE` table
   in `tools/build-manifest.mjs`. Apache-2.0 code also needs a line in `NOTICE.md`.
   First-party skills need nothing — they default to `license: "Shared"`,
   `source.type: "first-party"`.

6. **Rebuild the manifest and commit both:**

   ```bash
   node tools/build-manifest.mjs
   git add catalog/<id> manifest.json
   ```

CI regenerates the manifest on every push and PR and fails if it differs from the
committed one, so a skill change without a manifest rebuild will not merge.

## Editing an existing skill

Edit the files, then re-run `node tools/build-manifest.mjs`. The `dirHash`, `sizeBytes`
and `fileCount` for that skill change; everything else stays byte-identical. Bump the
skill's frontmatter `version` when the change is worth pulling — the app uses it to
offer updates.

## About `manifest.json`

It is **generated**. Never edit it by hand.

- Keys are emitted in a fixed order and skills are sorted by id, so diffs stay readable.
- The builder **skips writing the file entirely when nothing but the timestamp would
  change**, so re-running it is a no-op and `git diff --exit-code manifest.json` is a
  reliable drift check.
- `dirHash` is a reproducible content hash of the skill folder, so a client can verify
  that what it downloaded is what the manifest described. The exact recipe is documented
  in the header comment of `tools/build-manifest.mjs` — treat it as a published contract:
  changing it invalidates every hash and every client's integrity check.

## Line endings

`.gitattributes` normalizes everything to LF (`* text=auto eol=lf`). This is not
cosmetic: `dirHash` is computed over the bytes in the working tree, and those must equal
the bytes a client gets from a GitHub tarball. **Do not commit CRLF files**, and do not
change that setting.

## Style

- No emoji in skill bodies or docs.
- Line-wrap prose at roughly 90 characters.
- Absolute dates (`2026-08-19`), never "last week".
- Say when a skill applies and when it does not — a skill that claims everything gets
  loaded for everything.
