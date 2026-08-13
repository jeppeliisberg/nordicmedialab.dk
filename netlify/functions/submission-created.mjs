// Netlify Forms intake → Airtable.
//
// Netlify fires this function on every VERIFIED "member-submission" form
// submission (spam + honeypot already filtered upstream). It maps the
// submission into the Members base:
//   - Platform / Organisation / Consultant / Other  → one Initiatives row
//     (Status = New), plus one People row per contact, linked to it.
//   - Individual                                     → one People row
//     (Person type = Individual member), no Initiative.
//
// Nothing here is public: new Initiatives land as Status = New and only
// reach the site after the board sets Status = Approved and ticks
// "Publish to site". This function never publishes.

import { at, BASE, ORG, PERSON } from './_airtable.mjs';

const today = () => new Date().toISOString().slice(0, 10);

// Form "type" value → Initiatives "Type" single-select option.
const TYPE_MAP = {
  platform: 'Platform',
  organization: 'Organisation',
  consultant: 'Consultant',
  other: 'Other',
};

// A file field arrives either as a URL string or as { url }. Return a URL or ''.
function fileUrl(v) {
  if (!v) return '';
  if (typeof v === 'string') return v.startsWith('http') ? v : '';
  if (typeof v === 'object' && typeof v.url === 'string') return v.url;
  return '';
}

// Pull contact1..5_{name,email,title} out of the flat form data.
function readContacts(d) {
  const out = [];
  for (let i = 1; i <= 5; i++) {
    const name = (d[`contact${i}_name`] || '').trim();
    const email = (d[`contact${i}_email`] || '').trim();
    const title = (d[`contact${i}_title`] || '').trim();
    if (name || email) out.push({ name, email, title });
  }
  return out;
}

export async function handler(event) {
  let payload;
  try {
    payload = JSON.parse(event.body || '{}').payload || {};
  } catch {
    return { statusCode: 400, body: 'bad_json' };
  }

  // Ignore anything that isn't our member form.
  if (payload.form_name && payload.form_name !== 'member-submission') {
    return { statusCode: 200, body: 'ignored' };
  }

  const d = payload.data || {};
  const type = (d.type || '').trim();
  const name = (d.name || '').trim();
  if (!name) return { statusCode: 200, body: 'no_name' };

  try {
    if (type === 'individual') {
      // Individual → People row only.
      await at(`${BASE}/${PERSON.table}`, {
        method: 'POST',
        body: {
          fields: {
            'Full name': name,
            Email: (d.email || '').trim(),
            Bio: (d.bio || '').trim(),
            Link: (d.website || '').trim(),
            'Person type': 'Individual member',
            Added: today(),
          },
        },
      });
      return { statusCode: 200, body: 'ok_individual' };
    }

    // Platform / Organisation / Consultant / Other → Initiatives row.
    const lang = (d.language || 'da').trim().toLowerCase();
    const description = (d.description || '').trim();
    const logo = fileUrl(d.logo);

    const fields = {
      Name: name,
      Type: TYPE_MAP[type] || 'Other',
      Status: 'New',
      Website: (d.website || '').trim(),
      Applied: today(),
    };
    // The submitter picks one language for their description; store it in the
    // matching column so the board can translate the other side on review.
    if (description) fields[lang === 'en' ? 'Description EN' : 'Description DA'] = description;
    if (logo) fields.Logo = [{ url: logo }];

    const created = await at(`${BASE}/${ORG.table}`, {
      method: 'POST',
      body: { fields },
    });
    const orgId = created.id;

    // One People row per contact, linked to the new Initiative.
    for (const c of readContacts(d)) {
      await at(`${BASE}/${PERSON.table}`, {
        method: 'POST',
        body: {
          fields: {
            'Full name': c.name,
            Email: c.email,
            'Title / role': c.title,
            'Person type': 'Contact',
            Added: today(),
            Organisation: [orgId],
          },
        },
      });
    }

    return { statusCode: 200, body: 'ok_initiative' };
  } catch (e) {
    // Never throw back at Netlify: the submission is already safely stored in
    // Netlify Forms as a backup, so we log and return 200 rather than lose it.
    console.error('member intake failed:', e && e.message ? e.message : e);
    return { statusCode: 200, body: 'error_logged' };
  }
}
