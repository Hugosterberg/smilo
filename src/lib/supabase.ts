import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let cachedAdmin: SupabaseClient | null = null;

// Server-only Supabase-klient med service_role-nyckeln. Förbigår RLS och får
// ALDRIG importeras i klientkod. Returnerar null om miljövariabler saknas så
// att anropande kod kan svara med ett tydligt fel istället för att krascha.
export function getSupabaseAdmin(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    return null;
  }

  if (!cachedAdmin) {
    cachedAdmin = createClient(url, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }

  return cachedAdmin;
}
