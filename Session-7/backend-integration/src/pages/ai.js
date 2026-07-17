import AiQuoteGenerator from "@/components/AiQuoteGenerator";
import ResumeSummaryForm from "@/components/ResumeSummaryForm";
import BlogSummaryTester from "@/components/BlogSummaryTester";

// Session 7 hub: all the AI-powered components on one page.
export default function AiPage() {
  return (
    <main style={styles.page}>
      <h1>AI Playground</h1>
      <p style={styles.note}>
        Each tool calls a server-side API route that holds the API key, so no
        secret key is ever exposed in the browser.
      </p>

      <AiQuoteGenerator />
      <ResumeSummaryForm />
      <BlogSummaryTester />
    </main>
  );
}

const styles = {
  page: { fontFamily: "system-ui, sans-serif", maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", background: "#fafafa", minHeight: "100vh" },
  note: { color: "#666", fontSize: "0.9rem", marginBottom: "1.5rem" },
};
