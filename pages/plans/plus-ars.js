// pages/plans/plus-ars.js
import PlanLayout from "../../components/PlanLayout";

export default function PlusArsPlanPage() {
  return (
    <PlanLayout
      tag="Más popular en Argentina"
      name="Plus ARS"
      price="ARS 6.900"
      period="/ mes"
      description="Para creadores y profesionales en Argentina que usan SkillSynth varias veces por semana."
      features={[
        "Hasta 150 tarjetas de habilidades al mes",
        "Proyectos ilimitados",
        "Sin marca de agua",
        "Procesamiento prioritario",
        "Actualización mensual según inflación",
        "Soporte preferencial por email",
      ]}
      ctaLabel="Comprar en PESOS"
      // 👇 Reemplazá por el link real de tu preferencia (MercadoPago Checkout, por ejemplo)
      ctaHref="https://tu-link-de-mercadopago.com"
      ctaNote="Pago con MercadoPago. Monto en pesos argentinos."
    />
  );
}
