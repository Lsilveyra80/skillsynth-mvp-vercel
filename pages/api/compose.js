// /pages/api/compose.js
import OpenAI from "openai";
import { checkRateLimit } from "../../lib/rateLimit";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  // 🔐 IDENTIFICAR IP
  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
    req.socket.remoteAddress ||
    "unknown";

  // ⏱ Ventana mensual (30 días)
  const MONTH_MS = 30 * 24 * 60 * 60 * 1000;

  // 📦 Datos que vienen del frontend
  const { habilidades, objetivo, industria, tiempo } = req.body || {};

  if (!habilidades || !objetivo || !industria || !tiempo) {
    return res.status(400).json({ error: "Faltan campos obligatorios." });
  }

  // 🔒 Por ahora TODOS son plan Starter
  const userPlan = "starter";
  const planLabel = "Starter";
  const maxRequests = 5; // 5 tarjetas por mes en el plan Starter

  // 🧩 Rate limit mensual por IP
  const { allowed, remaining, resetAt } = checkRateLimit({
    ip,
    key: `${userPlan}-monthly`,
    maxRequests,
    windowMs: MONTH_MS,
  });

  if (!allowed) {
    return res.status(429).json({
      error: `Alcanzaste el límite de ${maxRequests} SkillSynth del plan ${planLabel}. Para seguir generando tarjetas, podés pasar al plan Plus o Pro.`,
      remaining: 0,
      resetAt,
      plan: userPlan,
    });
  }

  const prompt = `
Actúa como un diseñador de nuevas habilidades profesionales del futuro.
Voy a darte información sobre una persona:
1. Sus habilidades actuales
2. Qué objetivo tiene
3. Qué industria le interesa
4. Cuánto tiempo puede estudiar por semana

Con esa información, generá UNA nueva habilidad compuesta muy valiosa y única.

Datos de la persona:
- Habilidades actuales: ${habilidades}
- Objetivo: ${objetivo}
- Industrias de interés: ${industria}
- Tiempo disponible por semana: ${tiempo}

Devolvé EXCLUSIVAMENTE un JSON VÁLIDO con la siguiente estructura, sin texto adicional:

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
   {"week": 1, "focus": "", "tasks": ["", ""]},
   {"week": 2, "focus": "", "tasks": ["", ""]},
   {"week": 3, "focus": "", "tasks": ["", ""]},
   {"week": 4, "focus": "", "tasks": ["", ""]}
 ],
 "brand_names": ["", "", ""]
}
`;

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const raw = completion.choices?.[0]?.message?.content || "{}";

    let json;
    try {
      json = JSON.parse(raw);
    } catch (e) {
      const cleaned = raw
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
      json = JSON.parse(cleaned);
    }

    return res.status(200).json({
      ...json,
      plan: userPlan,
      remaining, // por si después querés mostrar "te quedan X intentos"
    });
  } catch (error) {
    console.error("Error en /api/compose:", error);
    return res.status(500).json({
      error: "Error al comunicarse con el modelo de IA.",
    });
  }
}
