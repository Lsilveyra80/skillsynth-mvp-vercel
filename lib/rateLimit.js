// lib/rateLimit.js
//
// Rate limit sencillo en memoria por IP + "key" (por ejemplo: starter-monthly)
// IMPORTANTE: en Vercel esto es best-effort (se resetea cuando se reinicia la función).
// Para producción serio lo ideal sería usar Redis, Upstash, etc.

const store = new Map();

/**
 * checkRateLimit
 * @param {Object} params
 * @param {string} params.ip - IP del cliente
 * @param {string} [params.key="default"] - clave lógica (ej: "starter-monthly")
 * @param {number} params.maxRequests - máximo de solicitudes permitidas
 * @param {number} params.windowMs - ventana de tiempo en milisegundos
 * @returns {{ allowed: boolean, remaining: number, resetAt: number }}
 */
export function checkRateLimit({ ip, key = "default", maxRequests, windowMs }) {
  const now = Date.now();
  const compositeKey = `${key}:${ip}`;

  let entry = store.get(compositeKey);

  // Si no existe o la ventana ya venció, reseteamos contador y ventana
  if (!entry || now > entry.resetAt) {
    entry = {
      count: 0,
      resetAt: now + windowMs,
    };
  }

  if (entry.count >= maxRequests) {
    // Ya alcanzó el límite
    store.set(compositeKey, entry);
    return {
      allowed: false,
      remaining: 0,
      resetAt: entry.resetAt,
    };
  }

  // Consumimos 1 uso
  entry.count += 1;
  store.set(compositeKey, entry);

  return {
    allowed: true,
    remaining: maxRequests - entry.count,
    resetAt: entry.resetAt,
  };
}

// Default export opcional, por si lo quisieras usar así
export default checkRateLimit;
