// pages/api/compose.js
import { supabaseServer } from "../../lib/supabaseServer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const {
      userId,
      projectId,
      currentSkills,
      goals,
      industries,
      timePerWeek,
    } = req.body;

    if (
      !userId ||
      !projectId ||
      !currentSkills ||
      !goals ||
      !industries ||
      !timePerWeek
    ) {
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

    // 3) "Llamada" a IA simulada – estructura similar al PDF
    const title =
      "Perfil profesional para " +
      (industries || "tu industria principal") +
      " orientado a " +
      goals.toLowerCase();

    const generatedCard = {
      title,
      content: {
        resumen:
          "Combina tus habilidades en " +
          currentSkills +
          " con tu interés en " +
          industries +
          " para " +
          goals.toLowerCase() +
          ".",

        porque_valioso:
          "Permite crear valor real en " +
          industries +
          " aprovechando tus habilidades actuales y un plan de acción de " +
          timePerWeek +
          " por semana.",

        nichos: [
          industries,
          "servicios personalizados",
          "contenidos digitales",
          "proyectos impulsados por datos",
        ],

        tareas: [
          "Analizar necesidades y oportunidades dentro de " + industries,
          "Diseñar propuestas o servicios basados en tus skills actuales",
          "Crear contenido, productos o soluciones que ayuden a otras personas",
          "Medir resultados y ajustar tu oferta según el feedback",
        ],

        herramientas: [
          "Herramientas que ya usás: " + currentSkills,
          "Plataformas de contenido (YouTube, blogs, redes sociales)",
          "Herramientas de diseño (Canva, Figma)",
          "Plataformas de cursos o productos digitales",
        ],

        nombresMarca: [
          "SkillSynth " + industries.split(",")[0]?.trim(),
          "Insightful " + industries.split(",")[0]?.trim(),
          "Boosted " + goals.split(" ")[0]?.trim(),
        ],

        ingresos: {
          latam: "300–700 USD / mes (estimado inicial)",
          global: "1.500–3.500 USD / mes (si escalás a clientes globales)",
        },

        plan30dias: {
          semana1: [
            "Definir objetivo concreto para los próximos 30 días",
            "Mapear tus habilidades actuales y cómo se conectan con " + industries,
            "Investigar referentes o casos de éxito en tu nicho",
          ],
          semana2: [
            "Diseñar una primera oferta mínima (servicio, contenido, producto simple)",
            "Crear 1–2 piezas de contenido que muestren tu propuesta",
            "Hablar con 3–5 personas para validar interés y recibir feedback",
          ],
          semana3: [
            "Mejorar tu oferta según el feedback recibido",
            "Publicar y promocionar tu propuesta en los canales que uses",
            "Medir interés: clics, mensajes, respuestas, seguidores nuevos",
          ],
          semana4: [
            "Definir qué funcionó mejor y qué vas a repetir",
            "Agregar una mejora concreta a tu oferta (bonus, mejor presentación, etc.)",
            "Planear los próximos 60 días de acción manteniendo el ritmo de " +
              timePerWeek +
              " semanales",
          ],
        },
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
      console.error("Error al guardar card:", cardErr);
      return res.status(500).json({
        error: "No se pudo guardar la tarjeta",
        detail: cardErr.message || cardErr.details || null,
      });
    }

    // 5) Actualizar consumo del plan (Starter)
    if (plan === "starter") {
      const { error: updateErr } = await supabaseServer
        .from("user_plans")
        .update({ limit_used: used + 1 })
        .eq("user_id", userId);

      if (updateErr) {
        console.error("Error al actualizar limit_used:", updateErr);
      }
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
