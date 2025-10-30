import Replicate from "replicate";

export default async function handler(req, res) {
  // CORS headers and preflight handling
  const setCors = () => {
    const allowedOrigin = process.env.CORS_ORIGIN || "*";
    res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  };

  setCors();
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const apiKey = process.env.REPLICATE_API_TOKEN;
  if (!apiKey) {
    return res.status(500).json({ error: "Missing REPLICATE_API_TOKEN env var" });
  }

  let body;
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
  } catch (e) {
    return res.status(400).json({ error: "Invalid JSON body" });
  }

  const model = body.model || "google/nano-banana";
  const input = body.input || {};

  try {
    const replicate = new Replicate({ apiKey });
    const output = await replicate.run(model, { input });
    return res.status(200).json({ model, input, output });
  } catch (err) {
    const message = err && err.message ? err.message : "Unknown error";
    const status = message.toLowerCase().includes("unauthorized") ? 401 : 500;
    return res.status(status).json({ error: message });
  }
}


