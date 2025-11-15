// rateLimit.js para Vercel Serverless Functions
export default function rateLimit(limit, timeWindowMs) {
  let tokens = limit;
  let lastRefill = Date.now();

  return (req, res) => {
    const now = Date.now();
    const elapsed = now - lastRefill;

    if (elapsed > timeWindowMs) {
      tokens = limit;
      lastRefill = now;
    }

    if (tokens > 0) {
      tokens--;
      return true;
    } else {
      res.status(429).json({ error: "Too many requests, try again later." });
      return false;
    }
  };
}


