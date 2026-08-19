#!/usr/bin/env node
/**
 * build-manifest.mjs — regenerate manifest.json from the contents of catalog/.
 *
 * Zero dependencies. Node >= 18. Run from anywhere:
 *
 *     node tools/build-manifest.mjs
 *
 * ---------------------------------------------------------------------------
 * WHY THIS EXISTS
 * ---------------------------------------------------------------------------
 * manifest.json is the contract between this repo and the Skills Hub app. The
 * app fetches the manifest from the main branch, shows the catalog, and then
 * downloads individual skill folders out of a codeload tarball. The manifest is
 * generated, never hand-edited — CI fails if it drifts from catalog/.
 *
 * ---------------------------------------------------------------------------
 * SCHEMA (frozen v1 — do not reorder or rename keys)
 * ---------------------------------------------------------------------------
 *   {
 *     "schemaVersion": 1,
 *     "generatedAt":  "<ISO-8601 UTC>",
 *     "catalog":      { "name", "url" },
 *     "skills": [
 *       {
 *         "id", "displayName", "description", "longDescription", "category",
 *         "version", "dirHash", "sizeBytes", "fileCount", "license",
 *         "source":   { "type", "url", "author" },
 *         "requires": { "bins": [], "npmGlobal": [], "notes": "" },
 *         "hidden": false, "dependsOn": [], "path": "catalog/<id>"
 *       }
 *     ]
 *   }
 *
 * ---------------------------------------------------------------------------
 * dirHash — the interop contract with the Skills Hub app
 * ---------------------------------------------------------------------------
 * THE APP OWNS THIS RECIPE. The authoritative implementation lives in the
 * sibling repo at:
 *
 *     claude-skills-hub/src/main/lib/dirHash.ts   (hashDirDetailed)
 *
 * Both sides must produce the same string for the same tree, or every skill
 * shows up in the app as "update available". If that file ever changes, this
 * one changes with it — and every hash in manifest.json is invalidated, so it
 * is a breaking change for every installed client.
 *
 * The recipe is deliberately reproducible by hand with `sha256sum` and `sort`:
 *
 *   1. Walk catalog/<id>/ recursively. REGULAR FILES ONLY:
 *        - directories carry no content of their own;
 *        - symlinks are skipped (a catalog skill must never contain one);
 *        - the OS junk files in IGNORED_NAMES (.DS_Store, Thumbs.db,
 *          desktop.ini) are skipped, at every depth, by exact name.
 *      Anything skipped here is also excluded from fileCount and sizeBytes —
 *      those three numbers always describe the same set of files.
 *   2. Relative path = POSIX separators ("/"), no leading "./".
 *   3. Sort the relative paths ascending by UTF-8 byte order (Buffer.compare),
 *      NOT by locale collation.
 *   4. For each file, in that order, emit one line:
 *          <sha256-hex of the file's raw bytes><two spaces><relPath>\n
 *      i.e. exactly the format `sha256sum` prints.
 *   5. dirHash = "sha256:" + sha256-hex of those lines concatenated.
 *
 * File bytes are hashed raw, so LINE ENDINGS MATTER: the repo must check out
 * LF (`* text=auto eol=lf`, see .gitattributes) or hashes differ per platform.
 * The result is independent of mtimes, permissions and directory order.
 *
 * ---------------------------------------------------------------------------
 * DETERMINISM
 * ---------------------------------------------------------------------------
 * Keys are emitted in a fixed order, the skills array is sorted by id, output is
 * 2-space indented with a trailing newline.
 *
 * `generatedAt` is the only field that would change on every run, which would
 * make every CI run look like drift. So: the script compares the newly built
 * manifest against the one on disk with `generatedAt` removed from BOTH sides,
 * and **only rewrites the file when the real content changed**. Running the
 * script twice with no catalog changes leaves manifest.json byte-identical —
 * including its timestamp — so `git diff --exit-code manifest.json` is a clean
 * drift check. (The alternative, moving `generatedAt` to the end of the file,
 * still rewrites the file every run and still shows a one-line diff; skipping
 * the write is strictly cleaner.)
 */

import { createHash } from 'node:crypto';
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO_ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const CATALOG_DIR = join(REPO_ROOT, 'catalog');
const MANIFEST_PATH = join(REPO_ROOT, 'manifest.json');

