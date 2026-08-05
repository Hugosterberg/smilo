// Engångshjälpare: kör en SQL-fil mot Supabase Management API.
// Användning: SUPABASE_ACCESS_TOKEN=... node scripts/run-sql.mjs <fil.sql>
import { readFileSync } from 'node:fs';

const [, , sqlPath] = process.argv;
const token = process.env.SUPABASE_ACCESS_TOKEN;
const projectRef = 'lneqclumquxpuxvquwwq';

if (!token || !sqlPath) {
  console.error('Saknar SUPABASE_ACCESS_TOKEN eller sökväg till SQL-fil.');
  process.exit(1);
}

const query = readFileSync(sqlPath, 'utf8').replace(/^\uFEFF/, '');

const res = await fetch(`https://api.supabase.com/v1/projects/${projectRef}/database/query`, {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ query }),
});

const text = await res.text();
if (!res.ok) {
  console.error(`Fel ${res.status}: ${text}`);
  process.exit(1);
}
console.log('OK:', text || '(tomt svar)');
