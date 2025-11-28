// lib/supabaseServer.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Seguridad básica: si falta la key, mejor explotar en build
if (!supabaseUrl || !serviceRoleKey) {
  throw new Error(
    "Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en las env vars del backend"
  );
}

// Cliente con Service Role para usar SOLO en el backend (API routes)
export const supabaseServer = createClient(supabaseUrl, serviceRoleKey);
