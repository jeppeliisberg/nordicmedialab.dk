// GET /.netlify/functions/member-get?token=...
// Returns the current listing data for the member the token belongs to,
// so the self-service page can pre-fill the form.

import { at, json, findOrgByToken, BASE, PERSON } from './_airtable.mjs';

export async function handler(event) {
  try {
    const token = event.queryStringParameters && event.queryStringParameters.token;
    const org = await findOrgByToken(token);
    if (!org) return json(404, { error: 'not_found' });

    const f = org.fields || {};
    const logo = Array.isArray(f['Logo']) && f['Logo'][0];

    let contacts = [];
    const contactIds = f['Contacts'] || [];
    if (contactIds.length) {
      const formula = encodeURIComponent(
        'OR(' + contactIds.map((id) => `RECORD_ID()='${id}'`).join(',') + ')'
      );
      const pdata = await at(`${BASE}/${PERSON.table}?filterByFormula=${formula}`);
      contacts = (pdata.records || []).map((r) => ({
        id: r.id,
        name: r.fields['Full name'] || '',
        email: r.fields['Email'] || '',
        title: r.fields['Title / role'] || '',
      }));
    }

    return json(200, {
      id: org.id,
      name: f['Name'] || '',
      type: f['Type'] || '',
      descriptionEN: f['Description EN'] || '',
      descriptionDA: f['Description DA'] || '',
      website: f['Website'] || '',
      logoUrl: logo ? logo.url : '',
      contacts,
    });
  } catch (e) {
    return json(e.status === 429 ? 429 : 500, { error: 'server', message: String(e.message || e) });
  }
}
