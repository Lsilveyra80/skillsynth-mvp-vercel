// pages/index.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { supabase } from "../lib/supabaseClient";

export default function HomePage() {
  const router = useRouter();
  const [session, setSession] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.error("Error al chequear sesión en /:", error);
        } else {
          setSession(data.session || null);
        }
      } catch (err) {
        console.error("Error general en checkSession:", err);
      } finally {
        setChecking(false);
      }
    };

    checkSession();
  }, []);

  async function handleLogout() {
    try {
      await supabase.auth.signOut();
      setSession(null);
    } catch (err) {
      console.error("Error al cerrar sesión desde home:", err);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 px-4">
      {/* Header */}
      <header className="max-w-5xl mx-auto py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-sky-500" />
          <p className="text-sm font-semibold tracking-wide">SkillSynth</p>
        </div>

        {!checking && (
          <div className="flex items-center gap-3 text-xs">
            {session ? (
              <>
                <span className="text-slate-300">
                  Sesión iniciada como{" "}
                  <span className="font-semibold">
                    {session.user.email}
                  </span>
                </span>
                <button
                  onClick={() => router.push("/dashboard")}
                  className="px-3 py-1 rounded-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold"
                >
                  Ir al dashboard
                </button>
                <button
                  onClick={handleLogout}
                  className="text-slate-400 hover:text-slate-200"
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="px-3 py-1 rounded-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold"
              >
                Iniciar sesión
              </Link>
            )}
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="max-w-5xl mx-auto mt-10 pb-20 grid gap-10 md:grid-cols-2 items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold mb-4">
            Convertí tu historia y tus habilidades
            <br />
            en una <span className="text-sky-400">SkillSynth</span>
          </h1>
          <p className="text-sm text-slate-300 mb-6">
            Contás quién sos, qué sabés hacer y cuánto tiempo tenés.
            SkillSynth compone una ficha de habilidad profesional con nicho,
            tareas, herramientas y un plan de 30 días para empezar a generar valor.
          </p>

          {!session ? (
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/login"
                className="px-5 py-2.5 rounded-full bg-sky-500 hover:bg-sky-400 text-slate-950 text-sm font-semibold"
              >
                Probar gratis con Google
              </Link>
              <p className="text-xs text-slate-400">
                No necesitás tarjeta. Empezás en el plan Starter.
              </p>
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => router.push("/dashboard")}
                className="px-5 py-2.5 rounded-full bg-sky-500 hover:bg-sky-400 text-slate-950 text-sm font-semibold"
              >
                Ir directo a mi SkillSynth
              </button>
              <p className="text-xs text-slate-400">
                Ya estás logueado, seguí creando habilidades 🙌
              </p>
            </div>
          )}
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5 text-sm text-slate-200 space-y-3">
          <p className="text-xs font-semibold text-slate-400 uppercase">
            Ejemplo de resultado
          </p>
          <h2 className="text-lg font-semibold">
            Habilidad generada: Portfolio de habilidades para IA Product Manager
          </h2>
          <p className="text-sm">
            Esta habilidad sirve para mostrar tus capacidades de producto e IA
            de forma clara, con foco en resultados de negocio y validación con usuarios.
          </p>
          <div>
            <p className="text-xs font-semibold text-slate-400 mb-1">
              Pasos sugeridos:
            </p>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>Definir objetivo de tu SkillSynth</li>
              <li>Elegir un nicho y un tipo de proyecto</li>
              <li>Publicar tu primer “experimento” en menos de 30 días</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
