// pages/api/compose.js
import { supabaseServer } from "../../lib/supabaseServer";
import { supabase } from "../../lib/supabaseClient"; // opcional si necesitás cliente público

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
    }

  try {
    const { userId, projectId, title, goal } = req.body;

    if (!userId || !projectId || !title || !goal) {
      return res.status(400).json({ error: "Faltan campos requeridos" });
    }

    // 1) Obtener plan del usuario
    const { data: planRow, error: planErr } = await supabaseServer
      .from("user_plans")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (planErr) {
      return res.status(500).json({ error: "No se pudo consultar el plan del usuario" });
    }

    // 2) Lógica de límites
    let plan = planRow?.plan || "starter"; // default si no existe

    if (plan === "starter") {
      if (planRow.limit_used >= 5) {
        return res.status(403).json({
          error: "Límite mensual alcanzado. Necesitás el Plan Plus o Pro.",
        });
      }
    }

    // 3) Llamar a OpenAI (simulado)
    const generatedCard = {
      title: "Habilidad generada: " + title,
      content: {
        resumen: "Esta habilidad sirve para " + goal,
        pasos: [
          "Definir objetivo",
          "Practicar a diario",
          "Aplicarlo a un proyecto"
        ]
      }
    };

    // 4) Guardar card en Supabase
    const { data: insertCard, error: cardErr } = await supabaseServer
      .from("cards")
      .insert({
        project_id: projectId,
        user_id: userId,
        title: generatedCard.title,
        content: generatedCard.content,
      })
      .select()
      .single();

    if (cardErr) {
      console.error(cardErr);
      return res.status(500).json({ error: "No se pudo guardar la tarjeta" });
    }

    // 5) Actualizar consumo del plan
    await supabaseServer
      .from("user_plans")
      .update({
        limit_used: (planRow.limit_used || 0) + 1,
      })
      .eq("user_id", userId);

    return res.status(200).json({
      message: "Card generada y guardada",
      card: insertCard,
    });

  } catch (err) {
    console.error("ERROR /compose:", err);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}
