// Task 4: server-side route behind fetchBlogSummary(prompt).

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt } = req.body ?? {};
  if (!prompt || !prompt.trim()) {
    return res.status(400).json({ error: "Please provide a prompt." });
  }
  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: "OpenAI API key is not configured on the server." });
  }

  try {
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You summarize blog topics into a short, engaging paragraph." },
          { role: "user", content: `Write a concise blog summary about: ${prompt}` },
        ],
        max_tokens: 200,
        temperature: 0.7,
      }),
    });

    if (!openaiRes.ok) {
      const errData = await openaiRes.json().catch(() => ({}));
      return res.status(openaiRes.status).json({ error: errData?.error?.message ?? "OpenAI request failed." });
    }

    const data = await openaiRes.json();
    return res.status(200).json({ summary: data.choices?.[0]?.message?.content?.trim() ?? "" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
