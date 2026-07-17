import styles from "@/styles/Footer.module.css";

// Task 3: Footer for a shopping app (Flipkart-style).
//
// Props:
//   socialLinks -> array of { name, url, icon } where `icon` is one of the
//                  keys in the ICONS map below. Each becomes a clickable icon.
//
// Icons are inline SVGs so there's no external icon library to install.

const ICONS = {
  facebook: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12Z" />
    </svg>
  ),
  twitter: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M18.9 3H22l-7.5 8.6L23 21h-6.6l-5.2-6.8L5.3 21H2l8-9.2L1.5 3H8.3l4.7 6.2L18.9 3Zm-1.2 16h1.8L7.1 4.8H5.2L17.7 19Z" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M12 2c2.7 0 3 0 4.1.1 1 0 1.7.2 2.3.5.6.2 1.1.5 1.6 1 .5.5.8 1 1 1.6.3.6.4 1.3.5 2.3.1 1.1.1 1.4.1 4.1s0 3-.1 4.1c0 1-.2 1.7-.5 2.3a4.4 4.4 0 0 1-1 1.6c-.5.5-1 .8-1.6 1-.6.3-1.3.4-2.3.5-1.1.1-1.4.1-4.1.1s-3 0-4.1-.1c-1 0-1.7-.2-2.3-.5a4.4 4.4 0 0 1-1.6-1 4.4 4.4 0 0 1-1-1.6c-.3-.6-.4-1.3-.5-2.3C2 15 2 14.7 2 12s0-3 .1-4.1c0-1 .2-1.7.5-2.3.2-.6.5-1.1 1-1.6.5-.5 1-.8 1.6-1 .6-.3 1.3-.4 2.3-.5C9 2 9.3 2 12 2Zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4Zm5.2-8.4a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4Z" />
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M23 12s0-3.2-.4-4.7c-.2-.8-.9-1.5-1.7-1.7C19.4 5.2 12 5.2 12 5.2s-7.4 0-8.9.4c-.8.2-1.5.9-1.7 1.7C1 8.8 1 12 1 12s0 3.2.4 4.7c.2.8.9 1.5 1.7 1.7 1.5.4 8.9.4 8.9.4s7.4 0 8.9-.4c.8-.2 1.5-.9 1.7-1.7.4-1.5.4-4.7.4-4.7ZM9.8 15V9l5.2 3-5.2 3Z" />
    </svg>
  ),
};

export default function Footer({ socialLinks = [] }) {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <span className={styles.tagline}>Shop the latest deals every day</span>

        <div className={styles.socials}>
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.iconLink}
              aria-label={social.name}
              title={social.name}
            >
              {ICONS[social.icon] ?? social.name}
            </a>
          ))}
        </div>
      </div>

      <p className={styles.copyright}>© {new Date().getFullYear()} Flipkart-style demo. All rights reserved.</p>
    </footer>
  );
}
