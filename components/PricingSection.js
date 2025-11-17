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
    href: "https://tu-link-de-mercadopago.com", // 👉 reemplazar