const CATALOG_META = {
  name: 'claude-skills-library',
  url: 'https://github.com/pow3rcycle/claude-skills-library',
};

// --- category -------------------------------------------------------------
// Design skills are enumerated explicitly rather than inferred, so a new skill
// never lands in the wrong bucket by accident.
const DESIGN_SKILLS = new Set([
  'brandkit',
  'design-motion-principles',
  'design-taste-frontend',
  'full-output-enforcement',
  'gpt-taste',
  'high-end-visual-design',
  'image-to-code',
  'imagegen-frontend-mobile',
  'imagegen-frontend-web',
  'imagegen-shared',
  'impeccable',
  'industrial-brutalist-ui',
  'minimalist-ui',
  'redesign-existing-projects',
  'stitch-design-taste',
]);
const CATEGORY_OVERRIDES = {
  'last30days': 'research',
  'agent-browser': 'utility',
  'defuddle': 'utility',
};
function categoryFor(id) {
  if (CATEGORY_OVERRIDES[id]) return CATEGORY_OVERRIDES[id];
  if (DESIGN_SKILLS.has(id)) return 'design';
  return 'engineering';
}

// --- provenance -----------------------------------------------------------
// Mirrors SOURCES.md at the repo root. SOURCES.md is the human-readable copy;
// this table is what the manifest publishes. Keep the two in step.
const FIRST_PARTY = {
  license: 'Shared',
  source: { type: 'first-party', url: CATALOG_META.url, author: '' },
};
const PROVENANCE = {
  'agent-browser': {
    license: 'Apache-2.0',
    source: { type: 'third-party', url: 'https://github.com/vercel-labs/agent-browser', author: 'Vercel Labs' },
  },
  'defuddle': {
    license: 'MIT',
    source: { type: 'third-party', url: 'https://github.com/kepano/obsidian-skills', author: 'kepano' },
  },
  'last30days': {
    license: 'MIT',
    source: { type: 'third-party', url: 'https://github.com/mvanhorn/last30days-skill', author: 'Matt Van Horn (mvanhorn)' },
  },
  'impeccable': {
    license: 'Apache-2.0',
    source: { type: 'third-party', url: 'https://github.com/pbakaus/impeccable', author: 'Paul Bakaus (pbakaus)' },
  },
  'design-motion-principles': {
    license: 'MIT',
    source: { type: 'third-party', url: 'https://github.com/kylezantos/design-motion-principles', author: 'Kyle Zantos' },
  },
};
// The taste-skill bundle: one upstream repo, many skill folders.
const TASTE_SKILL = {
  license: 'MIT',
  source: { type: 'third-party', url: 'https://github.com/Leonxlnx/taste-skill', author: 'Leonxlnx' },
};
for (const id of [
  'brandkit',
  'design-taste-frontend',
  'full-output-enforcement',
  'gpt-taste',
  'high-end-visual-design',
  'image-to-code',
  'imagegen-frontend-mobile',
  'imagegen-frontend-web',
  'imagegen-shared',
  'industrial-brutalist-ui',
  'minimalist-ui',
  'redesign-existing-projects',
  'stitch-design-taste',
]) {
  PROVENANCE[id] = TASTE_SKILL;
}
function provenanceFor(id) {
  return PROVENANCE[id] ?? FIRST_PARTY;
}

// --- runtime requirements -------------------------------------------------
const EMPTY_REQUIRES = { bins: [], npmGlobal: [], notes: '' };
const REQUIRES = {
  'agent-browser': { bins: [], npmGlobal: ['agent-browser'], notes: '' },
  'defuddle': { bins: [], npmGlobal: ['defuddle'], notes: '' },
  'last30days': { bins: ['python3'], npmGlobal: [], notes: '' },
  'commissioning-logger': {
    bins: [],
    npmGlobal: [],
    notes: 'Runs npm install in its scripts/ folder on first use; needs Node. The screenshot annotator needs Python with Pillow.',
  },
  'impeccable': { bins: ['node'], npmGlobal: [], notes: '' },
};

