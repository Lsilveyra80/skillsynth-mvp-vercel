// pages/api/compose.js
import { supabaseServer } from "../../lib/supabaseServer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { userId, projectId, title, goal } = req.body;

    if (!userId || !projectId || !title || !goal) {
      return res.status(400).json({ error: "Faltan campos requeridos" });
    }

    // 1) Asegurar fila en user_plans (todos entran como Starter por defecto)
    const { data: planRow, error: planErr } = await supabaseServer
      .from("user_plans")
      .upsert(
        {
          user_id: userId,
          plan: "starter",
          limit_used: 0,
        },
        { onConflict: "user_id" }
      )
      .select()
      .single();

    if (planErr) {
      console.error("Error en user_plans:", planErr);
      return res.status(500).json({
        error: "No se pudo consultar el plan del usuario",
        detail: planErr.message || planErr.details || null,
      });
    }

    const plan = planRow.plan || "starter";
    const used = planRow.limit_used ?? 0;

    // 2) Límite del plan Starter
    if (plan === "starter" && used >= 5) {
      return res.status(403).json({
        error: "Límite mensual alcanzado. Necesitás el Plan Plus o Pro.",
      });
    }

    // 3) "Llamada" a IA simulada
    const generatedCard = {
      title: "Habilidad generada: " + title,
      content: {
        resumen: "Esta habilidad sirve para " + goal,
        pasos: [
          "Definir objetivo",
          "Practicar a diario",
          "Aplicarlo a un proyecto",
        ],
      },
    };

    // 4) Guardar card en Supabase (tabla skill_cards)
    const { data
