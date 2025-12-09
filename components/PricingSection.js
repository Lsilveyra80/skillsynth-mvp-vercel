// components/PricingSection.js
import Link from "next/link";

const plans = [
  {
    id: "starter",
    name: "Starter",
    price: "Gratis",
    priceDetail: "Hasta 5 SkillSynth al mes",
    badge: "Ideal para empezar",
    description:
      "Probá SkillSynth sin costo. Pensado para validar la herramienta y generar tus primeras tarjetas.",
    features: [
      "Hasta 5 SkillSynth Cards por mes",
      "1 proyecto activo (se guarda solo el último)",
      "Acceso al generador IA básico",
      "Exportar tu tarjeta en texto para copiar/pegar",
    ],
    primaryCta: "Crear cuenta gratis",
    primaryHref: "/auth?plan=starter",
    secondaryCta: null,
    secondaryHref: null,
  },
  {
    id: "plus",
    name: "Plus",
    price: "$10.752 / mes",
    priceDetail: "Antes $26.880 (−60%)",
    badge: "Recomendado",
    description:
      "Para quienes quieren tomar acción en serio: más tarjetas, más proyectos y soporte prioritario.",
    features: [
      "Hasta 50 SkillSynth Cards por mes",
      "Historial de proyectos guardados",
      "Prioridad en mejoras y nuevas funciones",
      "Soporte por email",
    ],
    primaryCta: "Crear cuenta y continuar",
    primaryHref: "/auth?plan=plus",
    secondaryCta: "Comprar en pesos",
    secondaryHref:
      "https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=1230df0521c548d2bca0729d6f293df8",
  },
  {
    id: "pro",
    name: "Pro",
    price: "$5.796 / mes",
    priceDetail: "Antes $9.660 (−40%)",
    badge: "Para creadores intensivos",
    description:
      "Si generás muchas ideas, contenidos o servicios y querés explotar SkillSynth al máximo.",
    features: [
      "SkillSynth Cards ilimitadas",
      "Proyectos ilimitados",
      "Acceso anticipado a nuevas features",
      "Soporte prioritario 1 a 1",
    ],
    primaryCta: "Crear cuenta y continuar",
    primaryHref: "/auth?plan=pro",
    secondaryCta: "Comprar en pesos",
    secondaryHref:
      "https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=08a30c0db23f4e6587e70cf1e4cf6848",
  },
];

export default function PricingSection() {
  return (
    <section
      id="planes"
      className="max-w-5xl mx-auto py-16 md:py-20 text-slate-50"
    >
      {/* Encabezado */}
      <div className="text-center mb-10 space-y-3">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          Elegí tu plan SkillSynth
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base">
          Empezás en minutos. Podés probar con el plan Starter y cuando quieras
          pasar a Plus o Pro para más volumen y funciones avanzadas.
        </p>
      </div>

      {/* Cards centradas */}
      <div className="flex justify-center">
        <div className="grid gap-6 md:grid-cols-3 max-w-4xl w-full">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative flex flex-col rounded-3xl border bg-slate-900/60 border-slate-800 p-6 md:p-7 shadow-xl shadow-slate-950/40 ${
                plan.id === "plus"
                  ? "ring-2 ring-sky-500/80 scale-[1.02]"
                  : ""
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-sky-500 text-slate-950 text-xs font-semibold px-3 py-1 shadow-md">
                  {plan.badge}
                </span>
              )}

              {/* Nombre y precio */}
              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <p className="text-2xl font-bold">{plan.price}</p>
                {plan.priceDetail && (
                  <p className="text-xs text-slate-400 mt-1">
                    {plan.priceDetail}
                  </p>
                )}
              </div>

              <p className="text-sm text-slate-300 mb-4">
                {plan.description}
              </p>

              {/* Features */}
              <ul className="space-y-2 text-sm text-slate-200 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-2">
                    <span className="mt-[2px] inline-block h-1.5 w-1.5 rounded-full bg-sky-400" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Botones */}
              <div className="mt-6 space-y-2">
                {/* Principal → va a /auth con el plan elegido */}
                <Link
                  href={plan.primaryHref}
                  className="block w-full text-center rounded-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold py-2.5 text-sm transition"
                >
                  {plan.primaryCta}
                </Link>

                {/* Secundario → MercadoPago (solo Plus / Pro) */}
                {plan.secondaryHref && plan.secondaryCta && (
                  <a
                    href={plan.secondaryHref}
                    target="_blank"
                    rel="noreferrer"
                    className="block w-full text-center rounded-full border border-slate-700 text-slate-300 hover:border-sky-500 hover:text-sky-300 py-2 text-xs transition"
                  >
                    {plan.secondaryCta}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pie aclaratorio */}
      <p className="mt-6 text-center text-[11px] text-slate-500 max-w-2xl mx-auto">
        Todos los planes pueden actualizarse o cancelarse cuando quieras. Los
        precios son estimados en ARS y pueden variar según impuestos y cargos de
        la plataforma de pago.
      </p>
    </section>
  );
}
