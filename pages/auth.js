// pages/auth.js
import { useState } from "react";
import { supabase } from "../lib/supabaseClient"; // 👈 SIN @, ruta relativa

export default function AuthPage() {
  const [mode, setMode] = useState("signup"); // "signup" | "login"
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleGoogleLogin = async () => {
    setError("");
    setMessage("");
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });
      if (error) throw error;
    } catch (err) {
      console.error(err);
      setError(err.message || "Error al iniciar sesión con Google.");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            nombre,
            apellido,
          },
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (error) throw error;

      if (data.user && !data.session) {
        setMessage(
          "Te enviamos un correo de verificación. Revisá tu casilla y seguí el enlace para activar tu cuenta."
        );
      } else {
        setMessage("Cuenta creada. Redirigiendo…");
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Error al crear la cuenta.");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.session) {
        setMessage("Ingreso correcto. Redirigiendo…");
        window.location.href = "/dashboard";
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Error al iniciar sesión.");
    } finally {
      setLoading(false);
    }
  };

  const isSignup = mode === "signup";

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/70 p-6 md:p-8 shadow-xl shadow-slate-950/70">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
          Iniciar sesión en SkillSynth
        </h1>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full inline-flex items-center justify-center rounded-full bg-sky-500 hover:bg-sky-400 disabled:opacity-60 disabled:cursor-not-allowed text-slate-950 font-semibold py-2.5 mb-4 transition"
        >
          {loading ? "Procesando..." : "Continuar con Google"}
        </button>

        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px bg-slate-700" />
          <span className="text-xs uppercase tracking-widest text-slate-500">
            o con tu email
          </span>
          <div className="flex-1 h-px bg-slate-700" />
        </div>

        <div className="flex justify-center gap-2 mb-4 text-xs">
          <button
            type="button"
            onClick={() => setMode("signup")}
            className={`px-3 py-1 rounded-full border ${
              isSignup
                ? "border-sky-500 bg-sky-500/10 text-sky-300"
                : "border-slate-700 text-slate-400"
            }`}
          >
            Crear cuenta
          </button>
          <button
            type="button"
            onClick={() => setMode("login")}
            className={`px-3 py-1 rounded-full border ${
              !isSignup
                ? "border-sky-500 bg-sky-500/10 text-sky-300"
                : "border-slate-700 text-slate-400"
            }`}
          >
            Ya tengo cuenta
          </button>
        </div>

        <form
          onSubmit={isSignup ? handleEmailSignup : handleEmailLogin}
          className="space-y-3 text-sm"
        >
          {isSignup && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-200 mb-1">Nombre</label>
                <input
                  type="text"
                  className="w-full rounded-2xl bg-slate-950 border border-slate-800 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-slate-200 mb-1">Apellido</label>
                <input
                  type="text"
                  className="w-full rounded-2xl bg-slate-950 border border-slate-800 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-slate-200 mb-1">Email</label>
            <input
              type="email"
              className="w-full rounded-2xl bg-slate-950 border border-slate-800 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div>
            <label className="block text-slate-200 mb-1">Contraseña</label>
            <input
              type="password"
              className="w-full rounded-2xl bg-slate-950 border border-slate-800 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={isSignup ? "new-password" : "current-password"}
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center rounded-full bg-sky-500 hover:bg-sky-400 disabled:opacity-60 disabled:cursor-not-allowed text-slate-950 font-semibold py-2.5 mt-2 transition"
          >
            {loading
              ? "Procesando..."
              : isSignup
              ? "Crear cuenta con email"
              : "Iniciar sesión con email"}
          </button>
        </form>

        {message && (
          <p className="mt-3 text-xs text-emerald-400 text-center">{message}</p>
        )}
        {error && (
          <p className="mt-3 text-xs text-red-400 text-center">{error}</p>
        )}
      </div>
    </main>
  );
}
