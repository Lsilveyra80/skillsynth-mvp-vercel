// pages/login.js
import { useEffect } from "react";
import { useRouter } from "next/router";
import { supabaseClient } from "../lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    supabaseClient.auth.getSession().then(({ data }) => {
      if (data.session) {
        router.replace("/dashboard");
      }
    });
  }, [router]);

  async function loginWithGoogle() {
    await supabaseClient.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center px-4">
      <div className="max-w-sm w-full rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
        <h1 className="text-xl font-semibold mb-4 text-center">
          Iniciar sesión en SkillSynth
        </h1>
        <button
          onClick={loginWithGoogle}
          className="w-full rounded-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold py-2.5 text-sm"
        >
          Continuar con Google
        </button>
      </div>
    </main>
  );
}
