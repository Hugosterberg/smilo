import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let cachedAdmin: SupabaseClient | null = null;

// Server-only Supabase-klient med den hemliga nyckeln (sb_secret / service_role).
// Förbigår RLS och får ALDRIG importeras i klientkod. Returnerar null om
// miljövariabler saknas så att anropande kod kan svara med ett tydligt fel
// istället för att krascha.
export function getSupabaseAdmin(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !secretKey) {
    return null;
  }

  if (!cachedAdmin) {
    cachedAdmin = createClient(url, secretKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }

  return cachedAdmin;
}
