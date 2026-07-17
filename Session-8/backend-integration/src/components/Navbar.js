import styles from "@/styles/Navbar.module.css";

// Task 1: Reusable Navbar for a food-delivery app (Zomato-style).
//
// Props:
//   active  -> string, the label of the currently active link (e.g. "Home").
//              Used to highlight which link the user is on.
//   links   -> optional array of { label, href }. Defaults to the four
//              food-delivery links, but you can override it to reuse this
//              Navbar in any app.
//   brand   -> optional string for the logo text.

const DEFAULT_LINKS = [
  { label: "Home", href: "/" },
  { label: "Orders", href: "/orders" },
  { label: "Cart", href: "/cart" },
  { label: "Profile", href: "/profile" },
];

export default function Navbar({ active = "Home", links = DEFAULT_LINKS, brand = "Zomato" }) {
  return (
    <nav className={styles.navbar}>
      <span className={styles.brand}>{brand}</span>

      <ul className={styles.links}>
        {links.map((link) => {
          const isActive = link.label === active;
          return (
            <li key={link.label}>
              <a
                href={link.href}
                // Combine the base class with the active class only when this
                // link matches the `active` prop.
                className={`${styles.link} ${isActive ? styles.active : ""}`}
                aria-current={isActive ? "page" : undefined}
              >
                {link.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
