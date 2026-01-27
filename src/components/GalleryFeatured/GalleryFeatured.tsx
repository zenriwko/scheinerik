"use client";

import styles from "./GalleryFeatured.module.css";
import "photoswipe/style.css";
import { useEffect, useState } from "react";

type GalleryItem = {
  type: "video";
  src: string;
  poster: string;
};

function VideoModal({
  open,
  onClose,
  item,
}: {
  open: boolean;
  onClose: () => void;
  item: GalleryItem | null;
}) {
  // ESC close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open || !item) return null;

  return (
    <div className={styles.videoModalOverlay} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.videoModal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.videoClose} onClick={onClose} aria-label="Close video">
          ✕
        </button>

        <video
          key={item.src}
          className={styles.videoPlayer}
          controls
          playsInline
          autoPlay
          muted
          preload="metadata"
        >
          <source src={item.src} type="video/mp4" />
        </video>
      </div>
    </div>
  );
}

export default function GalleryFeatured() {
  const [videoOpen, setVideoOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<GalleryItem | null>(null);

  // ✅ IMPORTANT: these must exist in /public/videos/
  const items: GalleryItem[] = [
    { type: "video", src: "/images/videos/featured.mp4", poster: "/images/videos/featured.webp" },
    { type: "video", src: "/images/videos/featured_1.mp4", poster: "/images/videos/featured_1.webp" }
    
  ];

  const openVideo = (item: GalleryItem) => {
    setActiveVideo(item);
    setVideoOpen(true);
  };

  return (
    <section id="galleryFeatured" className="section">
      <div className={`container ${styles.inner}`}>
        <h2>Galerie</h2>
        <h3>Ukázky našich realizací</h3>
        <p className={styles.intro}>V naší galerii najdete skutečné ukázky instalací hvězdných stropů...</p>

        <div className={styles.galleryGrid}>
          {items.map((item, i) => (
            <button key={i} type="button" className={styles.galleryItem} onClick={() => openVideo(item)}>
              <div className={styles.videoWrap}>
                <video
                  className={styles.videoThumb}
                  src={item.src}
                  poster={item.poster}
                  muted
                  playsInline
                  preload="metadata"
                  loop
                  onMouseEnter={(e) => e.currentTarget.play()}
                  onMouseLeave={(e) => {
                    e.currentTarget.pause();
                    e.currentTarget.currentTime = 0;
                  }}
                />
                <div className={styles.playBadge}>
                  <span className={styles.playIcon}></span>
                </div>
              </div>
            </button>
          ))}
        </div>

        <VideoModal open={videoOpen} onClose={() => setVideoOpen(false)} item={activeVideo} />
      </div>
    </section>
  );
}