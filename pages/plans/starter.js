// pages/plans/starter.js
import PlanLayout from "../../components/PlanLayout";

export default function StarterPlanPage() {
  return (
    <PlanLayout
      tag="Gratis"
      name="Starter"
      price="$0"
      period="para siempre"
      description="Para probar SkillSynth sin compromiso y entender cómo funciona la herramienta."
      features={[
        "Hasta 15 tarjetas de habilidades al mes",
        "1 proyecto activo",
        "Exportación básica",
        "Funcionalidades esenciales",
        "Soporte por email estándar",
      ]}
      // Para el plan gratis, los mando directo a crear la SkillSynth
      ctaLabel="Empezar gratis"
      ctaHref="/create"
      ctaNote="No requiere tarjeta"
    />
  );
}
