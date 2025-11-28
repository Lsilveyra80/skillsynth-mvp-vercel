// pages/auth/callback.js
import { useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    async function handleCallback() {
      // Supabase procesa el hash del URL (#access_token...) automáticamente
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Error al obtener sesión en callback:", error);
        router.replace("/login");
        return;
      }

      if (data.session) {
        router.replace("/dashboard");
      } else {
        // Si todavía no hay sesión, intento refrescar por las dudas
        await supabase.auth.getUser();
        const { data: dataAgain } = await supabase.auth.getSession();
        if (dataAgain?.session) {
          router.replace("/dashboard");
        } else {
          router.replace("/login");
        }
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
