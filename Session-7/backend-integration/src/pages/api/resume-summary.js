// Tasks 2 & 5: server-side route that calls OpenAI to write a 2-line resume
// summary. The OPENAI_API_KEY never leaves the server.
//
// Note on the "/completions" constraint: OpenAI's legacy /v1/completions
// endpoint (with text-davinci-*) is deprecated. This uses the current
// /v1/chat/completions endpoint with gpt-4o-mini. If you truly need the
// literal /completions endpoint, the only model still served there is
// "gpt-3.5-turbo-instruct".

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { details } = req.body ?? {};
  if (!details || !details.trim()) {
    return res.status(400).json({ error: "Please enter your resume details first." });
  }

  // Task 5: catch a missing/invalid key early with a clear message.
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
          { role: "system", content: "You write concise, professional resume summaries." },
          { role: "user", content: `Write a 2-line professional summary based on these resume details:\n\n${details}` },
        ],
        max_tokens: 120,
        temperature: 0.7,
      }),
    });

    if (!openaiRes.ok) {
      // OpenAI returns useful error details (e.g. invalid key = 401).
      const errData = await openaiRes.json().catch(() => ({}));
      const message = errData?.error?.message ?? "OpenAI request failed.";
      return res.status(openaiRes.status).json({ error: message });
    }

    const data = await openaiRes.json();
    const summary = data.choices?.[0]?.message?.content?.trim() ?? "";
    return res.status(200).json({ summary });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
