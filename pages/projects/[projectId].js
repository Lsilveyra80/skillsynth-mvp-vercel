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
        const resp = await fetch(`/api/projects/cards?projectId=${projectId}`);
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
      <div className="max-w-5xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-semibold mb-1">
              SkillSynth de "{projectName}"
            </h1>
            <p className="text-sm text-slate-400">
              Usuario:{" "}
              {session.user.user_metadata?.username || session.user.email}
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
          <div className="space-y-6">
            {cards.map((card) => {
              const c = card.content || {};
              const plan = c.plan30dias || {};

              return (
                <article
                  key={card.id}
                  className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 md:p-8"
                >
                  {/* Título + resumen */}
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                    <div className="md:flex-1">
                      <h2 className="text-xl md:text-2xl font-semibold text-slate-50 mb-2">
                        {card.title}
                      </h2>
                      {c.resumen && (
                        <p className="text-sm text-slate-200">{c.resumen}</p>
                      )}
                    </div>

                    {/* Nombres de marca + ingresos (columna derecha como en el PDF) */}
                    {(Array.isArray(c.nombresMarca) || c.ingresos) && (
                      <div className="md:w-72 bg-slate-900/90 border border-slate-800 rounded-2xl p-3 text-xs text-slate-200">
                        {Array.isArray(c.nombresMarca) && (
                          <div className="mb-3">
                            <p className="font-semibold text-slate-100 mb-1">
                              Nombres de marca sugeridos
                            </p>
                            <ul className="list-disc list-inside space-y-0.5">
                              {c.nombresMarca.map((n, idx) => (
                                <li key={idx}>{n}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {c.ingresos && (
                          <div>
                            <p className="font-semibold text-slate-100 mb-1">
                              Rango de ingresos
                            </p>
                            {c.ingresos.latam && (
                              <p>LATAM: {c.ingresos.latam}</p>
                            )}
                            {c.ingresos.global && (
                              <p>Global: {c.ingresos.global}</p>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* ¿Por qué es valioso? + Nichos */}
                  {(c.porque_valioso || Array.isArray(c.nichos)) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      {c.porque_valioso && (
                        <div>
                          <h3 className="text-sm font-semibold text-slate-100 mb-1">
                            ¿Por qué es valioso?
                          </h3>
                          <p className="text-sm text-slate-200">
                            {c.porque_valioso}
                          </p>
                        </div>
                      )}

                      {Array.isArray(c.nichos) && (
                        <div>
                          <h3 className="text-sm font-semibold text-slate-100 mb-1">
                            Nichos donde encaja
                          </h3>
                          <ul className="list-disc list-inside text-sm text-slate-200 space-y-1">
                            {c.nichos.map((n, idx) => (
                              <li key={idx}>{n}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Tareas sugeridas */}
                  {Array.isArray(c.tareas) && (
                    <div className="mb-6">
                      <h3 className="text-sm font-semibold text-slate-100 mb-1">
                        Tareas que podrías hacer
                      </h3>
                      <ul className="list-disc list-inside text-sm text-slate-200 space-y-1">
                        {c.tareas.map((t, idx) => (
                          <li key={idx}>{t}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Herramientas sugeridas */}
                  {Array.isArray(c.herramientas) && (
                    <div className="mb-6">
                      <h3 className="text-sm font-semibold text-slate-100 mb-1">
                        Herramientas sugeridas
                      </h3>
                      <ul className="list-disc list-inside text-sm text-slate-200 space-y-1">
                        {c.herramientas.map((h, idx) => (
                          <li key={idx}>{h}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Plan de 30 días */}
                  {plan &&
                    (plan.semana1 || plan.semana2 || plan.semana3 || plan.semana4) && (
                      <div className="mt-4">
                        <h3 className="text-sm font-semibold text-slate-100 mb-3">
                          Plan de 30 días
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs text-slate-200">
                          {plan.semana1 && (
                            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3">
                              <p className="font-semibold mb-1">Semana 1</p>
                              <ul className="list-disc list-inside space-y-1">
                                {plan.semana1.map((p, idx) => (
                                  <li key={idx}>{p}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {plan.semana2 && (
                            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3">
                              <p className="font-semibold mb-1">Semana 2</p>
                              <ul className="list-disc list-inside space-y-1">
                                {plan.semana2.map((p, idx) => (
                                  <li key={idx}>{p}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {plan.semana3 && (
                            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3">
                              <p className="font-semibold mb-1">Semana 3</p>
                              <ul className="list-disc list-inside space-y-1">
                                {plan.semana3.map((p, idx) => (
                                  <li key={idx}>{p}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {plan.semana4 && (
                            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3">
                              <p className="font-semibold mb-1">Semana 4</p>
                              <ul className="list-disc list-inside space-y-1">
                                {plan.semana4.map((p, idx) => (
                                  <li key={idx}>{p}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                  {/* Fallback antiguo: si solo existe content.pasos, lo mostramos también */}
                  {Array.isArray(c.pasos) && !c.plan30dias && (
                    <div className="mt-4">
                      <h3 className="text-sm font-semibold text-slate-100 mb-1">
                        Pasos sugeridos
                      </h3>
                      <ul className="list-disc list-inside text-sm text-slate-200 space-y-1">
                        {c.pasos.map((p, idx) => (
                          <li key={idx}>{p}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <p className="text-[11px] text-slate-500 mt-4">
                    Generada el{" "}
                    {card.created_at &&
                      new Date(card.created_at).toLocaleString("es-AR")}
                  </p>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
