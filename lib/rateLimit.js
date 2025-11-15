// rateLimit.js para Vercel Serverless Functions
const rateLimit = (limit, timeWindowMs) => {
  let tokens = limit;
  let lastRefill = Date.now();

  return (req, res) => {
    const now = Date.now();
    const elapsed = now - lastRefill;

    // Rellenar tokens
    if (elapsed > timeWindowMs) {
      tokens = limit;
      lastRefill = now;
    }

    if (tokens > 0) {
      tokens--;
      return true;  // permitido
    } else {
      res.status(429).json({ error: 'Too many requests, slow down.' });
      return false; // bloqueado
    }
  };
};

export default rateLimit;

