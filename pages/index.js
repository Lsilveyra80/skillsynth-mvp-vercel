// pages/index.js
import Link from "next/link";
import PricingSection from "../components/PricingSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 px-4">
      {/* HERO */}
      <section className="max-w-4xl mx-auto pt-16 pb-12">
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            SkillSynth
          </h1>

          <p className="text-slate-300 text-lg">
            Descubrí una{" "}
            <span className="font-semibold">nueva habilidad profesional</span>{" "}
            creada por IA a partir de lo que ya sabés hacer.
          </p>

          <p className="text-slate-400 text-sm md:text-base">
            Combinamos tus habilidades, intereses y objetivos en una{" "}
            <span className="italic">SkillSynth Card</span> con descripción,
            nichos, potencial de ingresos y un plan de acción para los primeros
            30 días.
          </p>

          <div className="pt-4">
            <Link
              href="#planes"
              className="inline-flex items-center px-6 py-3 rounded-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold shadow-lg shadow-sky-500/30 transition text-sm md:text-base"
            >
              Ver planes y crear mi cuenta
            </Link>
          </div>
        </div>
      </section>

      {/* PLANES */}
      <PricingSection />
    </main>
  );
}
