"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./GalleryFeatured.module.css";

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
  const [mounted, setMounted] = useState(false);

  // Ensure portal only renders on client
  useEffect(() => {
    setMounted(true);
  }, []);

  // ESC close + prevent background scroll
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!mounted || !open || !item) return null;

  return createPortal(
    <div
      className={styles.videoModalOverlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Video player"
    >
      <button
        className={styles.videoClose}
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Zavřít video"
        type="button"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M18 6L6 18M6 6l12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <video
        key={item.src}
        className={styles.videoPlayer}
        controls
        playsInline
        autoPlay
        muted
        preload="metadata"
        onClick={(e) => e.stopPropagation()} // don’t close when clicking video
      >
        <source src={item.src} type="video/mp4" />
      </video>
    </div>,
    document.body
  );
}

export default function GalleryFeatured() {
  const [videoOpen, setVideoOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<GalleryItem | null>(null);

  const items: GalleryItem[] = [
    {
      type: "video",
      src: "/images/videos/featured.mp4",
      poster: "/images/videos/featured.webp",
    },
    {
      type: "video",
      src: "/images/videos/featured_1.mp4",
      poster: "/images/videos/featured_1.webp",
    },
  ];

  const openVideo = (item: GalleryItem) => {
    setActiveVideo(item);
    setVideoOpen(true);
  };

  const closeVideo = () => {
    setVideoOpen(false);
    // optional: clear after close to avoid flash on reopen
    setTimeout(() => setActiveVideo(null), 120);
  };

  return (
    <section id="galleryFeatured" className="section">
      <div className={`container ${styles.inner}`}>
        <h2>Galerie</h2>
        <h3>Ukázky našich realizací</h3>
        <p className={styles.intro}>
          V naší galerii najdete skutečné ukázky instalací hvězdných stropů...
        </p>

        <div className={styles.galleryGrid}>
          {items.map((item, i) => (
            <button
              key={i}
              type="button"
              className={styles.galleryItem}
              onClick={() => openVideo(item)}
              aria-label="Přehrát video"
            >
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
                  <span className={styles.playIcon} />
                </div>
              </div>
            </button>
          ))}
        </div>

        <VideoModal open={videoOpen} onClose={closeVideo} item={activeVideo} />
      </div>
    </section>
  );
}