// Build-time: regenerate the members grid from Airtable.
//
// Runs before `vite build` (see package.json). It pulls every Approved
// Initiative from the Members base, downloads each logo into public/members/,
// and rewrites the `members.cards` array in src/locales/en.json + da.json so
// the grid renders live data instead of a hand-maintained list.
//
// Safety: if AIRTABLE_TOKEN is missing or Airtable is unreachable, it changes
// nothing and exits 0, so the last committed member list still ships and a bad
// token can never break a deploy. Locally (no token) it is a no-op, so
// `npm run build` never clobbers the committed locale files.
//
// Which members appear:
//   default            → only Approved rows that have a description or a logo
//                        (a name-only row stays hidden until it has content).
//   MEMBERS_INCLUDE_BARE=true → every Approved row, including name-only ones.

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const TOKEN = process.env.AIRTABLE_TOKEN;
const BASE = process.env.AIRTABLE_BASE || 'app4morH6kYt6Ys6J';
const TABLE = 'tbloHob3MshA1Wtlj'; // Initiatives
const INCLUDE_BARE = process.env.MEMBERS_INCLUDE_BARE === 'true';

const LOCALES = {
  en: resolve(ROOT, 'src/locales/en.json'),
  da: resolve(ROOT, 'src/locales/da.json'),
};
const LOGO_DIR = resolve(ROOT, 'public/members');

const slugify = (s) =>
  (s || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'member';

const extFor = (att) => {
  const m = /\.([a-z0-9]+)$/i.exec(att.filename || '');
  if (m) return m[1].toLowerCase();
  if (att.type === 'image/svg+xml') return 'svg';
  if (att.type === 'image/png') return 'png';
  if (att.type === 'image/jpeg') return 'jpg';
  return 'img';
};

const displayUrl = (u) => (u || '').trim().replace(/^https?:\/\//i, '').replace(/\/+$/, '');

async function fetchApproved() {
  const records = [];
  let offset;
  do {
    const params = new URLSearchParams({
      filterByFormula: "{Status}='Approved'",
      pageSize: '100',
    });
    if (offset) params.set('offset', offset);
    const res = await fetch(`https://api.airtable.com/v0/${BASE}/${TABLE}?${params}`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    if (!res.ok) throw new Error(`Airtable ${res.status}: ${await res.text()}`);
    const data = await res.json();
    records.push(...(data.records || []));
    offset = data.offset;
  } while (offset);
  return records;
}

async function downloadLogo(att, slug) {
  const res = await fetch(att.url);
  if (!res.ok) throw new Error(`logo ${res.status} for ${slug}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const file = `${slug}.${extFor(att)}`;
  await writeFile(resolve(LOGO_DIR, file), buf);
  return `/members/${file}`;
}

async function writeCards(lang, cards) {
  const path = LOCALES[lang];
  const doc = JSON.parse(await readFile(path, 'utf8'));
  doc.members = doc.members || {};
  doc.members.cards = cards;
  await writeFile(path, JSON.stringify(doc, null, 2) + '\n');
}

async function main() {
  if (!TOKEN) {
    console.log('[build-members] no AIRTABLE_TOKEN, keeping committed member list.');
    return;
  }

  const records = await fetchApproved();

  // Stable order: originally seeded members first (older createdTime), then name.
  records.sort((a, b) => {
    const t = (a.createdTime || '').localeCompare(b.createdTime || '');
    return t !== 0 ? t : (a.fields?.Name || '').localeCompare(b.fields?.Name || '');
  });

  await mkdir(LOGO_DIR, { recursive: true });

  const en = [];
  const da = [];
  let id = 0;
  let hidden = 0;

  for (const r of records) {
    const f = r.fields || {};
    const name = (f.Name || '').trim();
    if (!name) continue;

    const descEN = (f['Description EN'] || '').trim();
    const descDA = (f['Description DA'] || '').trim();
    const logoAtt = Array.isArray(f.Logo) && f.Logo[0];
    const hasContent = descEN || descDA || logoAtt;

    if (!INCLUDE_BARE && !hasContent) {
      hidden++;
      continue;
    }

    id++;
    const slug = slugify(name);
    let logo = '';
    if (logoAtt) {
      try {
        logo = await downloadLogo(logoAtt, slug);
      } catch (e) {
        console.warn(`[build-members] ${e.message}`); // skip logo, keep card
      }
    }
    const memberurl = displayUrl(f.Website);

    const base = { id, headline: name };
    en.push({ ...base, text: descEN || descDA || '', ...(logo ? { logo } : {}), ...(memberurl ? { memberurl } : {}) });
    da.push({ ...base, text: descDA || descEN || '', ...(logo ? { logo } : {}), ...(memberurl ? { memberurl } : {}) });
  }

  await writeCards('en', en);
  await writeCards('da', da);
  console.log(
    `[build-members] wrote ${en.length} members` +
      (hidden ? `, hid ${hidden} name-only row(s) (set MEMBERS_INCLUDE_BARE=true to show them)` : '') +
      '.'
  );
}

main().catch((e) => {
  // Fallback: keep the committed member list, never fail the build.
  console.error('[build-members] failed, keeping committed member list:', e && e.message ? e.message : e);
  process.exit(0);
});
