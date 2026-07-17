// Task 4: fetchBlogSummary(prompt) — takes user input, returns a blog summary.
//
// It calls our own /api/blog-summary route (which talks to OpenAI on the
// server), so the OpenAI key never touches the browser.

export async function fetchBlogSummary(prompt) {
  const res = await fetch("/api/blog-summary", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error ?? "Failed to fetch blog summary.");
  }
  return data.summary;
}
