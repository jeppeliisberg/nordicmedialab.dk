// Shared Airtable helper for the member self-service functions.
// The secret token comes from the Netlify environment (AIRTABLE_TOKEN),
// never from the client and never committed to the repo.

const TOKEN = process.env.AIRTABLE_TOKEN;
export const BASE = process.env.AIRTABLE_BASE || 'app4morH6kYt6Ys6J';

// Table + field ids for the Members base. Ids are stable and not secret.
export const ORG = {
  table: 'tbloHob3MshA1Wtlj',
  logo: 'fldtKcsq7YDAe0T3s',
};
export const PERSON = {
  table: 'tbl0yyH0keeE3O1Rn',
};

export function json(statusCode, obj) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    body: JSON.stringify(obj),
  };
}

// Thin wrapper over the Airtable REST API. host defaults to the data API,
// but the attachment-upload endpoint lives on content.airtable.com.
export async function at(path, { method = 'GET', body, host = 'api.airtable.com' } = {}) {
  if (!TOKEN) throw new Error('AIRTABLE_TOKEN is not set');
  const res = await fetch(`https://${host}/v0/${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { raw: text };
  }
  if (!res.ok) {
    const err = new Error(`Airtable ${res.status}: ${(data && data.error && data.error.message) || text}`);
    err.status = res.status;
    throw err;
  }
  return data;
}

// Look up an Organisation by its secret update token.
// The token is validated against a strict charset before it ever reaches
// a formula, so it cannot be used for formula injection.
export async function findOrgByToken(token) {
  if (!token || !/^[A-Za-z0-9_-]{16,128}$/.test(token)) return null;
  const formula = encodeURIComponent(`{Update token}='${token}'`);
  const data = await at(`${BASE}/${ORG.table}?maxRecords=1&filterByFormula=${formula}`);
  return data.records && data.records[0] ? data.records[0] : null;
}
