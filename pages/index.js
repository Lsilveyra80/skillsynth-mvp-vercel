// pages/index.js
import { useState } from "react";
import Link from "next/link";
import PricingSection from "../components/PricingSection";

export default function Home() {
  const [lang, setLang] = useState("es");

  const isEs = lang === "es";

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 px-4">
      {/* HERO */}
      <section className="max-w-4xl mx-auto pt-16 pb-12">
        {/* Toggle idioma arriba a la derecha */}
        <div className="flex justify-end mb-6">
          <div className="inline-flex items-center rounded-full bg-slate-900/80 p-1 text-xs">
            <button
              onClick={() => setLang("es")}
              className={`px-3 py-1 rounded-full ${
                isEs
                  ? "bg-slate-100 text-slate-900 font-medium"
                  : "text-slate-300"
              }`}
            >
              ES
            </button>
            <button
              onClick={() => setLang("en")}
              className={`px-3 py-1 rounded-full ${
                !isEs
                  ? "bg-slate-100 text-slate-900 font-medium"
                  : "text-slate-300"
              }`}
            >
              EN
            </button>
          </div>
        </div>

        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            SkillSynth
          </h1>

          {isEs ? (
            <>
              <p className="text-slate-300 text-lg">
                Descubrí una{" "}
                <span className="font-semibold">nueva habilidad profesional</span>{" "}
                creada por IA a partir de lo que ya sabés hacer.
              </p>
              <p className="text-slate-400 text-sm md:text-base">
                Combinamos tus habilidades, intereses y objetivos en una{" "}
                <span className="italic">SkillSynth Card</span> con descripción,
                nichos, potencial de ingresos y plan de 30 días.
              </p>
            </>
          ) : (
            <>
              <p className="text-slate-300 text-lg">
                Discover a{" "}
                <span className="font-semibold">new professional skill</span>{" "}
                created by AI from what you already know how to do.
              </p>
              <p className="text-slate-400 text-sm md:text-base">
                We combine your skills, interests and goals into a{" "}
                <span className="italic">SkillSynth Card</span> with description,
                niches, income potential and a 30-day action plan.
              </p>
            </>
          )}

          <div className="pt-4">
            <Link
              href="/create"
              className="inline-flex items-center px-6 py-3 rounded-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold shadow-lg shadow-sky-500/30 transition"
            >
              {isEs ? "Crear mi SkillSynth" : "Create my SkillSynth"}
            </Link>
          </div>

          {/* Features debajo del hero */}
          <div className="mt-10 grid gap-4 md:grid-cols-3 text-left text-sm text-slate-300">
            <div className="rounded-2xl border border-slate-800 p-4 bg-slate-900/40">
              <p className="font-semibold mb-1">
                {isEs ? "Hibridación de habilidades" : "Hybrid skills"}
              </p>
              <p className="text-slate-400">
                {isEs
                  ? "Mezclá lo que ya sabés con lo que querés lograr y obtené un perfil único."
                  : "Blend what you already know with what you want to achieve and get a unique profile."}
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 p-4 bg-slate-900/40">
              <p className="font-semibold mb-1">
                {isEs ? "Plan en 30 días" : "30-day roadmap"}
              </p>
              <p className="text-slate-400">
                {isEs
                  ? "Recibí un roadmap en semanas con foco, tareas y herramientas sugeridas."
                  : "Get a weekly roadmap with focus, tasks and suggested tools."}
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 p-4 bg-slate-900/40">
              <p className="font-semibold mb-1">
                {isEs ? "Listo para monetizar" : "Ready to monetize"}
              </p>
              <p className="text-slate-400">
                {isEs
                  ? "Nichos, rangos de ingresos posibles y tipos de proyectos que podrías vender."
                  : "Niches, possible income ranges and types of projects you could sell."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN DE PRECIOS */}
      <PricingSection langProp={lang} onLangChange={setLang} />
    </main>
