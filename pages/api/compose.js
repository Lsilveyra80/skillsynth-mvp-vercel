// pages/api/compose.js
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const body = req.body || {};

  // Soportamos ambos nombres por compatibilidad
  const habilidades = body.habilidades ?? body.currentSkills;
  const objetivo = body.objetivo ?? body.goals;
  const industria = body.industria ?? body.industries;
  const tiempo = body.tiempo ?? body.timePerWeek;

  if (!habilidades || !objetivo || !industria || !tiempo) {
    return res.status(400).json({
      error: "Faltan campos obligatorios",
      detail:
        "Se requieren: habilidades/currentSkills, objetivo/goals, industria/industries, tiempo/timePerWeek",
    });
  }

  /* =========================
     PROMPT NIVEL PRODUCTO
     ========================= */

  const systemPrompt = `
Sos un estratega senior de carrera y producto digital (AI Career & Product Strategist).
Tu trabajo es convertir información del usuario en una SkillSynth Card de nivel profesional,
lista para vender como servicio o posicionar como perfil laboral.

Reglas estrictas:
- Nada genérico ni frases vacías (“alta demanda”, “gran oportunidad”) sin explicación concreta.
- No inventes títulos, estudios ni experiencia previa del usuario.
- Todo debe ser accionable, específico y orientado a resultados.
- Ajustá complejidad y alcance al tiempo semanal disponible.
- Cuando falten datos, usá hasta 3 supuestos explícitos.
- Escribí en español claro (rioplatense/neutral).
- Respondé SOLO con JSON válido, sin markdown ni texto extra.
`.trim();

  const userPrompt = `
Inputs del usuario:
- Habilidades actuales: ${habilidades}
- Objetivo: ${objetivo}
- Industrias de interés: ${industria}
- Tiempo disponible por semana: ${tiempo}

Generá UNA SkillSynth Card profunda y profesional.

Devolvé EXCLUSIVAMENTE un JSON válido con esta estructura EXACTA:

{
  "skill_name": "",
  "tagline": "",
  "ideal_for": [""],
  "problem_it_solves": ["", "", ""],
  "description_short": "",
  "why_valuable": ["", "", "", ""],
  "target_clients": [
    {
      "segment": "",
      "pain": "",
      "desired_outcome": ""
    }
  ],
  "offers": [
    {
      "name": "",
      "for_whom": "",
      "deliverables": ["", "", ""],
      "time_to_deliver": "",
      "price_usd": "",
      "proof_of_value_metric": ""
    }
  ],
  "niches": [""],
  "salary_range": {
    "latam_usd_month": "",
    "global_usd_month": ""
  },
  "tools_needed": [""],
  "portfolio_project": {
    "name": "",
    "brief": "",
    "steps": ["", "", "", "", ""],
    "final_outputs": ["", "", ""]
  },
  "30_day_plan": [
    { "week": 1, "goal": "", "tasks": ["", "", ""] },
    { "week": 2, "goal": "", "tasks": ["", "", ""] },
    { "week": 3, "goal": "", "tasks": ["", "", ""] },
    { "week": 4, "goal": "", "tasks": ["", "", ""] }
  ],
  "content_engine": {
    "positioning_statement": "",
    "hooks": ["", "", "", "", ""],
    "post_ideas": ["", "", "", "", ""]
  },
  "discovery_questions": ["", "", "", "", ""],
  "brand_names": ["", "", ""],
  "quality_check": {
    "specificity_score_0_10": 0,
    "notes": ""
  }
}

Criterios de calidad obligatorios:
- skill_name: 4–8 palabras, claro y vendible.
- tagline: 1 línea concreta y potente.
- ideal_for: 3 perfiles claros.
- problem_it_solves: problemas reales y específicos.
- target_clients: mínimo 3 segmentos distintos.
- offers: mínimo 3 (Starter / Growth / Premium).
- Cada offer debe tener entregables claros y una métrica de valor.
- portfolio_project: publicable en LinkedIn, Notion o GitHub.
- 30_day_plan: realista para el tiempo disponible.
- quality_check: score honesto + qué se podría mejorar.

Si algo es ambiguo, aclaralo en quality_check.notes como "Supuesto:".
`.trim();

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4.1",
      temperature: 0.4,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      response_format: { type: "json_object" },
    });

    const raw = completion.choices?.[0]?.message?.content || "{}";

    let json;
    try {
      json = JSON.parse(raw);
    } catch (e) {
      // fallback defensivo
      const cleaned = raw
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();
      json = JSON.parse(cleaned);
    }

    return res.status(200).json(json);
  } catch (error) {
    console.error("Error en /api/compose:", error);
    return res.status(500).json({
      error: "Error al generar la SkillSynth Card",
      detail: error?.message || "Sin detalle",
    });
  }
}
