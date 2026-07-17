import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import styles from "@/styles/Home.module.css";

// Cards link to everything built across the course.
const SECTIONS = [
  { href: "/session4", title: "Components", desc: "Navbar, cards, modal, forms", cls: "g3" },
  { href: "/playlists-db", title: "Playlists", desc: "Firestore CRUD", cls: "g1" },
  { href: "/reviews", title: "Reviews", desc: "Add + edit in Firestore", cls: "g2" },
  { href: "/watchlist", title: "Watchlist", desc: "Fetch + display", cls: "g6" },
  { href: "/login", title: "Auth", desc: "Login + protected dashboard", cls: "g4" },
  { href: "/ai", title: "AI Tools", desc: "Quotes, summaries", cls: "g5" },
];

// Task 3 (Session 3) still works: log the env var on the client.
console.log("[server] NEXT_PUBLIC_SPOTIFY_API_KEY =", process.env.NEXT_PUBLIC_SPOTIFY_API_KEY);

export default function Home() {
  useEffect(() => {
    console.log("[client] NEXT_PUBLIC_SPOTIFY_API_KEY =", process.env.NEXT_PUBLIC_SPOTIFY_API_KEY);
  }, []);

  return (
    <>
      <Head>
        <title>Full-Stack Learning Project</title>
        <meta
          name="description"
          content="A responsive Next.js project covering components, Firestore, auth, and AI integration."
        />
      </Head>

      <div className={styles.page}>
        <nav className={styles.nav}>
          <span className={styles.brand}>My Project</span>
          <div className={styles.navLinks}>
            <Link href="/session4">Components</Link>
            <Link href="/reviews">Reviews</Link>
            <Link href="/login">Login</Link>
            <Link href="/ai">AI</Link>
          </div>
        </nav>

        <header className={styles.hero}>
          <h1>Full-Stack Learning Project</h1>
          <p>
            Everything built across the sessions — responsive components, a
            Firestore backend, authentication, and AI-powered tools.
          </p>
        </header>

        <section className={styles.grid}>
          {SECTIONS.map((s) => (
            <Link key={s.href} href={s.href} className={`${styles.card} ${styles[s.cls]}`}>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </Link>
          ))}
        </section>

        <footer className={styles.footer}>
          Built with Next.js · Spotify key loaded: {process.env.NEXT_PUBLIC_SPOTIFY_API_KEY ?? "(not set)"}
        </footer>
      </div>
    </>
  );
}
