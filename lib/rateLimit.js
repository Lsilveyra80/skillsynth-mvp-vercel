// /lib/rateLimit.js

// Mapa en memoria: { ip: { count, firstRequestAt } }
const ipUsage = new Map();

/**
 * Verifica si una IP superó el límite
 * @param {object} options
 * @param {string} options.ip - IP del usuario
 * @param {number} options.maxRequests - Cantidad máxima permitida
 * @param {number} options.windowMs - Ventana de tiempo en ms (ej: 24h)
 * @returns {{ allowed: boolean, remaining: number, resetAt: number }}
 */
export function checkRateLimit({ ip, maxRequests, windowMs }) {
  const now = Date.now();

  let record = ipUsage.get(ip);

  // Si no existe registro, creamos uno
  if (!record) {
    record = {
      count: 1,
      firstRequestAt: now,
    };
    ipUsage.set(ip, record);

    return {
      allowed: true,
      remaining: maxRequests - 1,
      resetAt: now + windowMs,
    };
  }

  // Si ya pasó la ventana (ej: 24h), reseteamos
  if (now - record.firstRequestAt > windowMs) {
    record.count = 1;
    record.firstRequestAt = now;

    return {
      allowed: true,
      remaining: maxRequests - 1,
      resetAt: now + windowMs,
    };
  }

  // Si aún está dentro de la ventana
  if (record.count >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: record.firstRequestAt + windowMs,
    };
  }

  // Sumamos uno y permitimos
  record.count += 1;

  return {
    allowed: true,
    remaining: maxRequests - record.count,
    resetAt: record.firstRequestAt + windowMs,
  };
}
