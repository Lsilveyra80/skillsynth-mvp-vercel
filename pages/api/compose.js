// pages/api/compose.js
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  // Soportar ambos formatos:
  // - el viejo: habilidades/objetivo/industria/tiempo :contentReference[oaicite:2]{index=2}
  // - el nuevo del formulario PDF: currentSkills/goals/industries/timePerWeek :contentReference[oaicite:3]{index=3}
  const body = req.body || {};
  const habilidades = body.habilidades ?? body.currentSkills;
  const objetivo = body.objetivo ?? body.goals;
  const industria = body.industria ?? body.industries;
  const tiempo = body.tiempo ?? body.timePerWeek;

  if (!habilidades || !objetivo || !industria || !tiempo) {
    return res.status(400).json({
      error: "Faltan campos obligatorios.",
      detail:
        "Se requieren: habilidades/currentSkills, objetivo/goals, industria/industries, tiempo/timePerWeek.",
    });
  }

  // Prompt mejorado (más específico + realista + con formato JSON fijo)
  const system = `
Sos un asesor experto en carreras digitales, diseño de habilidades y monetización.
Tu tarea es crear una “SkillSynth Card”: una nueva habilidad/rol profesional combinando las capacidades del usuario con su objetivo, industrias y tiempo disponible.
Reglas:
- Sé específico y práctico. Evitá frases genéricas.
- No inventes credenciales del usuario (títulos, experiencia, empresas).
- Si faltan datos, asumí lo mínimo y mantené el plan realista.
- Ajustá la carga al tiempo semanal disponible.
- Respetá el esquema JSON EXACTO solicitado.
`.trim();

  const user = `
Datos del usuario:
- Habilidades actuales: ${habilidades}
- Objetivo: ${objetivo}
- Industrias de interés: ${industria}
- Tiempo disponible por semana: ${tiempo}

Generá UNA SkillSynth Card y devolvé EXCLUSIVAMENTE un JSON VÁLIDO con esta estructura (sin texto extra, sin markdown):

{
  "skill_name": "",
  "description_short": "",
  "why_valuable": "",
  "niches": [""],
  "salary_range": {
    "latam_usd": "",
    "usa_usd": ""
  },
  "tasks": [""],
  "tools_needed": [""],
  "day_30_plan": [
    { "week": 1, "focus": "", "tasks": ["", "", ""] },
    { "week": 2, "focus": "", "tasks": ["", "", ""] },
    { "week": 3, "focus": "", "tasks": ["", "", ""] },
    { "week": 4, "focus": "", "tasks": ["", "", ""] }
  ],
  "brand_names": ["", "", ""]
}

Criterios:
- skill_name: 4 a 7 palabras, claro y vendible.
- description_short: 3–5 líneas.
- why_valuable: 3–5 bullets en texto (separados por saltos de línea).
- niches: 5 nichos concretos.
- salary_range: rangos mensuales en USD (latam y global) razonables.
- tasks: 6–10 tareas que esa habilidad permite ofrecer.
- tools_needed: 6–10 herramientas/plataformas sugeridas.
- day_30_plan: 3 tareas por semana, adaptadas al tiempo disponible.
- brand_names: 3 nombres de marca/proyecto cortos.
`.trim();

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      temperature: 0.6,
      // Para forzar JSON: si tu modelo lo soporta, esto reduce muchísimo los "```json"
      response_format: { type: "json_object" },
    });

    const raw = completion.choices?.[0]?.message?.content || "{}";

    let json;
    try {
      json = JSON.parse(raw);
    } catch (e) {
      // fallback por si igual viniera con texto
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
      error: "Error al comunicarse con el modelo de IA.",
      detail: error?.message || "Sin detalle",
    });
  }
}
