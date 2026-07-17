import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../redux/cartActions";
import { addToWishlist, removeFromWishlist } from "../redux/wishlistActions";

// Task 2: ProductCard dispatches addToCart / removeFromCart (and the wishlist
// equivalents) from its buttons. It also reads state to know whether this
// product is already in the cart/wishlist, so the buttons can toggle.
export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const inCart = useSelector((s) => s.cart.some((i) => i.id === product.id));
  const inWishlist = useSelector((s) => s.wishlist.some((i) => i.id === product.id));

  return (
    <div style={styles.card}>
      <div>
        <div style={styles.name}>{product.name}</div>
        <div style={styles.price}>${product.price}</div>
      </div>

      <div style={styles.actions}>
        {inCart ? (
          <button style={styles.remove} onClick={() => dispatch(removeFromCart(product.id))}>
            Remove from cart
          </button>
        ) : (
          <button style={styles.add} onClick={() => dispatch(addToCart(product))}>
            Add to cart
          </button>
        )}

        {inWishlist ? (
          <button style={styles.wishOn} onClick={() => dispatch(removeFromWishlist(product.id))}>
            ♥ Wishlisted
          </button>
        ) : (
          <button style={styles.wishOff} onClick={() => dispatch(addToWishlist(product))}>
            ♡ Wishlist
          </button>
        )}
      </div>
    </div>
  );
}

const styles = {
  card: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.9rem 1rem", border: "1px solid #eee", borderRadius: 10, background: "#fff" },
  name: { fontWeight: 600 },
  price: { color: "#666", fontSize: "0.85rem" },
  actions: { display: "flex", gap: "0.5rem" },
  add: { border: "none", background: "#2874f0", color: "#fff", borderRadius: 6, padding: "0.4rem 0.7rem", cursor: "pointer", fontSize: "0.85rem" },
  remove: { border: "none", background: "#e23744", color: "#fff", borderRadius: 6, padding: "0.4rem 0.7rem", cursor: "pointer", fontSize: "0.85rem" },
  wishOff: { border: "1px solid #ccc", background: "#fff", color: "#333", borderRadius: 6, padding: "0.4rem 0.7rem", cursor: "pointer", fontSize: "0.85rem" },
  wishOn: { border: "1px solid #e23744", background: "#fdecee", color: "#e23744", borderRadius: 6, padding: "0.4rem 0.7rem", cursor: "pointer", fontSize: "0.85rem" },
};
