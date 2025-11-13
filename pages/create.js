import { useState } from "react";
import SkillCard from "@/components/SkillCard";

export default function Create() {
  const [habilidades, setHabilidades] = useState("");
  const [objetivo, setObjetivo] = useState("");
  const [industria, setIndustria] = useState("");
  const [tiempo, setTiempo] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/compose", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          habilidades,
          objetivo,
          industria,
          tiempo
        })
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Error al generar tu SkillSynth.");
      }

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setError(err.message || "Algo salió mal.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen px-4 py-8 flex justify-center">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
          Creá tu SkillSynth
        </h1>
        <p className="text-slate-300 mb-6">
          Completá algunos datos sobre vos y dejá que la IA componga una nueva habilidad
          profesional a tu medida.
        </p>

        <form
          onSubmit={handleSubmit}
          className="grid gap-4 rounded-3xl border border-slate-800 bg-slate-900/50 p-6 md:p-7"
        >
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-1">
              Tus habilidades actuales
            </label>
            <textarea
              className="w-full rounded-2xl bg-slate-950 border border-slate-800 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 resize-none"
              rows={3}
              placeholder="Ej: Excel avanzado, Power BI, SAP, diseño gráfico, escritura, IA generativa…"
              value={habilidades}
              onChange={(e) => setHabilidades(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-200 mb-1">
              ¿Qué objetivo tenés?
            </label>
            <textarea
              className="w-full rounded-2xl bg-slate-950 border border-slate-800 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 resize-none"
              rows={2}
              placeholder="Ej: Generar ingresos extra, cambiar de carrera, emprender, escalar mi trabajo actual…"
              value={objetivo}
              onChange={(e) => setObjetivo(e.target.value)}
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-1">
                Industrias de interés
              </label>
              <input
                className="w-full rounded-2xl bg-slate-950 border border-slate-800 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                placeholder="Ej: tecnología, educación, marketing, logística, salud…"
                value={industria}
                onChange={(e) => setIndustria(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-200 mb-1">
                Tiempo disponible por semana
              </label>
              <input
                className="w-full rounded-2xl bg-slate-950 border border-slate-800 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                placeholder="Ej: 5 horas, 10 horas, 1 hora por día…"
                value={tiempo}
                onChange={(e) => setTiempo(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-sky-500 hover:bg-sky-400 disabled:opacity-60 disabled:cursor-not-allowed text-slate-950 text-sm font-semibold mt-2"
          >
            {loading ? "Generando tu SkillSynth…" : "Generar SkillSynth"}
          </button>

          {error && (
            <p className="text-sm text-red-400 mt-1">
              {error}
            </p>
          )}
        </form>

        <SkillCard data={result} />
      </div>
    </main>
  );
}
