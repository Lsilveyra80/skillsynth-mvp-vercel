// pages/auth/callback.js
import { useEffect } from "react";
import { useRouter } from "next/router";
import { supabaseClient } from "../../lib/supabaseClient";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    async function handleCallback() {
      // Supabase maneja el hash del URL automáticamente
      const { data } = await supabaseClient.auth.getSession();
      if (data.session) {
        router.replace("/dashboard");
      } else {
        router.replace("/login");
      }
    }
    handleCallback();
  }, [router]);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center">
      <p className="text-slate-300 text-sm">Procesando inicio de sesión...</p>
    </main>
  );
}
