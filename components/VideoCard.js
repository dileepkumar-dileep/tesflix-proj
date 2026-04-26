import Link from 'next/link';
import styles from './VideoCard.module.css';

export default function VideoCard({ video }) {
  return (
    <Link href={`/video/${video.id}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={video.thumbnailUrl} alt={video.title} className={styles.thumbnail} />
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>{video.title}</h3>
      </div>
    </Link>
  );
}
