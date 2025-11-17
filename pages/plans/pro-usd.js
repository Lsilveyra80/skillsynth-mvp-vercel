// pages/plans/pro-usd.js
import PlanLayout from "../../components/PlanLayout";

export default function ProUsdPlanPage() {
  return (
    <PlanLayout
      tag="Ideal para creadores globales"
      name="Pro USD"
      price="US$ 12"
      period="/ mes"
      description="Para quienes usan SkillSynth todos los días y necesitan más capacidad y velocidad."
      features={[
        "Tarjetas de habilidades ilimitadas",
        "Proyectos ilimitados",
        "Exportación en alta calidad",
        "Procesamiento rápido",
        "Uso comercial incluido",
        "Acceso anticipado a nuevas funciones",
      ]}
      ctaLabel="Comprar en USD"
      // 👇 Reemplazá por el enlace de Stripe/PayPal que configures
      ctaHref="https://tu-link-de-stripe-pro.com"
      ctaNote="Pago en dólares. Procesado por Stripe o PayPal."
    />
  );
}
