// pages/api/projects/ensure-default.js
import { supabaseServer } from "../../../lib/supabaseServer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { userId } = req.body || {};

  if (!userId) {
    return res.status(400).json({ error: "Falta userId" });
  }

  try {
    // Buscar si ya tiene un proyecto activo
    const { data: existing, error: findError } = await supabaseServer
      .from("projects")
      .select("*")
      .eq("user_id", userId)
      .eq("is_active", true)
      .maybeSingle();

    if (findError) throw findError;

    if (existing) {
      return res.status(200).json({ project: existing });
    }

    // Si no tiene, creamos uno
    const { data: created, error: insertError } = await supabaseServer
      .from("projects")
      .insert({
        user_id: userId,
        name: "Mi primer proyecto",
        is_active: true,
      })
      .select("*")
      .single();

    if (insertError) throw insertError;

    return res.status(200).json({ project: created });
  } catch (err) {
    console.error("Error en ensure-default:", err);
    return res
      .status(500)
      .json({ error: "No se pudo asegurar el proyecto activo." });
  }
}
