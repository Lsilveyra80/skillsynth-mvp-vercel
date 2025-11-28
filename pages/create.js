// pages/create.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabaseClient";

export default function CreatePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [project, setProject] = useState(null);
  const [title, setTitle] = useState("");
  const [goal, setGoal] = useState("");
  const [loading, setLoading] = useState(false);

  // Cargar usuario + asegurar proyecto activo
  useEffect(() => {
    const init = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        router.push("/login");
        return;
      }

      setUser(user);

      // Asegurarnos de tener projectId (por si entra directo a /create)
      const resp = await fetch("/api/projects/ensure-default", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id }),
      });

      if (!resp.ok) {
        console.error("No se pudo asegurar el proyecto activo");
        return;
      }

      const json = await resp.json();
      setProject(json.project);
    };

    init();
  }, [router]);

  // Manejar el submit del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !project) return;

    setLoading(true);

    try {
      const response = await fetch("/api/compose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          goal,
          userId: user.id,
          projectId: project.id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Mensajes más claros según el tipo de error
        if (response.status === 403) {
          alert(
            data.error ||
              "Límite alcanzado para el plan Starter. Pasá a Plus o Pro."
          );
        } else {
          alert(data.error || "Error al generar las tarjetas");
        }
        return;
      }

      // Podrías redirigir a una futura página de "proyecto"
      // Por ahora, lo mando al dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Hubo un problema al crear el proyecto. Intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  if (!user || !project) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-950">
        <p className="text-slate-200 text-sm">Cargando tu espacio...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-xl">
        <h1 className="text-2xl font-semibold text-white mb-4">
          Crear nueva SkillSynth
        </h1>
        <p className="text-sm text-slate-300 mb-6">
          Contame el título y el objetivo; SkillSynth va a generar las tarjetas
          de habilidades en base a eso.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-200 mb-1">
              Título del proyecto
            </label>
            <input
              type="text"
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-sky-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: Portfolio de habilidades para Data Analyst"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-slate-200 mb-1">
              Objetivo / contexto
            </label>
            <textarea
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-sky-500 min-h-[120px]"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="Ej: quiero mostrar mis skills de análisis de datos para postularme a empleos remotos..."
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold py-2 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Generando tarjetas..." : "Crear proyecto y generar tarjetas"}
          </button>
        </form>
      </div>
    </main>
  );
}
