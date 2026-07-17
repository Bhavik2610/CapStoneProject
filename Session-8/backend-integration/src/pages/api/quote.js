// Tasks 1 & 3: server-side route that calls the Hugging Face Inference API.
// The HF token stays here on the server; the browser only talks to /api/quote.

// Task 3 (prompt tuning): the tone changes the prompt we send to the model.
function buildPrompt(tone) {
  const prompts = {
    funny: "Write a short, funny motivational quote about success:",
    serious: "Write a short, serious and formal motivational quote about discipline:",
    inspirational: "Write a short, inspirational motivational quote about chasing dreams:",
  };
  return prompts[tone] ?? prompts.inspirational;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { tone = "inspirational" } = req.body ?? {};
  const prompt = buildPrompt(tone);

  try {
    const hfRes = await fetch("https://api-inference.huggingface.co/models/gpt2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Token is optional for some models but recommended (higher limits).
        ...(process.env.HF_API_TOKEN ? { Authorization: `Bearer ${process.env.HF_API_TOKEN}` } : {}),
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: { max_new_tokens: 40, temperature: 0.9, return_full_text: false },
      }),
    });

    // HF returns 503 while a model "warms up" — surface a friendly message.
    if (hfRes.status === 503) {
      return res.status(503).json({ error: "The model is loading, please try again in a few seconds." });
    }
    if (!hfRes.ok) {
      const text = await hfRes.text();
      return res.status(hfRes.status).json({ error: `Hugging Face error: ${text}` });
    }

    const data = await hfRes.json();
    const quote = Array.isArray(data) ? data[0]?.generated_text : data.generated_text;
    return res.status(200).json({ quote: (quote ?? "").trim(), tone });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
