// POST /.netlify/functions/member-update
// Body: { token, name, descriptionEN, descriptionDA, website,
//         logo?: { filename, contentType, dataBase64 },
//         contacts: [{ id?, name, email, phone, title }] }
//
// Writes the member's edits back to Airtable. It does NOT publish:
// changes wait for the board's "Publish to site" tick, which is the
// review-and-go-live step.

import { at, json, findOrgByToken, BASE, ORG, PERSON } from './_airtable.mjs';

export async function handler(event) {
  if (event.httpMethod !== 'POST') return json(405, { error: 'method_not_allowed' });

  let payload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch {
    return json(400, { error: 'bad_json' });
  }

  try {
    const org = await findOrgByToken(payload.token);
    if (!org) return json(404, { error: 'not_found' });
    const orgId = org.id;

    // 1) Organisation listing fields.
    const fields = {};
    if (typeof payload.name === 'string') fields['Name'] = payload.name.trim();
    if (typeof payload.descriptionEN === 'string') fields['Description EN'] = payload.descriptionEN.trim().slice(0, 200);
    if (typeof payload.descriptionDA === 'string') fields['Description DA'] = payload.descriptionDA.trim().slice(0, 200);
    if (typeof payload.website === 'string') fields['Website'] = payload.website.trim();
    if (Object.keys(fields).length) {
      await at(`${BASE}/${ORG.table}/${orgId}`, { method: 'PATCH', body: { fields } });
    }

    // 2) Logo (optional). Airtable's upload endpoint takes base64, max ~5MB.
    if (payload.logo && payload.logo.dataBase64) {
      await at(`${BASE}/${orgId}/${ORG.logo}/uploadAttachment`, {
        host: 'content.airtable.com',
        method: 'POST',
        body: {
          contentType: payload.logo.contentType || 'application/octet-stream',
          filename: payload.logo.filename || 'logo',
          file: payload.logo.dataBase64,
        },
      });
    }

    // 3) Contacts. Update in place, create new, unlink removed (never delete).
    const submitted = Array.isArray(payload.contacts) ? payload.contacts : [];
    const existingIds = org.fields['Contacts'] || [];
    const keptIds = new Set(submitted.filter((c) => c.id).map((c) => c.id));

    for (const c of submitted.filter((c) => c.id)) {
      await at(`${BASE}/${PERSON.table}/${c.id}`, {
        method: 'PATCH',
        body: {
          fields: {
            'Full name': (c.name || '').trim(),
            Email: (c.email || '').trim(),
            Phone: (c.phone || '').trim(),
            'Title / role': (c.title || '').trim(),
          },
        },
      });
    }

    for (const c of submitted.filter(
      (c) => !c.id && ((c.name && c.name.trim()) || (c.email && c.email.trim()))
    )) {
      await at(`${BASE}/${PERSON.table}`, {
        method: 'POST',
        body: {
          fields: {
            'Full name': (c.name || '').trim(),
            Email: (c.email || '').trim(),
            Phone: (c.phone || '').trim(),
            'Title / role': (c.title || '').trim(),
            'Person type': 'Contact',
            Organisation: [orgId],
          },
        },
      });
    }

    for (const id of existingIds.filter((id) => !keptIds.has(id))) {
      await at(`${BASE}/${PERSON.table}/${id}`, {
        method: 'PATCH',
        body: { fields: { Organisation: [] } },
      });
    }

    return json(200, { ok: true });
  } catch (e) {
    return json(500, { error: 'server', message: String(e.message || e) });
  }
}