// --- catalog quirks -------------------------------------------------------
const HIDDEN = new Set(['imagegen-shared']);
const DEPENDS_ON = {
  'imagegen-frontend-web': ['imagegen-shared'],
  'imagegen-frontend-mobile': ['imagegen-shared'],
};
/**
 * Text overrides, for the two cases the derivation rules can't cover:
 *   - imagegen-shared is a bundle of reference files with NO SKILL.md at all,
 *     so both fields have to be supplied here.
 *   - last30days opens with an upstream operational preamble ("STALE-CLONE
 *     SELF-CHECK") rather than a summary, so its first paragraph would make a
 *     misleading catalog blurb. Only longDescription is overridden; the
 *     frontmatter description is still used verbatim.
 * Anything listed here is a deliberate exception — prefer fixing the skill's
 * opening paragraph over adding entries.
 */
const OVERRIDES = {
  'imagegen-shared': {
    description: 'Shared reference assets for the imagegen skills',
    longDescription:
      'Shared reference assets for the imagegen skills: the anti-slop taxonomy and the combinatorial variation engine, read by image-to-code, imagegen-frontend-web and imagegen-frontend-mobile.',
  },
  'last30days': {
    longDescription:
      'Broad multi-source social-sentiment research: a Python engine scrapes Reddit, X, YouTube, Hacker News, GitHub, Polymarket and the open web for the last 30 days, and the model only synthesizes the result. Keyless sources work with no API keys.',
  },
};

// --- helpers --------------------------------------------------------------

/**
 * OS junk that must never reach a user's skills folder or a hash.
 * Mirrors IGNORED_NAMES in claude-skills-hub/src/main/lib/dirHash.ts — keep in step.
 */
const IGNORED_NAMES = new Set(['.DS_Store', 'Thumbs.db', 'desktop.ini']);

/**
 * The hashable files under `dir`: relative POSIX paths, byte-sorted, with
 * symlinks and IGNORED_NAMES excluded at every depth. Step 1-3 of the recipe.
 */
function listFiles(dir) {
  const out = [];
  (function walk(current, rel) {
    for (const entry of readdirSync(current, { withFileTypes: true })) {
      if (IGNORED_NAMES.has(entry.name)) continue;
      if (entry.isSymbolicLink()) continue;
      const childRel = rel ? `${rel}/${entry.name}` : entry.name;
      if (entry.isDirectory()) walk(join(current, entry.name), childRel);
      else if (entry.isFile()) out.push(childRel);
    }
  })(dir, '');
  return out.sort((a, b) => Buffer.compare(Buffer.from(a, 'utf8'), Buffer.from(b, 'utf8')));
}

/**
 * dirHash + sizeBytes + fileCount. Steps 4-5 of the recipe: one sha256sum-format
 * line per file (`<hex><two spaces><relPath>\n`), concatenated and hashed.
 * `relFiles` must already be filtered and sorted by listFiles().
 */
function hashDirectory(dir, relFiles) {
  const outer = createHash('sha256');
  let sizeBytes = 0;
  for (const rel of relFiles) {
    const bytes = readFileSync(join(dir, ...rel.split('/')));
    const hex = createHash('sha256').update(bytes).digest('hex');
    outer.update(`${hex}  ${rel}\n`, 'utf8');
    sizeBytes += bytes.length;
  }
  return { dirHash: `sha256:${outer.digest('hex')}`, sizeBytes, fileCount: relFiles.length };
}

/**
 * Minimal YAML front-matter reader — flat `key: value` scalars only, which is
 * all this catalog's SKILL.md files use for the fields the manifest needs.
 * Nested blocks and list items are skipped rather than guessed at.
 */
function parseFrontmatter(raw) {
  const text = raw.replace(/^﻿/, '').replace(/\r\n/g, '\n');
  if (!text.startsWith('---')) return { fields: {}, body: text };
  const end = text.indexOf('\n---', 3);
  if (end === -1) return { fields: {}, body: text };
  const block = text.slice(text.indexOf('\n') + 1, end);
  const body = text.slice(text.indexOf('\n', end + 1) + 1);
  const fields = {};
  for (const line of block.split('\n')) {
    if (!line.trim() || line.startsWith('#')) continue;
    if (/^\s/.test(line) || line.trimStart().startsWith('-')) continue; // nested / list item
    const match = /^([A-Za-z0-9_-]+):\s*(.*)$/.exec(line);
    if (!match) continue;
    let value = match[2].trim();
    if (
      (value.startsWith('"') && value.endsWith('"') && value.length > 1) ||
      (value.startsWith("'") && value.endsWith("'") && value.length > 1)
    ) {
      value = value.slice(1, -1);
    }
    fields[match[1]] = value;
  }
  return { fields, body };
}

