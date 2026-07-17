import styles from "@/styles/PlaylistCard.module.css";

// Task 2: A Card that displays a music playlist (Spotify-style).
//
// Props:
//   image     -> album/cover image URL
//   name      -> playlist name
//   songCount -> number of songs in the playlist
//
// This component is "dumb": it only knows how to render whatever data it's
// given. The parent decides what playlists exist and passes them in — that's
// what makes it reusable for one card or a hundred.

export default function PlaylistCard({ image, name, songCount }) {
  return (
    <article className={styles.card}>
      <img className={styles.cover} src={image} alt={`${name} cover`} />
      <div className={styles.body}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.meta}>{songCount} songs</p>
      </div>
    </article>
  );
}
