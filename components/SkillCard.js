export default function SkillCard({ data }) {
  if (!data) return null;

  const {
    skill_name,
    description_short,
    why_valuable,
    niches,
    salary_range,
    tasks,
    tools_needed,
    day_30_plan,
    brand_names
  } = data;

  return (
    <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/50 p-6 md:p-8 shadow-xl shadow-slate-950/60">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            {skill_name}
          </h2>
          <p className="text-slate-300 mt-2">{description_short}</p>
        </div>
        {brand_names && brand_names.length > 0 && (
          <div className="text-sm text-slate-400">
            <p className="uppercase tracking-widest text-xs text-slate-500 mb-1">
              Nombres de marca sugeridos
            </p>
            <ul className="space-y-1">
              {brand_names.map((name, idx) => (
                <li key={idx} className="italic">
                  • {name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-6 text-sm">
        <div>
          <h3 className="font-semibold text-slate-200 mb-2">¿Por qué es valiosa?</h3>
          <p className="text-slate-400 whitespace-pre-line">{why_valuable}</p>
        </div>

        <div>
          <h3 className="font-semibold text-slate-200 mb-2">Nichos donde encaja</h3>
          <ul className="text-slate-400 space-y-1">
            {niches?.map((niche, idx) => (
              <li key={idx}>• {niche}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-slate-200 mb-2">Rango de ingresos</h3>
          <p className="text-slate-400">
            <span className="font-semibold">LATAM:</span>{" "}
            {salary_range?.latam_usd || "A estimar"} /mes (USD)
          </p>
          <p className="text-slate-400">
            <span className="font-semibold">USA/Global:</span>{" "}
            {salary_range?.usa_usd || "A estimar"} /mes (USD)
          </p>
        </div>
      </div>

      <div className="mt-6 grid md:grid-cols-2 gap-6 text-sm">
        <div>
          <h3 className="font-semibold text-slate-200 mb-2">Tareas que podrías hacer</h3>
          <ul className="text-slate-400 space-y-1">
            {tasks?.map((task, idx) => (
              <li key={idx}>• {task}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-slate-200 mb-2">Herramientas sugeridas</h3>
          <ul className="text-slate-400 space-y-1">
            {tools_needed?.map((tool, idx) => (
              <li key={idx}>• {tool}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="font-semibold text-slate-200 mb-3">
          Plan de 30 días
        </h3>
        <div className="grid md:grid-cols-4 gap-4 text-xs md:text-sm">
          {day_30_plan?.map((week, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3"
            >
              <p className="text-sky-400 font-semibold mb-1">
                Semana {week.week}
              </p>
              <p className="text-slate-300 mb-2">{week.focus}</p>
              <ul className="text-slate-400 space-y-1">
                {week.tasks?.map((t, tIdx) => (
                  <li key={tIdx}>• {t}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