/**
 * First real paragraph of the body: skip blank lines, headings, blockquotes,
 * HTML comments, horizontal rules and table rows, then take the first
 * contiguous run of prose. Returns '' if a code fence comes first.
 */
function firstParagraph(body) {
  const buffer = [];
  let started = false;
  for (const raw of body.split('\n')) {
    const line = raw.trim();
    if (!started) {
      if (!line) continue;
      if (line.startsWith('#') || line.startsWith('>') || line.startsWith('<!--')) continue;
      if (line.startsWith('|')) continue; // table row
      if (/^(-{3,}|\*{3,}|_{3,})$/.test(line)) continue;
      if (line.startsWith('```')) return '';
      started = true;
      buffer.push(line);
      continue;
    }
    if (!line || line.startsWith('#') || line.startsWith('```') || line.startsWith('|')) break;
    buffer.push(line);
  }
  return buffer.join(' ').replace(/\s+/g, ' ').trim();
}

function titleCase(id) {
  return id
    .split('-')
    .map((word) => (word ? word[0].toUpperCase() + word.slice(1) : word))
    .join(' ');
}

// --- build ----------------------------------------------------------------

function buildSkill(id) {
  const dir = join(CATALOG_DIR, id);
  const relFiles = listFiles(dir);
  const { dirHash, sizeBytes, fileCount } = hashDirectory(dir, relFiles);

  let fields = {};
  let body = '';
  if (relFiles.includes('SKILL.md')) {
    ({ fields, body } = parseFrontmatter(readFileSync(join(dir, 'SKILL.md'), 'utf8')));
  } else if (!OVERRIDES[id]?.description) {
    throw new Error(`catalog/${id} has no SKILL.md and no OVERRIDES entry in build-manifest.mjs`);
  }

  const override = OVERRIDES[id] ?? {};
  const description = fields.description || override.description || '';
  if (!description) throw new Error(`catalog/${id}: no description (frontmatter or override)`);

  const { license, source } = provenanceFor(id);

  return {
    id,
    displayName: fields.displayName || titleCase(id),
    description,
    longDescription: override.longDescription || firstParagraph(body) || description,
    category: categoryFor(id),
    version: fields.version || '1.0.0',
    dirHash,
    sizeBytes,
    fileCount,
    license,
    source: { type: source.type, url: source.url, author: source.author },
    requires: { ...EMPTY_REQUIRES, ...(REQUIRES[id] ?? {}) },
    hidden: HIDDEN.has(id),
    dependsOn: DEPENDS_ON[id] ?? [],
    path: `catalog/${id}`,
  };
}

const ids = readdirSync(CATALOG_DIR, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort((a, b) => Buffer.compare(Buffer.from(a, 'utf8'), Buffer.from(b, 'utf8')));

const manifest = {
  schemaVersion: 1,
  generatedAt: new Date().toISOString(),
  catalog: { name: CATALOG_META.name, url: CATALOG_META.url },
  skills: ids.map(buildSkill),
};

// Sanity check: every declared dependsOn target must exist in the catalog.
const known = new Set(ids);
for (const skill of manifest.skills) {
  for (const dep of skill.dependsOn) {
    if (!known.has(dep)) throw new Error(`${skill.id} dependsOn unknown skill "${dep}"`);
  }
}

const serialize = (obj) => `${JSON.stringify(obj, null, 2)}\n`;
const withoutTimestamp = (obj) => {
  const { generatedAt, ...rest } = obj;
  return serialize(rest);
};

let previous = null;
try {
  previous = JSON.parse(readFileSync(MANIFEST_PATH, 'utf8'));
} catch {
  /* no manifest yet */
}

if (previous && withoutTimestamp(previous) === withoutTimestamp(manifest)) {
  console.log(`manifest.json unchanged (${manifest.skills.length} skills) — not rewritten`);
} else {
  writeFileSync(MANIFEST_PATH, serialize(manifest));
  console.log(`manifest.json written (${manifest.skills.length} skills)`);
}
