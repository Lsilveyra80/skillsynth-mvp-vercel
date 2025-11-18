// components/PricingSection.js

const plans = [
  {
    name: "Starter",
    tag: "Gratis",
    price: "$0",
    period: "para siempre",
    highlight: false,
    description: "Para probar SkillSynth sin compromiso.",
    features: [
      "Hasta 5 tarjetas de habilidades al mes",
      "1 proyecto activo",
      "Exportación estándar",
      "Funcionalidades esenciales"
    ],
    cta: "Empezar gratis",
    ctaNote: "No requiere tarjeta",
    href: "#",
    type: "free",
  },
  {
    name: "Plus ARS",
    tag: "Más popular en Argentina",
    price: "ARS 6.900",
    period: "/ mes",
    highlight: true,
    description: "Para creadores y profesionales en Argentina.",
    features: [
      "Hasta 50 tarjetas de habilidades al mes",
      "Proyectos ilimitados",
      "Sin marca de agua",
      "Procesamiento prioritario",
      "Soporte por email"
    ],
    cta: "Comprar en PESOS",
    ctaNote: "Pago con MercadoPago",
    href: "https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=1230df0521c548d2bca0729d6f293df8",
    type: "ars",
  },
  {
    name: "Pro ARS",
    tag: "Ideal para creadores avanzados",
    price: "ARS 16.800",
    period: "/ mes",
    highlight: false,
    description: "Para quienes usan SkillSynth todos los días.",
    features: [
      "Tarjetas de habilidades ilimitadas",
      "Proyectos ilimitados",
      "Exportación en alta calidad",
      "Procesamiento rápido",
      "Uso comercial incluido",
      "Acceso anticipado a nuevas funciones",
    ],
    cta: "Comprar en PESOS",
    ctaNote: "Pago con MercadoPago",
    href: "https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=08a30c0db23f4e6587e70cf1e4cf6848",
    type: "ars",
  },
  {
    name: "Agency / Ultimate",
    tag: "Para equipos y agencias",
    price: "ARS 40.600",
    period: "/ mes",
    highlight: false,
    hidden: true, // oculto
    description: "Para estudios, agencias y negocios que escalan.",
    features: [
      "Todo lo del plan Pro",
      "3 usuarios incluidos",
      "Carpetas compartidas y colaboración",
      "API y webhooks avanzados",
      "Branding casi white-label",
      "Soporte prioritario 24/7",
    ],
    cta: "Hablar con ventas",
    ctaNote: "Contactanos para más detalles",
    href: "mailto:ventas@tudominio.com",
    type: "ars",
  },
];

export default function PricingSection() {
  // se filtran los planes ocultos
  const currentPlans = plans.filter((p) => !p.hidden);

  return (
    <section className="bg-slate-950 text-slate-50 py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col items-center text-center gap-4 mb-12">
          <span className="inline-flex items-center rounded-full border border-slate-700 px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-300">
            Pricing · Planes
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            Elige el plan que crezca con tus habilidades
          </h2>
          <p className="max-w-2xl text-slate-400">
            Pagá en pesos argentinos con MercadoPago. Empezá gratis y actualizá
            cuando lo necesites.
          </p>
        </div>

        {/* Pricing cards centradas */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
          {currentPlans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border bg-slate-900/60 px-6 pb-6 pt-8 shadow-lg shadow-slate-950/40 ${
                plan.highlight
                  ? "border-cyan-400/80 ring-2 ring-cyan-400/40"
                  : "border-slate-800"
              }`}
            >
              {plan.tag && (
                <div className="absolute -top-3 left-4 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-900 shadow">
                  {plan.tag}
                </div>
              )}

              <h3 className="text-lg font-semibold mb-2">{plan.name}</h3>
              <p className="text-sm text-slate-400 mb-4">{plan.description}</p>

              <div className="mb-4 flex items-baseline gap-1">
                <span className="text-2xl font-semibold">{plan.price}</span>
                <span className="text-sm text-slate-400">{plan.period}</span>
              </div>

              <ul className="mb-6 flex-1 space-y-2 text-sm text-slate-200">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-400" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <a
                href={plan.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-auto inline-flex w-full items-center justify-center rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                  plan.highlight
                    ? "bg-cyan-400 text-slate-950 hover:bg-cyan-300"
                    : "bg-slate-100 text-slate-900 hover:bg-white"
                }`}
              >
                {plan.cta}
              </a>

              {plan.ctaNote && (
                <p className="mt-2 text-xs text-slate-400 text-center">
                  {plan.ctaNote}
                </p>
              )}
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-slate-500 max-w-2xl mx-auto">
          Los precios en pesos argentinos se actualizan de forma periódica según
          la inflación y pueden cambiar sin previo aviso.
        </p>
      </div>
    </section>
  );
}
