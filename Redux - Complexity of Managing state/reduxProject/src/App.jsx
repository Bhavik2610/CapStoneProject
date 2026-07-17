import { useState } from "react";
import { Provider, useSelector, useDispatch } from "react-redux";
import store from "./redux/store";
import ProductCard from "./components/ProductCard";
import { removeFromCart } from "./redux/cartActions";
import { removeFromWishlist } from "./redux/wishlistActions";
import { fetchOffers } from "./redux/offersActions";
import { addSong, removeSong } from "./redux/playlistActions";

const PRODUCTS = [
  { id: 1, name: "Wireless Headphones", price: 79 },
  { id: 2, name: "Mechanical Keyboard", price: 119 },
  { id: 3, name: "USB-C Hub", price: 39 },
];

function Shop() {
  const dispatch = useDispatch();
  const cart = useSelector((s) => s.cart);
  const wishlist = useSelector((s) => s.wishlist);
  const offers = useSelector((s) => s.offers);
  const playlist = useSelector((s) => s.playlist);

  const [song, setSong] = useState("");

  return (
    <main style={styles.page}>
      <h1>Redux Store Demo</h1>

      <section style={styles.section}>
        <h2>Products</h2>
        <div style={styles.stack}>
          {PRODUCTS.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <div style={styles.two}>
        <section style={styles.section}>
          <h2>Cart ({cart.length})</h2>
          {cart.length === 0 ? <p style={styles.muted}>Empty</p> : (
            <ul style={styles.list}>
              {cart.map((item) => (
                <li key={item.id} style={styles.row}>
                  {item.name}
                  <button style={styles.mini} onClick={() => dispatch(removeFromCart(item.id))}>×</button>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section style={styles.section}>
          <h2>Wishlist ({wishlist.length})</h2>
          {wishlist.length === 0 ? <p style={styles.muted}>Empty</p> : (
            <ul style={styles.list}>
              {wishlist.map((item) => (
                <li key={item.id} style={styles.row}>
                  {item.name}
                  <button style={styles.mini} onClick={() => dispatch(removeFromWishlist(item.id))}>×</button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <section style={styles.section}>
        <h2>Offers (async thunk)</h2>
        <button style={styles.primary} disabled={offers.loading} onClick={() => dispatch(fetchOffers())}>
          {offers.loading ? "Fetching…" : "Fetch offers"}
        </button>
        {offers.items.length > 0 && (
          <ul style={styles.list}>
            {offers.items.map((o) => <li key={o} style={styles.offer}>{o}</li>)}
          </ul>
        )}
      </section>

      <section style={styles.section}>
        <h2>Playlist (from last session)</h2>
        <form
          style={styles.form}
          onSubmit={(e) => { e.preventDefault(); if (song.trim()) { dispatch(addSong(song.trim())); setSong(""); } }}
        >
          <input style={styles.input} value={song} onChange={(e) => setSong(e.target.value)} placeholder="Add a song…" />
          <button style={styles.primary} type="submit">Add</button>
        </form>
        <ul style={styles.list}>
          {playlist.map((s, i) => (
            <li key={`${s}-${i}`} style={styles.row}>
              {s}
              <button style={styles.mini} onClick={() => dispatch(removeSong(s))}>×</button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

// Task 3/4/5 store is provided here.
export default function App() {
  return (
    <Provider store={store}>
      <Shop />
    </Provider>
  );
}

const styles = {
  page: { fontFamily: "system-ui, sans-serif", maxWidth: 720, margin: "2rem auto", padding: "0 1.5rem" },
  section: { marginBottom: "1.75rem" },
  stack: { display: "grid", gap: "0.6rem" },
  two: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" },
  list: { listStyle: "none", padding: 0, display: "grid", gap: "0.35rem", marginTop: "0.6rem" },
  row: { display: "flex", justifyContent: "space-between", alignItems: "center", background: "#f6f6f6", borderRadius: 6, padding: "0.45rem 0.7rem" },
  offer: { background: "#e6f7ed", color: "#1a7f45", borderRadius: 6, padding: "0.45rem 0.7rem" },
  muted: { color: "#999" },
  mini: { border: "none", background: "transparent", color: "#e23744", cursor: "pointer", fontSize: "1.1rem", lineHeight: 1 },
  primary: { border: "none", background: "#1db954", color: "#fff", borderRadius: 8, padding: "0.55rem 1rem", fontWeight: 700, cursor: "pointer" },
  form: { display: "flex", gap: "0.5rem" },
  input: { flex: 1, padding: "0.55rem 0.7rem", borderRadius: 8, border: "1px solid #ccc" },
};
