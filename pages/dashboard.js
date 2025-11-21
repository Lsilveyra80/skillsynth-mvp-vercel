// pages/dashboard.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabaseClient } from "../lib/supabaseClient";
import Link from "next/link";

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [project, setProject] = useState(null);

  useEffect(() => {
    async function init() {
      const { data } = await supabaseClient.auth.getSession();
      if (!data.session) {
        router.replace("/login");
        return;
      }
      setSession(data.session);

      // Aseguramos que tenga proyecto activo
      const resp = await fetch("/api/projects/ensure-default", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: data.session.user.id }),
      });
      const json = await resp.json();
      setProject(json.project);
      setLoading(false);
    }
    init();
  }, [router]);

  async function logout() {
    await supabaseClient.auth.signOut();
    router.replace("/login");
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center">
        <p className="text-slate-300 text-sm">Cargando tu espacio...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 px-4">
      <header className="max-w-4xl mx-auto pt-6 flex items-center justify-between">
        <h1 className="text-lg font-semibold">SkillSynth Dashboard</h1>
        <button
          onClick={logout}
          className="text-xs text-slate-400 hover:text-slate-200"
        >
          Cerrar sesión
        </button>
      </header>

      <section className="max-w-4xl mx-auto pt-6 pb-16">
        <p className="text-slate-300 text-sm mb-4">
          Hola {session.user.email}. Este es tu proyecto activo:
        </p>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 mb-6">
          <p className="text-sm font-semibold text-slate-100">
            {project?.name}
          </p>
          <p className="text-xs text-slate-400">
            Todas las SkillSynth que generes se guardarán aquí.
          </p>
        </div>

        <Link
          href={{
            pathname: "/create",
            query: { projectId: project.id }, // lo pasás como query
          }}
          className="inline-flex px-5 py-2.5 rounded-full bg-sky-500 hover:bg-sky-400 text-slate-950 text-sm font-semibold"
        >
          Crear nueva SkillSynth
        </Link>
      </section>
    </main>
  );
}

