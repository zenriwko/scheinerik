import { useState, useEffect } from "react";
import styles from "./GalleryGrid.module.css";

const TOTAL_IMAGES = 50;
const IMAGES_PER_PAGE = 12;
const galleryImages = Array.from({ length: TOTAL_IMAGES }, (_, i) =>
  `https://picsum.photos/1920/1080?random=${i + 1}`
);

export default function GalleryGrid() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [closing, setClosing] = useState(false);
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(TOTAL_IMAGES / IMAGES_PER_PAGE);
  const start = (page - 1) * IMAGES_PER_PAGE;
  const visible = galleryImages.slice(start, start + IMAGES_PER_PAGE);

  /** open image using global index **/
  const open = (globalIndex: number) => {
    setClosing(false);
    setSelectedIndex(globalIndex);
  };

  const close = () => {
    setClosing(true);
    setTimeout(() => setSelectedIndex(null), 300);
  };

  /** next/previous based on global index **/
  const nextImage = () => {
    if (selectedIndex !== null && selectedIndex < galleryImages.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  const prevImage = () => {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  // Disable scroll when open
  useEffect(() => {
    document.body.style.overflow = selectedIndex !== null ? "hidden" : "auto";
  }, [selectedIndex]);

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedIndex]);

  return (
    <section className={styles.gallery}>
      <div className={`container ${styles.wrap}`}>

        {/* Grid for current page */}
        <div className={styles.grid}>
          {visible.map((src, i) => {
            const globalIndex = start + i;
            return (
              <div
                key={globalIndex}
                className={styles.card}
                onClick={() => open(globalIndex)}
              >
                <img
                  src={src}
                  alt={`Galerie ${globalIndex + 1}`}
                  loading="lazy"
                />
                <span className={styles.number}>{globalIndex + 1}</span>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        <div className={styles.pagination}>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`${styles.pageBtn} ${
                page === i + 1 ? styles.active : ""
              }`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div
          className={`${styles.overlay} ${
            closing ? styles.fadeOut : styles.fadeIn
          }`}
          onClick={close}
        >
          <div
            className={`${styles.lightbox} ${
              closing ? styles.zoomOut : styles.zoomIn
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.close} onClick={close}>
              ✕
            </button>

            {/* Left arrow */}
            {selectedIndex > 0 && (
              <button className={`${styles.arrow} ${styles.left}`} onClick={prevImage}>
                ❮
              </button>
            )}

            {/* Current image */}
            <img src={galleryImages[selectedIndex]} alt="Preview" />

            {/* Right arrow */}
            {selectedIndex < galleryImages.length - 1 && (
              <button className={`${styles.arrow} ${styles.right}`} onClick={nextImage}>
                ❯
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
}