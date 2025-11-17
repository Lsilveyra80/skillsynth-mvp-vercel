// components/PricingSection.js
import { useState } from "react";

const plans = {
  es: [
    {
      name: "Starter",
      tag: "Gratis",
      price: "$0",
      period: "para siempre",
      highlight: false,
      description: "Para probar SkillSynth sin compromiso.",
      features: [
        "Hasta 15 tarjetas de habilidades al mes",
        "1 proyecto activo",
        "Exportación básica",
        "Funcionalidades esenciales",
        "Soporte por email estándar",
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
        "Hasta 150 tarjetas de habilidades al mes",
        "Proyectos ilimitados",
        "Sin marca de agua",
        "Procesamiento prioritario",
        "Actualización mensual según inflación",
        "Soporte preferencial por email",
      ],
      cta: "Comprar en PESOS",
      ctaNote: "Pago con MercadoPago",
      href: "https://tu-link-de-mercadopago.com", // 👉 reemplazar
      type: "ars",
    },
    {
      name: "Pro USD",
      tag: "Ideal para creadores globales",
      price: "US$ 12",
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
      cta: "Comprar en USD",
      ctaNote: "Stripe o PayPal",
      href: "https://tu-link-de-stripe-pro.com", // 👉 reemplazar
      type: "usd",
    },
    {
      name: "Agency / Ultimate",
      tag: "Para equipos y agencias",
      price: "US$ 29",
      period: "/ mes",
      highlight: false,
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
      href: "mailto:ventas@tudominio.com", // 👉 reemplazar
      type: "usd",
    },
  ],
  en: [
    {
      name: "Starter",
      tag: "Free",
      price: "$0",
      period: "forever",
      highlight: false,
      description: "Perfect to try SkillSynth with no risk.",
      features: [
        "Up to 15 skill cards per month",
        "1 active project",
        "Basic export",
        "Core features included",
        "Standard email support",
      ],
      cta: "Start for free",
      ctaNote: "No credit card required",
      href: "#",
      type: "free",
    },
    {
      name: "Plus ARS",
      tag: "Most popular in Argentina",
      price: "ARS 6,900",
      period: "/ month",
      highlight: true,
      description: "For creators and professionals in Argentina.",
      features: [
        "Up to 150 skill cards per month",
        "Unlimited projects",
        "No watermark",
        "Priority processing",
        "Monthly price update vs inflation",
        "Priority email support",
      ],
      cta: "Pay in PESOS",
      ctaNote: "Pay with MercadoPago",
      href: "https://tu-link-de-mercadopago.com", // 👉 reemplazar
      type: "ars",
    },
    {
      name: "Pro USD",
      tag: "Best for power users",
      price: "US$ 12",
      period: "/ month",
      highlight: false,
      description: "For people who use SkillSynth every day.",
      features: [
        "Unlimited skill cards",
        "Unlimited projects",
        "High-quality export",
        "Fast processing",
        "Commercial use included",
        "Early access to new features",
      ],
      cta: "Pay in USD",
      ctaNote: "Stripe or PayPal",
      href: "https://tu-link-de-stripe-pro.com", // 👉 reemplazar
      type: "usd",
    },
    {
      name: "Agency / Ultimate",
      tag: "For teams & agencies",
      price: "US$ 29",
      period: "/ month",
      highlight: false,
      description: "For studios, agencies and growing businesses.",
      features: [
        "Everything in Pro",
        "3 included seats",
        "Shared folders & collaboration",
        "Advanced API & webhooks",
        "Near white-label branding",
        "Priority 24/7 support",
      ],
      cta: "Talk to sales",
      ctaNote: "Contact us for details",
      href: "mailto:sales@yourdomain.com", // 👉 reemplazar
      type: "usd",
    },
  ],
};

export default function PricingSection({ langProp, onLangChange }) {
  const [internalLang, setInternalLang] = useState("es");

  const lang = langProp || internalLang;
  const setLang = onLangChange || setInternalLang;

  const currentPlans = plans[lang];

  return (
    <section className="bg-slate-950 text-slate-50 py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-12">
          <span className="inline-flex items-center rounded-full border border-slate-700 px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-300">
            Pricing · Planes
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            {lang === "es"
              ? "Elige el plan que crezca con tus habilidades"
              : "Choose the plan that grows with your skills"}
          </h2>
          <p className="max-w-2xl text-slate-400">
            {lang === "es"
              ? "Pagá en pesos argentinos con MercadoPago o en dólares para clientes internacionales. Empezá gratis y actualizá cuando lo necesites."
              : "Pay in Argentine pesos with MercadoPago or in US dollars for international customers. Start for free and upgrade anytime."}
          </p>

          {/* Language toggle */}
          <div className="mt-4 inline-flex items-center rounded-full bg-slate-900/60 p-1">
            <button
              onClick={() => setLang("es")}
              className={`px-4 py-1 text-sm rounded-full transition ${
                lang === "es"
                  ? "bg-slate-100 text-slate-900 font-medium"
                  : "text-slate-300"
              }`}
            >
              Español
            </button>
            <button
              onClick={() => setLang("en")}
              className={`px-4 py-1 text-sm rounded-full transition ${
                lang === "en"
                  ? "bg-slate-100 text-slate-900 font-medium"
                  : "text-slate-300"
              }`}
            >
              English
            </button>
          </div>
        </div>

        {/* Pricing cards */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {currentPlans.map((plan) => (
            <div
              key={plan.name + lang}
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
              <p className="text-sm text-slate-400 mb-4">
                {plan.description}
              </p>

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

        {/* aclaración legal */}
        <p className="mt-8 text-center text-xs text-slate-500 max-w-2xl mx-auto">
          {lang === "es"
            ? "Los precios en pesos argentinos se actualizan de forma periódica según la inflación y pueden cambiar sin previo aviso. Los precios en dólares están pensados para clientes fuera de Argentina."
            : "Prices in Argentine pesos are periodically adjusted based on inflation and may change without notice. USD prices are intended for customers outside Argentina."}
        </p>
      </div>
    </section>
  );
}
