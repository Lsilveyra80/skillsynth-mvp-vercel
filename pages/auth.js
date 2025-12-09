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
