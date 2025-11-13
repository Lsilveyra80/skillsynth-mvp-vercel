import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-2xl text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          SkillSynth
        </h1>
        <p className="text-slate-300 text-lg">
          Descubrí una <span className="font-semibold">nueva habilidad profesional</span>
          {" "}creada por IA a partir de lo que ya sabés hacer.
        </p>
        <p className="text-slate-400 text-sm md:text-base">
          Combinamos tus habilidades, intereses y objetivos en una{" "}
          <span className="italic">SkillSynth Card</span> con descripción, nichos,
          potencial de ingresos y plan de 30 días.
        </p>

        <div className="pt-4">
          <Link
            href="/create"
            className="inline-flex items-center px-6 py-3 rounded-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold shadow-lg shadow-sky-500/30 transition"
          >
            Crear mi SkillSynth
          </Link>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3 text-left text-sm text-slate-300">
          <div className="rounded-2xl border border-slate-800 p-4 bg-slate-900/40">
            <p className="font-semibold mb-1">Hibridación de habilidades</p>
            <p className="text-slate-400">
              Mezclá lo que ya sabés con lo que querés lograr y obtené un perfil único.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800 p-4 bg-slate-900/40">
            <p className="font-semibold mb-1">Plan en 30 días</p>
            <p className="text-slate-400">
              Recibí un roadmap en semanas con foco, tareas y herramientas sugeridas.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800 p-4 bg-slate-900/40">
            <p className="font-semibold mb-1">Listo para monetizar</p>
            <p className="text-slate-400">
              Nichos, posibles rangos de ingresos y tipos de proyectos que podrías vender.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
