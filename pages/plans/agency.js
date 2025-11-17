// pages/plans/agency.js
import PlanLayout from "../../components/PlanLayout";

export default function AgencyPlanPage() {
  return (
    <PlanLayout
      tag="Para equipos y agencias"
      name="Agency / Ultimate"
      price="US$ 29"
      period="/ mes"
      description="Para estudios, agencias y negocios que necesitan escalar uso, colaboración y API."
      features={[
        "Todo lo del plan Pro",
        "3 usuarios incluidos de base",
        "Carpetas compartidas y colaboración",
        "API y webhooks avanzados",
        "Branding casi white-label",
        "Soporte prioritario 24/7",
      ]}
      ctaLabel="Hablar con ventas"
      ctaHref="mailto:ventas@tudominio.com"
      ctaNote="Contáctanos para armar un plan a medida."
    />
  );
}
