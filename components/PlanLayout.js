// components/PlanLayout.js
import Link from "next/link";

export default function PlanLayout({
  tag,
  name,
  price,
  period,
  description,
  features,
  ctaLabel,
  ctaHref,
  ctaNote,
}) {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 px-4 py-10">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb / volver */}
        <div className="mb-6 text-sm text-slate-400">
          <Link href="/" className="hover:text-slate-200">
            ← Volver al inicio
          </Link>
        </div>

        <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 md:p-8 shadow-xl shadow-slate-950/60">
          {tag && (
            <div className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-900 mb-4">
              {tag}
            </div>
          )}

          <h1 className="text-3xl font-bold tracking-tight mb-2">
            {name}
          </h1>
          <p className="text-slate-300 mb-4">{description}</p>

          <div className="flex items-baseline gap-2 mb-6">
            <span className="text-3xl font-semibold">{price}</span>
            {period && (
              <span className="text-sm text-slate-400">{period}</span>
            )}
          </div>

          <h2 className="text-sm font-semibold text-slate-200 mb-2">
            Qué incluye este plan
          </h2>
          <ul className="mb-6 space-y-2 text-sm text-slate-200">
            {features.map((feat) => (
              <li key={feat} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-400" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>

          <a
            href={ctaHref}
            target={ctaHref.startsWith("http") ? "_blank" : undefined}
            rel={ctaHref.startsWith("http") ? "noopener noreferrer" : undefined}
            className="inline-flex w-full items-center justify-center rounded-xl px-4 py-2.5 text-sm font-medium bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition"
          >
            {ctaLabel}
          </a>

          {ctaNote && (
            <p className="mt-2 text-xs text-slate-400 text-center">
              {ctaNote}
            </p>
          )}
        </section>

        <p className="mt-6 text-xs text-slate-500">
          Este plan está pensado como parte del MVP de SkillSynth. Más
          adelante podés ajustar precios, beneficios y el flujo de pago sin
          cambiar demasiado esta estructura.
        </p>
      </div>
    </main>
  );
}
