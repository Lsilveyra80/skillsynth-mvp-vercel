// pages/create.js
import { useState } from "react";
import Link from "next/link";

export default function CreatePage() {
  const [habilidades, setHabilidades] = useState("");
  const [objetivo, setObjetivo] = useState("");
  const [industria, setIndustria] = useState("");
  const [tiempo, setTiempo] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [result, setResult] = useState(null);
  const [showUpgrade, setShowUpgrade] = useState(false);

  const MP_PLUS_URL =
    "https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=1230df0521c548d2bca0729d6f293df8";
  const MP_PRO_URL =
    "https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=08a30c0db23f4e6587e70cf1e4cf6848";

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg("");
    setResult(null);
    setShowUpgrade(false);

    if (!habilidades || !objetivo || !industria || !tiempo) {
      setErrorMsg("Por favor completá todos los campos.");
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
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          setShowUpgrade(true);
        }
        setErrorMsg(
          data?.error ||
            "Ocurrió un error al generar tu SkillSynth. Intentá nuevamente."
        );
        return;
      }

      setResult(data);
    } catch (err) {
      console.error(err);
      setErrorMsg("Error de conexión. Intentá nuevamente en unos minutos.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 px-4">
      {/* HEADER */}
      <header className="max-w-4xl mx-auto pt-6 flex items-center justify-between">
        <Link href="/" className="text-sm text-slate-400 hover:text-slate-200">
          ← Volver al inicio
        </Link>
      </header>

      <section className="max-w-4xl mx-auto pt-4 pb-16">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
          Crear mi SkillSynth
        </h1>

        {/* Bloque de planes: Starter actual + Plus/Pro pagos con descuentos */}
        <div className="mb-6 grid gap-4 md:grid-cols-3">
          {/* Starter */}
          <div className="rounded-2xl border border-sky-500 bg-slate-900/70 p-4 text-sm">
            <p className="text-xs uppercase tracking-wide text-sky-400 mb-1">
              Tu plan actual
            </p>
            <h2 className="font-semibold text-slate-50 mb-1">Starter</h2>
            <p className="text-slate-300 text-xs mb-3">
              Gratis. Hasta 5 SkillSynth por mes para probar la herramienta.
            </p>
            <p className="text-xs text-slate-400">
              Este es el plan que estás usando ahora para generar tus tarjetas.
            </p>
          </div>

          {/* Plus */}
          <div className="rounded-2xl border border-emerald-500 bg-slate-900/60 p-4 text-sm">
            <p className="text-xs uppercase tracking-wide text-emerald-400 mb-1">
              Plan pago
            </p>
            <h2 className="font-semibold text-slate-50 mb-1">Plus</h2>

            <p className="text-slate-500 text-[11px] line-through mb-1">
              Antes: ARS 17.250 / mes
            </p>
            <p className="text-slate-200 text-xs mb-1">
              Ahora: <span className="font-semibold">ARS 6.900 / mes</span>
            </p>
            <p className="text-emerald-400 text-[11px] mb-2">
              60% OFF por lanzamiento. Hasta 50 SkillSynth al mes, proyectos
              ilimitados y sin marca de agua.
            </p>

            <a
              href={MP_PLUS_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex mt-2 px-4 py-1.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-900 text-xs font-semibold shadow-md shadow-emerald-500/30 transition"
            >
              Pasar al Plan Plus
            </a>
          </div>

          {/* Pro */}
          <div className="rounded-2xl border border-violet-500 bg-slate-900/60 p-4 text-sm">
            <p className="text-xs uppercase tracking-wide text-violet-400 mb-1">
              Plan pago
            </p>
            <h2 className="font-semibold text-slate-50 mb-1">Pro</h2>

            <p className="text-slate-500 text-[11px] line-through mb-1">
              Antes: ARS 28.000 / mes
            </p>
            <p className="text-slate-200 text-xs mb-1">
              Ahora:{" "}
              <span className="font-semibold">ARS 16.800 / mes</span>
            </p>
            <p className="text-violet-300 text-[11px] mb-2">
              40% OFF de lanzamiento. SkillSynth ilimitadas, uso comercial y
              prioridad máxima.
            </p>

            <a
              href={MP_PRO_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex mt-2 px-4 py-1.5 rounded-full bg-violet-500 hover:bg-violet-400 text-slate-950 text-xs font-semibold shadow-md shadow-violet-500/30 transition"
            >
              Pasar al Plan Pro
            </a>
          </div>
        </div>

        <p className="text-slate-400 mb-6 text-sm">
          Con el plan <span className="font-semibold">Starter</span> podés
          generar hasta <span className="font-semibold">5 tarjetas</span> para
          probar SkillSynth. Si te gusta el resultado, podés pasar al Plan Plus
          o Pro cuando quieras y aprovechar los descuentos de lanzamiento.
        </p>

        {/* FORMULARIO */}
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
              placeholder="Ej: análisis de datos, logística, creatividad, programación, trato con clientes..."
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
              placeholder="Ej: generar ingresos extras, trabajar remoto, cambiar de carrera..."
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

        {/* UPGRADE BLOQUE AL LLEGAR AL LÍMITE */}
        {showUpgrade && (
          <section className="mt-6 rounded-2xl border border-amber-500 bg-amber-950/40 p-4 md:p-6">
            <h2 className="text-lg font-semibold text-amber-100 mb-2">
              Llegaste al límite del plan Starter
            </h2>
            <p className="text-amber-100 text-sm mb-4">
              Ya usaste tus 5 SkillSynth de prueba este mes. Si querés seguir
              creando tarjetas de habilidades, elegí uno de estos planes con
              descuento de lanzamiento:
            </p>

            <div className="grid gap-4 md:grid-cols-2 text-sm">
              <div className="rounded-xl border border-emerald-400 bg-emerald-950/40 p-4">
                <h3 className="font-semibold text-emerald-100 mb-1">Plus</h3>
                <p className="text-emerald-200 text-[11px] line-through mb-1">
                  Antes: ARS 17.250 / mes
                </p>
                <p className="text-emerald-50 text-xs mb-1">
                  Ahora:{" "}
                  <span className="font-semibold">ARS 6.900 / mes</span>
                </p>
                <p className="text-emerald-200 text-[11px] mb-3">
                  60% OFF • Hasta 50 SkillSynth al mes, proyectos ilimitados y
                  sin marca de agua.
                </p>
                <a
                  href={MP_PLUS_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex px-4 py-1.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-900 text-xs font-semibold shadow-md shadow-emerald-500/30 transition"
                >
                  Pasar al Plan Plus
                </a>
              </div>

              <div className="rounded-xl border border-violet-400 bg-violet-950/40 p-4">
                <h3 className="font-semibold text-violet-100 mb-1">Pro</h3>
                <p className="text-violet-200 text-[11px] line-through mb-1">
                  Antes: ARS 28.000 / mes
                </p>
                <p className="text-violet-50 text-xs mb-1">
                  Ahora:{" "}
                  <span className="font-semibold">ARS 16.800 / mes</span>
                </p>
                <p className="text-violet-200 text-[11px] mb-3">
                  40% OFF • SkillSynth ilimitadas, uso comercial y prioridad
                  máxima.
                </p>
                <a
                  href={MP_PRO_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex px-4 py-1.5 rounded-full bg-violet-500 hover:bg-violet-400 text-slate-950 text-xs font-semibold shadow-md shadow-violet-500/30 transition"
                >
                  Pasar al Plan Pro
                </a>
              </div>
            </div>
          </section>
        )}

        {/* RESULTADO */}
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
