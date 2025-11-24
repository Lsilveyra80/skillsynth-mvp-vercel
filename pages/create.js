// pages/create.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabaseClient";

export default function CreatePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [goal, setGoal] = useState("");
  const [loading, setLoading] = useState(false);

  // Chequear sesión apenas entra a la página
  useEffect(() => {
    const loadUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        // Si no hay usuario logueado, lo mando a /login
        router.push("/login");
      } else {
        setUser(user);
      }
    };

    loadUser();
  }, [router]);

  // Manejar el submit del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);

    try {
      const response = await fetch("/api/compose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          goal,
          userId: user.id,
          // si tenés projectId, lo podés agregar acá
          // projectId,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al generar las tarjetas");
      }

      const data = await response.json();

      // Si tu API devuelve projectId, por ejemplo:
      if (data.projectId) {
        router.push(`/projects/${data.projectId}`);
      } else {
        // O, si todavía no tenés esa ruta, simplemente podrías ir al home
        router.push("/");
      }
    } catch (error) {
      console.error(error);
      alert("Hubo un problema al crear el proyecto. Intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Redirigiendo al login...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-xl">
        <h1 className="text-2xl font-semibold text-white mb-4">
          Crear nuevo proyecto de habilidades
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
