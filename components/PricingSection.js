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
      href: "#", // acá puedes poner un link a tu registro gratuito
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
      href: "https://tu-link-de-mercadopago.com", // 👉 reemplaza por tu link real
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
      href: "https://tu-link-de-stripe-pro.com", // 👉 reemplaza por tu link real
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
      href: "mailto:ventas@tudominio.com", // 👉 o un formulario de contacto
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
      href: "https://tu-link-de-mercadopago.com", // same as ES
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
      href: "https://tu-link-de-stripe-pro.com",
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
      href: "mailto:sales@yourdomain.com",
      type: "usd",
    },
  ],
};

export default function PricingSection() {
  const [lang, setLang] = useState("es");
  const currentPlans = plans[lang];

  return (
    <section className="bg-slate-950 text-slate-50 py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-12
