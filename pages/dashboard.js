// pages/dashboard.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabaseClient";
import Link from "next/link";

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [project, setProject] = useState(null);

  useEffect(() => {
    async function init() {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          console.error("Error al obtener la sesión:", error);
          router.replace("/login");
          return;
        }

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

        if (!resp.ok) {
          throw new Error("Error al asegurar proyecto por defecto");
        }

        const json = await resp.json();
        setProject(json.project);
      } catch (err) {
        console.error("Error en init del dashboard:", err);
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    }

    init();
  }, [router]);

  async function logout() {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error("Error al cerrar sesión:", err);
    } finally {
      router.replace("/login");
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center">
        <p className="text-slate-300 text-sm">Cargando tu espacio...</p>
      </main>
    );
  }

  const displayName =
    session.user.user_metadata?.username || session.user.email;

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 px-4">
      <header className="max-w-4xl mx-auto pt-6 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">SkillSynth Dashboard</h1>
          <p className="text-xs text-slate-400">
            Sesión iniciada como{" "}
            <span className="font-medium text-slate-200">{displayName}</span>
          </p>
        </div>

        <button
          onClick={logout}
          className="text-xs text-slate-400 hover:text-slate-200"
        >
          Cerrar sesión
        </button>
      </header>

      <section className="max-w-4xl mx-auto pt-6 pb-16">
        <p className="text-slate-300 text-sm mb-1">
          Hola {displayName}. Este es tu proyecto activo:
        </p>

        <p className="text-xs text-slate-400 mb-4">
          <Link href="/profile" className="underline hover:text-slate-200">
            Editar nombre de usuario
          </Link>
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
            query: { projectId: project.id },
          }}
          className="inline-flex px-5 py-2.5 rounded-full bg-sky-500 hover:bg-sky-400 text-slate-950 text-sm font-semibold"
        >
          Crear nueva SkillSynth
        </Link>
      </section>
    </main>
  );
}

