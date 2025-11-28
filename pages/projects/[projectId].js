// pages/projects/[projectId].js
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function ProjectPage() {
  const router = useRouter();
  const { projectId } = router.query;

  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [cards, setCards] = useState([]);
  const [projectName, setProjectName] = useState("Proyecto");

  useEffect(() => {
    if (!projectId) return;

    const init = async () => {
      try {
        // 1) Verificar sesión
        const { data, error } = await supabase.auth.getSession();
        if (error || !data.session) {
          router.replace("/login");
          return;
        }
        setSession(data.session);

        // 2) Traer info del proyecto (nombre)
        const { data: project, error: projErr } = await supabase
          .from("projects")
          .select("*")
          .eq("id", projectId)
          .maybeSingle();

        if (projErr) {
          console.error("Error cargando proyecto:", projErr);
        } else if (project) {
          setProjectName(project.name || "Proyecto");
        }

        // 3) Traer tarjetas del proyecto a través del API
        const resp = await fetch(
          `/api/projects/cards?projectId=${projectId}`
        );
        const json = await resp.json();
        if (!resp.ok) {
          console.error("Error cargando tarjetas:", json);
        } else {
          setCards(json.cards || []);
        }
      } catch (err) {
        console.error("Error general en ProjectPage:", err);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [projectId, router]);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center">
        <p className="text-slate-300 text-sm">Cargando SkillSynth...</p>
      </main>
    );
  }

  if (!session) {
    return null; // ya redirigimos a login
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold mb-1">
              SkillSynth de "{projectName}"
            </h1>
            <p className="text-sm text-slate-400">
              Usuario: {session.user.user_metadata?.username || session.user.email}
            </p>
          </div>
          <button
            onClick={() => router.push("/dashboard")}
            className="text-xs text-sky-400 hover:text-sky-300"
          >
            Volver al dashboard
          </button>
        </header>

        {cards.length === 0 ? (
          <p className="text-slate-300 text-sm">
            Todavía no generaste ninguna SkillSynth para este proyecto.
          </p>
        ) : (
          <div className="space-y-4">
            {cards.map((card) => (
              <article
                key={card.id}
                className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4"
              >
                <h2 className="text-lg font-semibold text-slate-50 mb-2">
                  {card.title}
                </h2>

                {card.content?.resumen && (
                  <p className="text-sm text-slate-200 mb-3">
                    {card.content.resumen}
                  </p>
                )}

                {Array.isArray(card.content?.pasos) && (
                  <div>
                    <p className="text-xs font-semibold text-slate-400 mb-1">
                      Pasos sugeridos:
                    </p>
                    <ul className="list-disc list-inside text-sm text-slate-200 space-y-1">
                      {card.content.pasos.map((paso, idx) => (
                        <li key={idx}>{paso}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <p className="text-[11px] text-slate-500 mt-3">
                  Generada el{" "}
                  {card.created_at &&
                    new Date(card.created_at).toLocaleString("es-AR")}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
