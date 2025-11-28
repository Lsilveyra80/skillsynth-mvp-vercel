// components/Header.js
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient.js";

export default function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    // Escucha cambios de login/logout
    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      supabase.auth.getUser().then(({ data }) => {
        setUser(data.user);
      });
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin + "/dashboard" },
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/"; // vuelve a la página principal
  };

  return (
    <header style={{
      position: "absolute",
      top: 20,
      right: 20,
      color: "white",
      fontSize: "16px",
      display: "flex",
      gap: "12px",
      alignItems: "center",
      cursor: "pointer"
    }}>
      {user ? (
        <>
          <span>👤 {user.user_metadata.full_name || user.email}</span>
          <button
            onClick={handleLogout}
            style={{
              background: "transparent",
              border: "1px solid #fff",
              color: "#fff",
              padding: "5px 10px",
              borderRadius: "6px"
            }}
          >
            Cerrar sesión
          </button>
        </>
      ) : (
        <button
          onClick={handleLogin}
          style={{
            background: "#0ea5e9",
            border: "none",
            padding: "6px 14px",
            borderRadius: "6px",
            color: "white",
            fontWeight: "bold"
          }}
        >
          Iniciar sesión
        </button>
      )}
    </header>
  );
}
