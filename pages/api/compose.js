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

    // 1) Obtener plan del usuario
    const { data: planRow, error: planErr } = await supabaseServer
      .from("user_plans")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();

    if (planErr) {
      console.error(planErr);
      return res
        .status(500)
        .json({ error: "No se pudo consultar el plan del usuario" });
    }

    // 2) Lógica de límites
    const plan = planRow?.plan || "starter"; // default Starter
    const used = planRow?.limit_used || 0;

    if (plan === "starter" && used >= 5) {
      return res.status(403).json({
        error: "Límite mensual alcanzado. Necesitás el Plan Plus o Pro.",
      });
    }

    // 3) Llamar a OpenAI (acá está SIMULADO)
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
    const { data: insertCard, error: cardErr } = await supabaseServer
      .from("skill_cards")
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
    if (plan === "starter") {
      await supabaseServer
        .from("user_plans")
        .upsert(
          {
            user_id: userId,
            plan,
            limit_used: used + 1,
          },
          { onConflict: "user_id" }
        );
    }

    return res.status(200).json({
      message: "Card generada y guardada",
      card: insertCard,
    });
  } catch (err) {
    console.error("ERROR /compose:", err);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}
