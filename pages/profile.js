// pages/profile.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabaseClient";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) {
        router.replace("/login");
        return;
      }
      setUser(data.user);
      setUsername(data.user.user_metadata?.username || "");
    };
    load();
  }, [router]);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    try {
      const { error } = await supabase.auth.updateUser({
        data: { username },
      });
      if (error) {
        console.error(error);
        alert("No se pudo guardar el nombre de usuario.");
        return;
      }
      alert("Nombre de usuario actualizado.");
      router.push("/dashboard");
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-950">
        <p className="text-slate-200 text-sm">Cargando perfil...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
        <h1 className="text-lg font-semibold mb-3">Tu perfil</h1>
        <p className="text-xs text-slate-400 mb-4">
          Estás logueado como <span className="font-medium">{user.email}</span>
        </p>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs text-slate-300 mb-1">
              Nombre de usuario
            </label>
            <input
              type="text"
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-sky-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ej: luigi.crea"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold py-2 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {saving ? "Guardando..." : "Guardar cambios"}
          </button>
        </form>
      </div>
    </main>
  );
}
