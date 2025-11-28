// pages/create.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabaseClient";

export default function CreatePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [project, setProject] = useState(null);

  // Campos del formulario estilo PDF
  const [currentSkills, setCurrentSkills] = useState("");
  const [goals, setGoals] = useState("");
  const [industries, setIndustries] = useState("");
  const [timePerWeek, setTimePerWeek] = useState("");

  const [loading, setLoading] = useState(false);

  // Cargar usuario + asegurar proyecto activo
  useEffect(() => {
    const init = async () => {
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();

        if (error || !user) {
          console.error("Error al obtener usuario en /create:", error);
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
      } catch (err) {
        console.error("Error general en init de /create:", err);
        router.push("/login");
      }
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
          currentSkills,
          goals,
          industries,
          timePerWeek,
          userId: user.id,
          projectId: project.id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        let msg =
          data.error || "Error al generar las tarjetas. Intentá de nuevo.";
        if (data.detail) {
          msg += `\n\nDetalle: ${data.detail}`;
        }

        if (response.status === 403) {
          msg =
            data.error ||
            "Límite alcanzado para el plan Starter. Pasá a Plus o Pro.";
        }

        alert(msg);
        return;
      }

      // Después de generar, vamos a la página del proyecto a ver la SkillSynth
      router.push(`/projects/${project.id}`);
    } catch (error) {
      console.error("Error en handleSubmit /create:", error);
      alert("Hubo un problema al crear la SkillSynth. Intentá de nuevo.");
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
      <div className="w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-2xl p-8 shadow-xl">
        <h1 className="text-3xl font-semibold text-white mb-2">
          Creá tu SkillSynth
        </h1>
        <p className="text-sm text-slate-300 mb-8">
          Completá algunos datos sobre vos y dejá que la IA componga una nueva
          habilidad profesional a tu medida.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Tus habilidades actuales */}
          <div>
            <label className="block text-sm text-slate-200 mb-1">
              Tus habilidades actuales
            </label>
            <textarea
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-sky-500 min-h-[80px]"
              value={currentSkills}
              onChange={(e) => setCurrentSkills(e.target.value)}
              placeholder="Curioso, creativo, observador, Power BI, Excel, imaginación..."
              required
            />
          </div>

          {/* ¿Qué objetivos tenés? */}
          <div>
            <label className="block text-sm text-slate-200 mb-1">
              ¿Qué objetivos tenés?
            </label>
            <input
              type="text"
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-sky-500"
              value={goals}
              onChange={(e) => setGoals(e.target.value)}
              placeholder="Generar ingresos extras, conseguir empleo remoto, cambiar de carrera..."
              required
            />
          </div>

          {/* Fila: Industrias + Tiempo disponible */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-200 mb-1">
                Industrias de interés
              </label>
              <input
                type="text"
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-sky-500"
                value={industries}
                onChange={(e) => setIndustries(e.target.value)}
                placeholder="Tecnología, educación, marketing..."
                required
              />
            </div>

            <div>
              <label className="block text-sm text-slate-200 mb-1">
                Tiempo disponible por semana
              </label>
              <input
                type="text"
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-sky-500"
                value={timePerWeek}
                onChange={(e) => setTimePerWeek(e.target.value)}
                placeholder="5 horas, 10 horas..."
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 rounded-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold py-3 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Generando SkillSynth..." : "Generar SkillSynth"}
          </button>
        </form>
      </div>
    </main>
  );
}
