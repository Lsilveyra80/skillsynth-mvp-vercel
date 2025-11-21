// components/PricingSection.js
import Link from "next/link";

export default function PricingSection() {
  return (
    <section className="max-w-6xl mx-auto py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
        Planes de SkillSynth
      </h2>

      <p className="text-center text-slate-400 max-w-2xl mx-auto mb-12 text-sm">
        Elegí el plan que mejor se adapta a tu objetivo. Todos comienzan a
        generar nuevas habilidades potenciadas por IA desde el primer minuto.
      </p>

      {/* Grid de 3 columnas */}
      <div className="grid gap-6 md:grid-cols-3 px-4">
        {/* PLAN STARTER */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 flex flex-col">
          <h3 className="text-xl font-semibold mb-2 text-slate-100">Starter</h3>
          <p className="text-slate-400 text-sm mb-6">
            Para quienes quieren probar SkillSynth. Ideal para comenzar.
          </p>

          <p className="text-4xl font-bold text-slate-100 mb-1">$0</p>
          <p className="text-slate-500 mb-6 text-sm">Gratis por siempre</p>

          <ul className="text-sm text-slate-300 space-y-2 mb-8">
            <li>• Hasta 5 tarjetas por mes</li>
            <li>• 1 proyecto activo</li>
            <li>• Exportación básica</li>
            <li>• Generación estándar</li>
          </ul>

          <Link
            href="/create"
            className="mt-auto inline-flex justify-center px-5 py-2.5 rounded-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold shadow-lg shadow-sky-500/30 transition"
          >
            Probar gratis
          </Link>
        </div>

        {/* PLAN PLUS */}
        <div className="rounded-3xl border border-emerald-500 bg-slate-900 p-6 shadow-lg shadow-emerald-500/10 flex flex-col relative">
          <div className="absolute -top-3 right-4 bg-emerald-500 text-slate-900 text-xs font-bold px-3 py-1 rounded-full shadow">
            Más popular
          </div>

          <h3 className="text-xl font-semibold mb-2 text-slate-100">Plus</h3>
          <p className="text-slate-400 text-sm mb-4">
            Para creadores, freelancers y quienes quieren generar mejor.
          </p>

          {/* Precio anterior tachado + precio actual + badge de descuento */}
          <p className="text-slate-500 text-sm line-through mb-1">
            Antes: ARS 17.250 / mes
          </p>
          <div className="flex items-baseline gap-2 mb-1">
            <p className="text-4xl font-bold text-slate-100">$6.900</p>
            <span className="text-xs font-semibold text-emerald-400 bg-emerald-900/40 px-2 py-0.5 rounded-full">
              -60%
            </span>
          </div>
          <p className="text-slate-500 mb-2 text-sm">ARS / mes</p>
          <p className="text-emerald-400 text-xs mb-4">
            Precio especial de lanzamiento. Luego vuelve a su valor original.
          </p>

          <ul className="text-sm text-slate-300 space-y-2 mb-8">
            <li>• Hasta 50 tarjetas por mes</li>
            <li>• Proyectos ilimitados</li>
            <li>• Sin marca de agua</li>
            <li>• Exportación limpia</li>
            <li>• Prioridad en la generación</li>
          </ul>

          <Link
            href="/create"
            className="mt-auto inline-flex justify-center px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold shadow-lg shadow-emerald-500/30 transition"
          >
            Elegir Plan Plus
          </Link>
        </div>

        {/* PLAN PRO */}
        <div className="rounded-3xl border border-violet-500 bg-slate-900/40 p-6 flex flex-col">
          <h3 className="text-xl font-semibold mb-2 text-slate-100">Pro</h3>
          <p className="text-slate-400 text-sm mb-4">
            Para uso profesional diario, coaches, RRHH y creadores avanzados.
          </p>

          {/* Precio anterior tachado + precio actual + badge de descuento */}
          <p className="text-slate-500 text-sm line-through mb-1">
            Antes: ARS 28.000 / mes
          </p>
          <div className="flex items-baseline gap-2 mb-1">
            <p className="text-4xl font-bold text-slate-100">$16.800</p>
            <span className="text-xs font-semibold text-violet-300 bg-violet-900/40 px-2 py-0.5 rounded-full">
              -40%
            </span>
          </div>
          <p className="text-slate-500 mb-2 text-sm">ARS / mes</p>
          <p className="text-violet-300 text-xs mb-4">
            Descuento de lanzamiento para quienes dan el salto profesional.
          </p>

          <ul className="text-sm text-slate-300 space-y-2 mb-8">
            <li>• Tarjetas ilimitadas</li>
            <li>• Proyectos ilimitados</li>
            <li>• Uso comercial completo</li>
            <li>• Generación rápida</li>
            <li>• Acceso anticipado a nuevas funciones</li>
            <li>• Exportación HD</li>
          </ul>

          <Link
            href="/create"
            className="mt-auto inline-flex justify-center px-5 py-2.5 rounded-full bg-violet-500 hover:bg-violet-400 text-slate-950 font-semibold shadow-lg shadow-violet-500/30 transition"
          >
            Elegir Plan Pro
          </Link>
        </div>
      </div>

      <p className="text-center text-xs text-slate-600 mt-10">
        Todos los planes pueden cancelarse en cualquier momento.
      </p>
    </section>
  );
}
