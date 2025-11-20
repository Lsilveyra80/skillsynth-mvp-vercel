// pages/create.js
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function CreatePage() {
  const router = useRouter();
  const queryPlan = router.query.plan;

  // Estado inicial por defecto
  const [plan, setPlan] = useState("starter");

  // Cuando llega el plan por query param lo sincronizamos
  useEffect(() => {
    if (!queryPlan) return;
    const validPlans = ["starter", "plus", "pro"];
    if (validPlans.includes(queryPlan)) {
      setPlan(queryPlan);
    }
  }, [queryPlan]);

  const [habilidades, setHabilidades] = useState("");
  const [objetivo, setObjetivo] = useState("");
  const [industria, setIndustria] = useState("");
  const [tiempo, setTiempo] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [result, setResult] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg("");
    setResult(null);

    if (!habilidades || !objetivo || !industria || !tiempo) {
      setErrorMsg("Por favor completa todos los campos.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/compose", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          habilidades,
          objetivo,
          industria,
          tiempo,
          plan, // ← Se envía el plan al backend
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMsg(
          data?.error ||
            "Ocurrió un error al generar tu SkillSynth. Intenta nuevamente."
        );
        return;
      }

      setResult(data);
    } catch (err) {
      console.error(err);
      setErrorMsg("Error de conexión. Intenta nuevamente en unos minutos.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 px-4">
      <header className="max-w-4xl mx-auto pt-6 flex items-center justify-between">
        <Link href="/" className="text-sm text-slate-400 hover:text-slate-200">
          ← Volver al inicio
        </Link>
        <span className="text-xs text-slate-500">Beta • Generador IA</span>
      </header>

      <section className="max-w-4xl mx-auto pt-4 pb-16">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
          Crear mi SkillSynth
        </h1>
        <p className="text-slate-300 mb-6">
          Completá los datos y generá una tarjeta de habilidad compuesta por IA.
        </p>

        {/* Selector de plan */}
        <div className="mb-6 grid gap-4 md:grid-cols-3">
          <button
            type="button"
            onClick={() => setPlan("starter")}
            className={`rounded-2xl border p-3 text-left text-sm transition ${
              plan === "starter"
                ? "border-sky-500 bg-slate-900"
                : "border-slate-800 bg-slate-950 hover:border-slate-700"
            }`}
          >
            <p className="font-semibold">Starter</p>
            <p className="text-slate-400 text-xs">
              Hasta 5 SkillSynth al mes. Ideal para probar.
            </p>
          </button>

          <button
            type="button"
            onClick={() => setPlan("plus")}
            className={`rounded-2xl border p-3 text-left text-sm transition ${
              plan === "plus"
                ? "border-emerald-500 bg-slate-900"
                : "border-slate-800 bg-slate-950 hover:border-slate-700"
            }`}
          >
            <p className="font-semibold">Plus</p>
            <p className="text-slate-400 text-xs">
              Hasta 50 SkillSynth al mes. Para creadores y freelancers.
            </p>
          </button>

          <button
            type="button"
            onClick={() => setPlan("pro")}
            className={`rounded-2xl border p-3 text-left text-sm transition ${
              plan === "pro"
                ? "border-violet-500 bg-slate-900"
                : "border-slate-800 bg-slate-950 hover:border-slate-700"
            }`}
          >
            <p className="font-semibold">Pro</p>
            <p className="text-slate-400 text-xs">
              Generación ilimitada. Ideal uso diario y profesional.
            </p>
          </button>
        </div>

        {/* Info del plan elegido */}
        <div className="mb-6 text-xs text-slate-400">
          {plan === "starter" && (
            <p>
              Estás usando el plan <span className="font-semibold">Starter</span>
              . Tenés hasta{" "}
              <span className="font-semibold">5 tarjetas</span> por mes.
            </p>
          )}
          {plan === "plus" && (
            <p>
              Estás usando el plan <span className="font-semibold">Plus</span>.
              Tenés hasta{" "}
              <span className="font-semibold">50 tarjetas</span> por mes.
            </p>
          )}
          {plan === "pro" && (
            <p>
              Estás usando el plan <span className="font-semibold">Pro</span>.
              Podés generar{" "}
              <span className="font-semibold">tarjetas ilimitadas</span>.
            </p>
          )}
        </div>

        {/* Formulario */}
        <form
          onSubmit={handleSubmit}
          className="grid gap-4 rounded-2xl border border-slate-800 bg-slate-900/40 p-4 md:p-6"
        >
          <div>
            <label className="block text-sm font-medium mb-1">
              ¿Qué habilidades tenés hoy?
            </label>
            <textarea
              className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-1 focus:ring-sky-500"
              rows={3}
              placeholder="Ej: análisis de datos, logística, diseño con Canva, trato con clientes..."
              value={habilidades}
              onChange={(e) => setHabilidades(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              ¿Qué objetivo te gustaría lograr?
            </label>
            <input
              className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-1 focus:ring-sky-500"
              placeholder="Ej: generar ingresos extra online, trabajar remoto, cambiar de carrera..."
              value={objetivo}
              onChange={(e) => setObjetivo(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              ¿En qué industrias te gustaría moverte?
            </label>
            <input
              className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-1 focus:ring-sky-500"
              placeholder="Ej: tecnología, educación, contenidos digitales, IA aplicada..."
              value={industria}
              onChange={(e) => setIndustria(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              ¿Cuánto tiempo semanal podés dedicarle?
            </label>
            <input
              className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-1 focus:ring-sky-500"
              placeholder="Ej: 5 horas por semana, 30 minutos por día..."
              value={tiempo}
              onChange={(e) => setTiempo(e.target.value)}
            />
          </div>

          {errorMsg && (
            <div className="rounded-xl border border-rose-700 bg-rose-950/50 px-3 py-2 text-xs text-rose-100">
              {errorMsg}
            </div>
          )}

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center px-5 py-2.5 rounded-full bg-sky-500 hover:bg-sky-400 disabled:bg-sky-800 text-slate-950 text-sm font-semibold shadow-lg shadow-sky-500/30 transition"
            >
              {loading ? "Generando SkillSynth..." : "Generar SkillSynth"}
            </button>
            <p className="text-xs text-slate-500">
              La generación puede tardar unos segundos.
            </p>
          </div>
        </form>

        {/* Resultado */}
        {result && (
          <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 md:p-6">
            <h2 className="text-xl font-semibold mb-2">
              Tu nueva SkillSynth: {result.skill_name}
            </h2>
            <p className="text-slate-300 text-sm mb-3">
              {result.description_short}
            </p>

            <div className="grid gap-4 md:grid-cols-2 text-sm">
              <div className="space-y-2">
                <h3 className="font-semibold text-slate-100">
                  ¿Por qué es valiosa?
                </h3>
                <p className="text-slate-300">{result.why_valuable}</p>

                <h3 className="font-semibold text-slate-100 mt-3">
                  Nichos posibles
                </h3>
                <ul className="list-disc list-inside text-slate-300">
                  {result.niches?.map((n, i) => (
                    <li key={i}>{n}</li>
                  ))}
                </ul>

                <h3 className="font-semibold text-slate-100 mt-3">
                  Rango de ingresos
                </h3>
                <p className="text-slate-300">
                  Latam: {result.salary_range?.latam_usd} USD / mes
                  <br />
                  USA: {result.salary_range?.usa_usd} USD / mes
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-slate-100">Tareas típicas</h3>
                <ul className="list-disc list-inside text-slate-300">
                  {result.tasks?.map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>

                <h3 className="font-semibold text-slate-100 mt-3">
                  Herramientas sugeridas
                </h3>
                <ul className="list-disc list-inside text-slate-300">
                  {result.tools_needed?.map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-5">
              <h3 className="font-semibold text-slate-100 mb-2">
                Plan de 30 días
              </h3>
              <div className="grid gap-3 md:grid-cols-2">
                {result.day_30_plan?.map((week, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 text-xs text-slate-300"
                  >
                    <p className="font-semibold mb-1">
                      Semana {week.week}: {week.focus}
                    </p>
                    <ul className="list-disc list-inside">
                      {week.tasks?.map((t, j) => (
                        <li key={j}>{t}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {result.brand_names && (
              <div className="mt-5">
                <h3 className="font-semibold text-slate-100 mb-1">
                  Ideas de nombre de marca
                </h3>
                <div className="flex flex-wrap gap-2 text-xs">
                  {result.brand_names.map((name, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full bg-slate-800 text-slate-200"
                    >
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}
      </section>
    </main>
  );
}
