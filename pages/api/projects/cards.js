// pages/api/projects/cards.js
import { supabaseServer } from "../../../lib/supabaseServer";

export default async function handler(req, res) {
  const { projectId } = req.query;
  if (!projectId) return res.status(400).json({ error: "Falta projectId" });

  const { data, error } = await supabaseServer
    .from("skill_cards")
    .select("*")
    .eq("project_id", projectId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return res.status(500).json({ error: "Error obteniendo tarjetas" });
  }

  return res.status(200).json({ cards: data });
}
