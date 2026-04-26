'use client';
import { useRef } from 'react';
import VideoCard from './VideoCard';
import styles from './VideoCarousel.module.css';

export default function VideoCarousel({ title, videos }) {
  const rowRef = useRef(null);

  const handleScroll = (direction) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  if (!videos || videos.length === 0) return null;

  return (
    <div className={styles.carouselContainer}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.wrapper}>
        <button className={`${styles.sliderBtn} ${styles.left}`} onClick={() => handleScroll('left')}>
          ‹
        </button>
        <div className={styles.row} ref={rowRef}>
          {videos.map(video => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
        <button className={`${styles.sliderBtn} ${styles.right}`} onClick={() => handleScroll('right')}>
          ›
        </button>
      </div>
    </div>
  );
}
